"use client";

// The hero's animated background — an independent WebGL implementation of
// the reference's effect (bundle-extracted props: hue 174, power 1.5,
// focus 28, distortion 1.2, rendered at opacity-80 under the hero's
// gradient overlays). A compact fragment shader paints slow iridescent
// flow bands around the hue; the camera is static and time is the only
// uniform.
//
// Fallbacks: no WebGL context → nothing renders (the gradient overlays
// alone carry the hero, which is already the majority of the visual).
// prefers-reduced-motion → the shader renders a single static frame
// (seeded at mount-time — the rAF timestamp, not a literal t=0; the
// observable contract is one frame and the loop stops) and the resize
// handler repaints it synchronously.

import * as React from "react";

// Session-40 (S40-5): the `className` prop is RETIRED — the only call
// site (the hero) passes neither it nor any other prop beyond the
// reference's bundle-extracted config; the cn() merge arm was its only
// consumer in this file. The canvas keeps the static geometry classes
// byte-for-byte (the S39-10 doctrine: the dead-API genus the repo
// retires).

export interface IridescenceProps {
  hue?: number;
  power?: number;
  focus?: number;
  distortion?: number;
}

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform float u_time;
uniform float u_hue;      // base hue, degrees
uniform float u_power;    // band contrast
uniform float u_focus;    // band frequency scale
uniform float u_distortion;  // domain-warp strength
uniform vec2  u_res;

vec3 hsl2rgb(vec3 c) {
  vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
  return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = uv * 2.0 - 1.0;
  float aspect = u_res.x / u_res.y;
  p.x *= aspect;

  // Domain warp: two lazy sine fields (the "distortion").
  float w1 = sin(p.x * 1.7 + u_time * 0.12) * cos(p.y * 1.3 - u_time * 0.09);
  float w2 = cos(p.x * 1.1 - u_time * 0.07) * sin(p.y * 1.9 + u_time * 0.11);
  vec2 q = p + u_distortion * 0.22 * vec2(w1, w2);

  // Radial + angular bands (the "focus"): iridescent shimmer.
  float r = length(q);
  float a = atan(q.y, q.x);
  float bands = sin((r * u_focus * 0.18) + a * 2.0 + u_time * 0.18)
              * sin(r * 2.0 - u_time * 0.1 + a);
  bands = pow(abs(bands) * 0.5 + 0.5, u_power);

  // The reference's react-bits shader renders differently by aspect (its
  // internal camera). Both compositions below were verified against the
  // live site: desktop = radial teal burst behind the right-column
  // portrait + left cool mist + upper diagonal band; mobile portrait =
  // near-black field, one horizontal teal flow-band near uv.y ~0.85
  // (measured (14,52,61) uniform across x 30-290, dark at the far right),
  // teal pooled at the bottom portrait zone.
  float mobile = 1.0 - smoothstep(0.70, 1.05, aspect);

  // ---- desktop ----
  vec2 burstD = vec2((uv.x - 0.64) * aspect, (uv.y - 0.58) * 1.6);
  float glowD = exp(-length(burstD));
  float rayAngle = atan(burstD.y, burstD.x);
  float rays = pow(0.5 + 0.5 * sin(rayAngle * 9.0 + u_time * 0.05), 3.0) * glowD;
  float mist = exp(-length(p - vec2(-0.85, 0.15)) * 1.05) * 0.5
              + exp(-length(p - vec2(-0.2, -0.4)) * 1.4) * 0.35;
  float topband = exp(-abs(p.y - 0.55 - p.x * 0.25) * 1.8) * 0.55;
  float lightD = 0.27 + bands * 0.32 + glowD * 0.58 + rays * 0.12 + mist * 0.44 + topband * 0.40;
  float satD = 0.66 + bands * 0.25 + glowD * 0.20 + mist * 0.10 + topband * 0.16;

  // ---- mobile ----
  float hband = exp(-abs(uv.y - 0.85) * 26.0) * smoothstep(1.0, 0.55, uv.x);
  float pool = exp(-length(vec2((uv.x - 0.5) * aspect * 0.8, (uv.y - 0.44) * 2.6)))
             * smoothstep(0.72, 0.50, uv.y);
  float lightM = 0.07 + hband * 0.32 + pool * 0.42 + bands * 0.05;
  float satM = 0.62 + hband * 0.15 + pool * 0.18;

  float light = mix(lightD, lightM, mobile);
  float sat = mix(satD, satM, mobile);

  // Hue drifts around the base with radius (the iridescent sweep).
  float hue = mod(u_hue / 360.0 + r * 0.03 + bands * 0.03, 1.0);
  vec3 col = hsl2rgb(vec3(hue, sat, light));
  // Soft vignette toward the hero's slate-950 corners.
  float vig = mix(1.0, smoothstep(2.3, 0.5, r), 0.55);
  gl_FragColor = vec4(col * vig, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function Iridescence({
  hue = 174,
  power = 1.5,
  focus = 28,
  distortion = 1.2,
}: IridescenceProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: true, alpha: false });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      console.error("[iridescence] shader compile failed", { vs: !!vs, fs: !!fs });
      // Session-37 (S37-6d): release what exists — a bare return left
      // the surviving shader to GC of the context.
      if (vs) gl.deleteShader(vs);
      if (fs) gl.deleteShader(fs);
      return;
    }
    const prog = gl.createProgram();
    if (!prog) {
      // Session-37 (S37-6d): both shaders are live — release them.
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("[iridescence] link failed", gl.getProgramInfoLog(prog));
      // Session-37 (S37-6d): the failed link still owns its attached
      // objects — delete all three (buf is created only after this
      // check, so it is not live here).
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uHue = gl.getUniformLocation(prog, "u_hue");
    const uPower = gl.getUniformLocation(prog, "u_power");
    const uFocus = gl.getUniformLocation(prog, "u_focus");
    const uDistort = gl.getUniformLocation(prog, "u_distortion");
    const uRes = gl.getUniformLocation(prog, "u_res");
    gl.uniform1f(uHue, hue);
    gl.uniform1f(uPower, power);
    gl.uniform1f(uFocus, focus);
    gl.uniform1f(uDistort, distortion);

    let raf = 0;
    let disposed = false;

    const resize = () => {
      // Session-12 (F12-9): devicePixelRatio is read FRESH on every
      // resize — a boot-time capture rendered a cross-monitor move at
      // the stale DPR until remount (particle-text's layout() already
      // re-read it; this now matches).
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const render = (t: number) => {
      if (disposed) return;
      gl.uniform1f(uTime, t / 1000);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!reduced) raf = requestAnimationFrame(render);
    };
    // Session-24 (S24-6): the reduced-mode seed — the mount frame's own
    // rAF timestamp, captured on the single draw so a later resize
    // repaints the SAME frame. The old `render(0)` re-seeded u_time to a
    // literal zero and visibly re-flowed the slow sine bands from a
    // different point in the phase cycle (the S23-2 comment truth —
    // "the static frame sits at mount-time, not t=0" — was written the
    // same week the resize path violated it).
    let seedT = 0;
    raf = requestAnimationFrame((t) => {
      seedT = t;
      render(t);
    });

    const onResize = () => {
      resize();
      if (reduced) render(seedT);
    };
    window.addEventListener("resize", onResize);

    // Session-20 (S20-12): GPU context loss (mobile backgrounding, driver
    // resets) used to leave the rAF loop spinning no-op drawArrays calls
    // against a dead context forever. Stop the loop on loss — the two
    // CSS-gradient overlays carry the visual by design (the documented
    // fallback posture), so a static canvas is the correct degradation.
    const onContextLost = (e: Event) => {
      e.preventDefault();
      disposed = true;
      cancelAnimationFrame(raf);
    };
    canvas.addEventListener("webglcontextlost", onContextLost, false);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("webglcontextlost", onContextLost, false);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
      // Deliberately NO gl.getExtension("WEBGL_lose_context")?.loseContext()
      // here: React StrictMode's dev remount runs this effect again
      // against the SAME canvas element, and a forcibly-lost context
      // cannot be re-acquired by the second getContext — the dev hero
      // would blank until a full reload. Deleting the GL objects above
      // is the safe cleanup; the context itself rides GC (the hero
      // props are constant, so exactly one context exists per canvas).
    };
  }, [hue, power, focus, distortion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="h-full w-full"
    />
  );
}
