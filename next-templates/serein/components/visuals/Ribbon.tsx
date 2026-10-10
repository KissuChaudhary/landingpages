"use client";
import { useEffect, useRef, useState } from "react";
import { useMotion } from "../Motion";
import { asset } from "@/lib/urls";
import { ribbonVertex, ribbonFragment } from "@/lib/ribbon-shaders";
import { site } from "@/site.config";

/** A local silk study, brought to life with slow material displacement. */
export function Ribbon({ className = "" }: { className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const pauseRef = useRef(true);
  const wake = useRef<() => void>(() => {});
  const [ready, setReady] = useState(false);
  const [generation, setGeneration] = useState(0);
  const { paused } = useMotion();
  useEffect(() => {
    pauseRef.current = paused;
    wake.current();
  }, [paused]);
  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const gl = el.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) return;
    const compile = (kind: number, source: string) => {
      const shader = gl.createShader(kind)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };
    const vs = compile(gl.VERTEX_SHADER, ribbonVertex);
    const fs = compile(gl.FRAGMENT_SHADER, ribbonFragment);
    if (!vs || !fs) {
      if (vs) gl.deleteShader(vs);
      if (fs) gl.deleteShader(fs);
      return;
    }
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      return;
    }
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    gl.useProgram(program);
    const attribute = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(attribute);
    gl.vertexAttribPointer(attribute, 2, gl.FLOAT, false, 0, 0);
    const time = gl.getUniformLocation(program, "uTime");
    const aspect = gl.getUniformLocation(program, "uAspect");
    const imageAspect = gl.getUniformLocation(program, "uImageAspect");
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    let frame = 0,
      elapsed = 0,
      previous = 0,
      lastDraw = 0,
      visible = true,
      lost = false,
      loaded = false;
    const draw = () => {
      if (!loaded || lost) return;
      gl.uniform1f(time, elapsed);
      gl.uniform1f(aspect, el.clientWidth / Math.max(el.clientHeight, 1));
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    const running = () =>
      loaded && visible && !document.hidden && !pauseRef.current && !lost;
    const tick = (now: number) => {
      frame = 0;
      if (!running()) {
        previous = 0;
        return;
      }
      elapsed += Math.min((now - (previous || now)) / 1000, 0.08);
      previous = now;
      if (now - lastDraw > 32) {
        draw();
        lastDraw = now;
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      if (running() && !frame) frame = requestAnimationFrame(tick);
      else if (!running()) {
        cancelAnimationFrame(frame);
        frame = 0;
        previous = 0;
      }
    };
    wake.current = sync;
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.25);
      el.width = Math.round(el.clientWidth * ratio);
      el.height = Math.round(el.clientHeight * ratio);
      gl.viewport(0, 0, el.width, el.height);
      draw();
    };
    const image = new Image();
    image.onload = () => {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
      gl.uniform1f(imageAspect, image.width / image.height);
      loaded = true;
      resize();
      setReady(true);
      sync();
    };
    image.src = asset(site.visuals.silk);
    const visibility = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        sync();
      },
      { rootMargin: "60px" },
    );
    visibility.observe(el);
    const size = new ResizeObserver(resize);
    size.observe(el);
    const onLost = (event: Event) => {
      event.preventDefault();
      lost = true;
      setReady(false);
      sync();
    };
    const onRestore = () => setGeneration((value) => value + 1);
    el.addEventListener("webglcontextlost", onLost);
    el.addEventListener("webglcontextrestored", onRestore);
    document.addEventListener("visibilitychange", sync);
    resize();
    return () => {
      wake.current = () => {};
      image.onload = null;
      cancelAnimationFrame(frame);
      size.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", sync);
      el.removeEventListener("webglcontextlost", onLost);
      el.removeEventListener("webglcontextrestored", onRestore);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [generation]);
  return (
    <div className={`ribbon ${className}`} aria-hidden="true">
      <img
        className="ribbon-fallback"
        src={asset(site.visuals.silk)}
        alt=""
        width="1536"
        height="1024"
      />
      <canvas ref={canvas} style={{ opacity: ready ? 1 : 0 }} />
    </div>
  );
}
