// Density profiles + the multiplier machinery that scales them. The base
// rows are inkform's `fine` profiles; each shipped preset (state × size)
// applies count / radius multipliers on top, resolved once per mount.

export interface ModeOpts {
  [key: string]: number | undefined;
}

// 2-D lattices (rings × dots-per-ring) come in pairs — each side takes
// √scale so the TOTAL dot count scales by `scale`; flat lists scale
// linearly. `iconD` sets the morph outline's sampling density.
const COUNT_PAIRS: ReadonlyArray<readonly [string, string]> = [
  ['latRings', 'lonDensity'],
  ['rings', 'lonDensity'],
  ['lanes', 'segs'],
  ['waves', 'dotsPerWave']
];
const COUNT_KEYS = ['orbitN', 'ghostN', 'nodeN', 'strandN', 'signals', 'swarmN'] as const;
const ICON_DENSITY_KEYS = ['iconD'] as const;

// Every key that sets a dot's rendered radius — scaling all of them keeps
// a dot's near/far falloff intact while shrinking or growing the mark.
const RADIUS_KEYS = [
  'rBase',
  'rDepth',
  'rActive',
  'rDot',
  'ghostR',
  'partR',
  'partRDepth',
  'nodeR',
  'nodeRDepth'
] as const;

export function scaleCounts(opts: ModeOpts, scale: number): ModeOpts {
  const out: ModeOpts = { ...opts };
  const done = new Set<string>();
  const rt = Math.sqrt(scale);
  for (const [a, b] of COUNT_PAIRS) {
    const va = out[a];
    const vb = out[b];
    if (va != null && vb != null && !done.has(a) && !done.has(b)) {
      out[a] = Math.max(2, Math.round(va * rt));
      out[b] = Math.max(2, Math.round(vb * rt));
      done.add(a);
      done.add(b);
    }
  }
  for (const k of COUNT_KEYS) {
    const v = out[k];
    // 0 means the mode opted out of that layer entirely (ring has no ghost
    // sphere) — scaling must not resurrect it as a single stray dot
    if (v != null && v !== 0 && !done.has(k)) out[k] = Math.max(1, Math.round(v * scale));
  }
  for (const k of ICON_DENSITY_KEYS) {
    const v = out[k];
    if (v != null) out[k] = Math.max(0.02, v * scale);
  }
  return out;
}

export function scaleRadii(opts: ModeOpts, scale: number): ModeOpts {
  const out: ModeOpts = { ...opts };
  for (const k of RADIUS_KEYS) {
    const v = out[k];
    if (v != null) out[k] = v * scale;
  }
  // remember the multiplier itself — spacing-derived radii (the morph
  // outline) use it, since they aren't based on any single radius key
  out.rSizeMul = (out.rSizeMul ?? 1) * scale;
  return out;
}

/** Base (fine) profiles per mode, before preset multipliers. */
export const BASE_PROFILES: Record<string, ModeOpts> = {
  globe: {
    latRings: 20,
    lonDensity: 48,
    rBase: 0.65,
    rDepth: 1.8,
    rBoost: 1.1,
    inkFar: 0.60,
    inkSpan: 0.55,
    rsPow: 0.6,
    rMin: 0.3
  },
  orbits: {
    orbitN: 14,
    ghostN: 45,
    ghostR: 0.85,
    ghostA: 0.45,
    particles: 4,
    partR: 1.1,
    partRDepth: 1.7,
    rsPow: 0.6,
    rMin: 0.3
  },
  rubik: {
    latRings: 16,
    lonDensity: 42,
    moveCount: 16,
    rBase: 0.65,
    rDepth: 1.6,
    rActive: 0.35,
    inkFar: 0.60,
    inkSpan: 0.55,
    rsPow: 0.6,
    rMin: 0.3
  },
  wave: {
    rings: 18,
    lonDensity: 44,
    rBase: 0.55,
    rDepth: 1.8,
    rsPow: 0.6,
    rMin: 0.3
  },
  web: {
    nodeN: 35,
    thr: 0.68,
    signals: 6,
    nodeR: 1.3,
    nodeRDepth: 1.9,
    lineW: 0.75,
    rsPow: 0.6,
    rMin: 0.3
  },
  braid: {
    strandN: 60,
    turns: 3.5,
    ghostN: 160,
    rBase: 1.1,
    rDepth: 1.9,
    rsPow: 0.6,
    rMin: 0.3
  },
  ribbon: {
    lanes: 6,
    segs: 96,
    ghostN: 160,
    rBase: 1.0,
    rDepth: 1.8,
    rsPow: 0.6,
    rMin: 0.3
  },
  // ring shares ribbon's painter; faceOn cancels the camera tilt and moves
  // the undulation onto the radius, and there is no ghost sphere behind it
  ring: {
    lanes: 6,
    segs: 96,
    ghostN: 0,
    faceOn: 1,
    rBase: 1.0,
    rDepth: 1.8,
    rsPow: 0.6,
    rMin: 0.3
  },
  morph: {
    rDot: 0.023,
    iconD: 1.1,
    rMin: 0.2
  },
  matrix: {
    nodeN: 150,
    rBase: 1.0,
    rDepth: 1.5,
    rsPow: 0.6,
    rMin: 0.3
  },
  mobius: {
    segs: 150,
    lanes: 3,
    rBase: 1.2,
    rDepth: 1.2,
    rsPow: 0.6,
    rMin: 0.3
  },
  dust: {
    nodeN: 80,
    rBase: 1.5,
    rDepth: 2.0,
    rsPow: 0.6,
    rMin: 0.3
  },
  helix: {
    strandN: 30,
    turns: 4.0,
    ghostN: 100,
    rBase: 1.2,
    rDepth: 1.5,
    rsPow: 0.6,
    rMin: 0.3
  },
  pulse: {
    nodeN: 80,
    rBase: 1.3,
    rDepth: 1.8,
    rsPow: 0.6,
    rMin: 0.3
  },
  swarm: {
    nodeN: 150,
    rBase: 1.0,
    rDepth: 1.5,
    rsPow: 0.6,
    rMin: 0.3
  },
  resolve: {
    lanes: 4,
    segs: 60,
    rBase: 1.1,
    rDepth: 1.6,
    rsPow: 0.6,
    rMin: 0.3
  },
  knot: {
    strandN: 40,
    turns: 2.0,
    ghostN: 80,
    rBase: 1.2,
    rDepth: 1.8,
    rsPow: 0.6,
    rMin: 0.3
  },
  gyro: {
    orbitN: 15,
    ghostN: 50,
    rBase: 1.1,
    rDepth: 1.6,
    rsPow: 0.6,
    rMin: 0.3
  },
  spark: {
    nodeN: 100,
    rBase: 1.2,
    rDepth: 1.7,
    rsPow: 0.6,
    rMin: 0.3
  },
  ripple: {
    rings: 10,
    lonDensity: 30,
    rBase: 1.0,
    rDepth: 1.5,
    rsPow: 0.6,
    rMin: 0.3
  },
  nucleus: {
    ghostN: 60,
    nodeN: 45,
    rBase: 1.2,
    rDepth: 1.5,
    rsPow: 0.6,
    rMin: 0.3
  },
  sonar: {
    waves: 2,
    nodeN: 60,
    rBase: 1.2,
    rDepth: 1.0,
    rsPow: 0.6,
    rMin: 0.3
  },
  dial: {
    nodeN: 40,
    rBase: 1.2,
    rDepth: 1.0,
    rsPow: 0.6,
    rMin: 0.3
  },
  guide: {
    segs: 100,
    rBase: 1.3,
    rDepth: 1.5,
    rsPow: 0.6,
    rMin: 0.3
  }
};
