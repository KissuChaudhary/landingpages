"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { Minus, Pause, Play, Plus, Volume2, VolumeX } from "lucide-react";
import { site } from "@/site.config";
import { useInView, useMotion } from "../Motion";

// A playable 16-step sequencer. The playhead runs on one transport: the audio clock when
// sound is on (so drums land exactly on time), the page clock when it's off. Sound is
// synthesized with the Web Audio API, so there are no audio files to load.

const parse = (row: string) => Array.from(row.padEnd(16, ".")).slice(0, 16).map((c) => c === "x");

type Voice = (time: number, bar: number) => void;

function createEngine() {
  const ctx = new AudioContext();
  const out = ctx.createDynamicsCompressor();
  out.threshold.value = -14;
  out.ratio.value = 4;
  const master = ctx.createGain();
  master.gain.value = 0.75;
  master.connect(out).connect(ctx.destination);

  const noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const data = noise.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

  const env = (time: number, peak: number, decay: number) => {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, time);
    g.gain.exponentialRampToValueAtTime(peak, time + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, time + decay);
    g.connect(master);
    return g;
  };
  const burst = (time: number, type: BiquadFilterType, freq: number, peak: number, decay: number) => {
    const src = ctx.createBufferSource();
    src.buffer = noise;
    const filter = ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = freq;
    src.connect(filter).connect(env(time, peak, decay));
    src.start(time);
    src.stop(time + decay + 0.02);
  };
  const tone = (time: number, type: OscillatorType, from: number, to: number, peak: number, decay: number) => {
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(from, time);
    osc.frequency.exponentialRampToValueAtTime(to, time + decay * 0.4);
    osc.connect(env(time, peak, decay));
    osc.start(time);
    osc.stop(time + decay + 0.02);
  };

  // Am7, Fmaj7, Cmaj7, G6: one chord per bar.
  const chords = [[220, 261.63, 329.63, 392], [174.61, 220, 261.63, 329.63], [130.81, 196, 246.94, 329.63], [196, 246.94, 293.66, 329.63]];
  const voices: Voice[] = [
    (t) => tone(t, "sine", 150, 42, 1, 0.42),
    (t) => {
      burst(t, "highpass", 1400, 0.5, 0.18);
      tone(t, "triangle", 220, 160, 0.25, 0.1);
    },
    (t) => burst(t, "highpass", 7500, 0.22, 0.05),
    (t, bar) => {
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 1700;
      lp.connect(env(t, 0.09, 0.9));
      chords[bar % chords.length].forEach((f) => {
        const osc = ctx.createOscillator();
        osc.type = "triangle";
        osc.frequency.value = f;
        osc.connect(lp);
        osc.start(t);
        osc.stop(t + 0.95);
      });
    },
  ];
  return { ctx, voices };
}

type Engine = ReturnType<typeof createEngine>;

export function BeatPad() {
  const { pad } = site;
  const { reduced, paused } = useMotion();
  const [preset, setPreset] = useState(0);
  const [grid, setGrid] = useState<boolean[][]>(() => pad.presets[0].pattern.map(parse));
  const [bpm, setBpm] = useState(pad.presets[0].bpm);
  const [playing, setPlaying] = useState(true);
  const [sound, setSound] = useState(false);
  const [steps, setSteps] = useState(16);
  const [focus, setFocus] = useState({ r: 0, c: 0 });
  const [wrap, inView] = useInView<HTMLDivElement>({ once: false, threshold: 0.15 });

  const engine = useRef<Engine | null>(null);
  const cols = useRef<(HTMLDivElement | null)[]>([]);
  const live = useRef({ grid, steps, rate: (bpm / 60) * 4 });
  live.current.grid = grid;
  live.current.steps = steps;
  // Transport: position (in steps) = pos0 + (clock - t0) * rate.
  const transport = useRef({ pos0: 0, t0: 0, audio: false, current: -1 });

  const clock = useCallback(() => (transport.current.audio && engine.current ? engine.current.ctx.currentTime : performance.now() / 1000), []);
  const position = useCallback(() => {
    const t = transport.current;
    return t.pos0 + (clock() - t.t0) * live.current.rate;
  }, [clock]);
  const anchor = useCallback((pos: number) => {
    transport.current.pos0 = pos;
    transport.current.t0 = clock();
  }, [clock]);

  // Reduced motion: start still. The visitor can still press play.
  useEffect(() => {
    if (reduced) setPlaying(false);
  }, [reduced]);

  // Eight steps on narrow screens so pads stay big enough to tap.
  useEffect(() => {
    const media = window.matchMedia("(max-width: 560px)");
    const sync = () => setSteps(media.matches ? 8 : 16);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  // Tempo changes keep the playhead where it is.
  useEffect(() => {
    const pos = position();
    live.current.rate = (bpm / 60) * 4;
    anchor(pos);
  }, [bpm, anchor, position]);

  // Keep running while sound is on; otherwise only while visible and motion isn't paused.
  const running = playing && (sound || (inView && !paused));

  useEffect(() => {
    if (!running) return;
    anchor(Math.max(0, transport.current.current));
    let frame = 0;
    let next = Math.ceil(position());
    const draw = () => {
      const step = Math.floor(position()) % live.current.steps;
      if (step !== transport.current.current) {
        cols.current[transport.current.current]?.classList.remove("is-now");
        cols.current[step]?.classList.add("is-now");
        transport.current.current = step;
      }
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    // Look ahead 120ms on the audio clock and schedule every hit in that window.
    const schedule = window.setInterval(() => {
      const e = engine.current;
      if (!transport.current.audio || !e) {
        next = Math.ceil(position()); // stay level with the playhead while silent
        return;
      }
      const horizon = e.ctx.currentTime + 0.12;
      const t = transport.current;
      for (;;) {
        const time = t.t0 + (next - t.pos0) / live.current.rate;
        if (time > horizon) break;
        if (time >= e.ctx.currentTime - 0.01) {
          const step = next % live.current.steps;
          const bar = Math.floor(next / live.current.steps);
          live.current.grid.forEach((row, r) => row[step] && e.voices[r]?.(time, bar));
        }
        next++;
      }
    }, 25);
    return () => {
      cancelAnimationFrame(frame);
      clearInterval(schedule);
    };
  }, [running, anchor, position]);

  const toggleSound = async () => {
    if (!sound) {
      try {
        engine.current ??= createEngine();
        await engine.current.ctx.resume();
      } catch {
        return; // No Web Audio: the pad stays visual.
      }
      const pos = position();
      transport.current.audio = true;
      anchor(pos);
      setSound(true);
      setPlaying(true);
    } else {
      const pos = position();
      transport.current.audio = false;
      anchor(pos);
      engine.current?.ctx.suspend();
      setSound(false);
    }
  };

  const choosePreset = (i: number) => {
    setPreset(i);
    setGrid(pad.presets[i].pattern.map(parse));
    setBpm(pad.presets[i].bpm);
  };

  const toggle = (r: number, c: number) => {
    setGrid((g) => g.map((row, ri) => (ri === r ? row.map((v, ci) => (ci === c ? !v : v)) : row)));
    if (sound && !grid[r][c] && engine.current) engine.current.voices[r]?.(engine.current.ctx.currentTime + 0.01, 0);
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, r: number, c: number) => {
    const moves: Record<string, [number, number]> = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
    const m = moves[e.key];
    if (!m) return;
    e.preventDefault();
    const nr = (r + m[0] + grid.length) % grid.length;
    const nc = (c + m[1] + steps) % steps;
    setFocus({ r: nr, c: nc });
    document.getElementById(`pad-${nr}-${nc}`)?.focus();
  };

  return (
    <div className="pad" ref={wrap}>
      <div className="pad-top">
        <div className="pad-presets" role="radiogroup" aria-label="Beat preset">
          {pad.presets.map((p, i) => (
            <button key={p.name} type="button" role="radio" aria-checked={i === preset} className={i === preset ? "is-active" : undefined} onClick={() => choosePreset(i)}>
              {p.name}
            </button>
          ))}
        </div>
        <div className="pad-bpm">
          <button type="button" aria-label="Slower" onClick={() => setBpm((b) => Math.max(60, b - 2))}>
            <Minus size={14} strokeWidth={2.4} />
          </button>
          <span className="pad-bpm-value" aria-live="polite">
            <b>{bpm}</b> BPM
          </span>
          <button type="button" aria-label="Faster" onClick={() => setBpm((b) => Math.min(160, b + 2))}>
            <Plus size={14} strokeWidth={2.4} />
          </button>
        </div>
      </div>

      <div className="pad-grid" role="group" aria-label="Beat grid: four instruments, one column per step">
        <div className="pad-labels" aria-hidden="true">
          {pad.rows.map((row) => (
            <span key={row.name} className={`c-${row.color}`}>
              <i />
              {row.name}
            </span>
          ))}
        </div>
        <div className="pad-cols" style={{ "--steps": steps } as CSSProperties}>
          {Array.from({ length: steps }, (_, c) => (
            <div key={c} className="pad-col" ref={(el) => { cols.current[c] = el; }}>
              {pad.rows.map((row, r) => (
                <button
                  key={row.name}
                  id={`pad-${r}-${c}`}
                  type="button"
                  className={`pad-cell c-${row.color}${grid[r][c] ? " is-on" : ""}`}
                  aria-pressed={grid[r][c]}
                  aria-label={`${row.name}, step ${c + 1}`}
                  tabIndex={focus.r === r && focus.c === c ? 0 : -1}
                  onClick={() => toggle(r, c)}
                  onKeyDown={(e) => onKey(e, r, c)}
                  onFocus={() => setFocus({ r, c })}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="pad-foot">
        <button type="button" className="pad-play" aria-label={playing ? "Pause the beat" : "Play the beat"} onClick={() => setPlaying((p) => !p)}>
          <span className={playing ? "" : "is-active"}>
            <Play size={16} fill="currentColor" strokeWidth={0} />
          </span>
          <span className={playing ? "is-active" : ""}>
            <Pause size={16} fill="currentColor" strokeWidth={0} />
          </span>
        </button>
        <button type="button" className={`pad-sound${sound ? " is-on" : ""}`} aria-pressed={sound} onClick={toggleSound}>
          {sound ? <Volume2 size={16} strokeWidth={2} /> : <VolumeX size={16} strokeWidth={2} />}
          <span className="morph">
            <span className={sound ? "" : "is-active"} aria-hidden={sound}>Sound off</span>
            <span className={sound ? "is-active" : ""} aria-hidden={!sound}>Sound on</span>
          </span>
        </button>
        <p className="pad-hint">Tap a pad to change the beat</p>
      </div>
    </div>
  );
}
