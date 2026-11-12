"use client";

// The hero's particle title — an independent implementation of the
// reference's canvas effect (react-bits "Particles"-style, config
// bundle-extracted: texts cycle, Inter 54px/800 white, spread 5, density 5,
// vaporize 2s left-to-right, fadeIn 1s, wait 1s). Text is rasterized on an
// offscreen canvas, sampled to a particle field, then animated:
//   fadeIn (particles fly in from a spread) → wait → vaporize (particles
//   scatter left-to-right) → next phrase.
//
// Accessibility: the visual canvas is decorative — a real (visually
// hidden) heading carries the full phrase list for crawlers and screen
// readers, exactly like the reference's sr-only <h1>.
//
// Reduced motion: the canvas renders the CURRENT phrase as plain filled
// text (no particle flight) and still cycles phrases on the wait cadence.

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ParticleTextProps {
  texts: readonly string[];
  className?: string;
  /** Font size at the design width (scales with the container). */
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  srText?: string;
}

// Session-39 (S39-10): the `waitDuration` and `tag` props are RETIRED —
// zero call sites ever passed them (the hero passes neither; the wait
// rides PHASE_SECONDS.wait, the reference's own config, and the heading
// is ALWAYS the h1 — the a11y contract — never the h2 variant). The
// internal `waitDuration` name stays, bound from the constant, so the
// effects-motion reduced-cadence pins read unchanged.

interface Particle {
  x: number;
  y: number;
  tx: number; // target (text) position
  ty: number;
  hx: number; // home (scattered) position
  hy: number;
  vx: number;
  vy: number;
  size: number;
}

type Phase = "fade-in" | "wait" | "vaporize";

const PHASE_SECONDS = { fadeIn: 1, wait: 1, vaporize: 2 } as const;
const DESIGN_WIDTH = 792; // the reference's canvas width (528 CSS px @1.5)

export function ParticleText({
  texts,
  className,
  fontSize = 54,
  fontWeight = 800,
  color = "rgb(255, 255, 255)",
  srText,
}: ParticleTextProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const wrapRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap || texts.length === 0) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    // Session-39 (S39-10): bound from the constant (the retired prop's
    // default — the reference's own wait config — is now the only form).
    const waitDuration = PHASE_SECONDS.wait;
    // Session-12 (F12-8): the reduced-motion cadence handle — the phrase
    // swap schedules by TIMEOUT, not by a 60 fps rAF loop redrawing
    // identical text (the reduced intent is LESS motion, including less
    // redraw churn; the globals.css collapse can't reach a canvas loop).
    let phraseTimer: ReturnType<typeof setTimeout> | undefined;
    let phase: Phase = "fade-in";
    let phaseStart = performance.now();
    let textIndex = 0;
    let particles: Particle[] = [];
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cssW = 0;
    let cssH = 0;
    let disposed = false;

    const phrase = () => texts[textIndex] ?? "";

    const layout = () => {
      const rect = wrap.getBoundingClientRect();
      cssW = Math.max(rect.width, 1);
      cssH = Math.max(rect.height, 1);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Rasterize the current phrase offscreen and sample it into particles.
    const buildParticles = () => {
      const off = document.createElement("canvas");
      const scale = Math.min(1, cssW / (DESIGN_WIDTH * 0.667));
      let fontPx = fontSize * scale;
      const offW = Math.ceil(cssW);
      const offH = Math.ceil(cssH);
      off.width = offW;
      off.height = offH;
      const octx = off.getContext("2d");
      if (!octx) return;
      octx.fillStyle = "#fff";
      // Session-13 (S13-7): the computed font family is a per-call
      // constant — read it ONCE before the fit loop (the per-iteration
      // re-read burned up to ~42 computed-style lookups per rasterize,
      // repeated on every undebounced resize).
      const fontFamily = getComputedStyle(document.body).fontFamily;
      octx.font = `${fontWeight} ${fontPx}px ${fontFamily}`;
      octx.textBaseline = "middle";
      // Fit: shrink until the phrase fits with 4px padding.
      const text = phrase();
      let width = octx.measureText(text).width;
      while (width > offW - 8 && fontPx > 12) {
        fontPx -= 1;
        octx.font = `${fontWeight} ${fontPx}px ${fontFamily}`;
        width = octx.measureText(text).width;
      }
      octx.fillText(text, 4, offH / 2);

      const img = octx.getImageData(0, 0, offW, offH).data;
      particles = [];
      const density = 5; // reference: density 5
      const spread = 5; // reference: spread 5
      for (let y = 0; y < offH; y += density) {
        for (let x = 0; x < offW; x += density) {
          const alpha = img[(y * offW + x) * 4 + 3];
          if (alpha > 128) {
            const angle = Math.random() * Math.PI * 2;
            const dist = 40 + Math.random() * 60 * spread * 0.2;
            particles.push({
              x: x + (Math.random() - 0.5) * 2,
              y: y + (Math.random() - 0.5) * 2,
              tx: x,
              ty: y,
              hx: x + Math.cos(angle) * dist,
              hy: y + Math.sin(angle) * dist,
              vx: 0,
              vy: 0,
              size: 1 + Math.random() * 1.4,
            });
          }
        }
      }
    };

    const drawPlain = () => {
      // Reduced-motion face: plain text, no particle flight. (S13-7:
      // the font family is read once per draw call, outside the loop.)
      const fontFamily = getComputedStyle(document.body).fontFamily;
      const scale = Math.min(1, cssW / (DESIGN_WIDTH * 0.667));
      let fontPx = fontSize * scale;
      ctx.font = `${fontWeight} ${fontPx}px ${fontFamily}`;
      while (ctx.measureText(phrase()).width > cssW - 8 && fontPx > 12) {
        fontPx -= 1;
        ctx.font = `${fontWeight} ${fontPx}px ${fontFamily}`;
      }
      ctx.fillStyle = color;
      ctx.textBaseline = "middle";
      ctx.fillText(phrase(), 4, cssH / 2);
    };

    const frame = (now: number) => {
      if (disposed) return;
      const elapsed = (now - phaseStart) / 1000;
      ctx.clearRect(0, 0, cssW, cssH);

      if (reduced) {
        // Session-13 (S13-3): advance FIRST, then draw — the old order
        // painted the retiring phrase at every window boundary (the
        // first phrase held ~2x its window; each swap one frame late).
        // Session-14 (S14-7): INCLUSIVE — the timer fires at exactly the
        // window edge, and a strict > would miss the on-time arrival
        // (the phrase holds a second full window — the same symptom at
        // the boundary).
        if (elapsed >= waitDuration + PHASE_SECONDS.vaporize) {
          textIndex = (textIndex + 1) % texts.length;
          phaseStart = now;
        }
        drawPlain();
        // Session-12 (F12-8): draw once, sleep until the next phrase —
        // the OLD shape re-registered requestAnimationFrame here and
        // redrew the same static text at 60 fps all day.
        clearTimeout(phraseTimer);
        phraseTimer = setTimeout(() => frame(performance.now()), (waitDuration + PHASE_SECONDS.vaporize) * 1000);
        return;
      }

      if (phase === "fade-in") {
        const t = Math.min(elapsed / PHASE_SECONDS.fadeIn, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        for (const p of particles) {
          p.x = p.hx + (p.tx - p.hx) * ease;
          p.y = p.hy + (p.ty - p.hy) * ease;
        }
        if (t >= 1) {
          phase = "wait";
          phaseStart = now;
        }
      } else if (phase === "wait") {
        // Gentle idle jitter keeps the field alive.
        for (const p of particles) {
          p.x = p.tx + Math.sin(now / 700 + p.ty) * 0.6;
          p.y = p.ty + Math.cos(now / 900 + p.tx) * 0.6;
        }
        if (elapsed > waitDuration) {
          phase = "vaporize";
          phaseStart = now;
        }
      } else {
        // Vaporize: left-to-right sweep (the reference's direction).
        const t = Math.min(elapsed / PHASE_SECONDS.vaporize, 1);
        const sweep = t * (cssW + 120);
        for (const p of particles) {
          if (p.tx < sweep - 120) {
            // Already released: ballistic scatter with gravity-ish drift.
            p.vx += (Math.random() - 0.5) * 0.35;
            p.vy += (Math.random() - 0.5) * 0.35 - 0.02;
            p.x += p.vx;
            p.y += p.vy;
          } else {
            p.x = p.tx;
            p.y = p.ty;
          }
        }
        if (t >= 1) {
          textIndex = (textIndex + 1) % texts.length;
          phase = "fade-in";
          phaseStart = now;
          buildParticles();
          // Reset particles to their scattered homes.
          for (const p of particles) {
            p.x = p.hx;
            p.y = p.hy;
            p.vx = 0;
            p.vy = 0;
          }
        }
      }

      ctx.fillStyle = color;
      for (const p of particles) {
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };

    const init = () => {
      layout();
      // Session-20 (S20-5): the S19-9 residual — the mount-time build
      // is the same pure waste the resize path already skips (the
      // field is never drawn in reduced mode; only drawPlain runs), and
      // the home-scatter positions a field only the full-motion face
      // consumes. Guarded together at mount, mirroring onResize.
      if (!reduced) {
        buildParticles();
        if (phase === "fade-in") {
          for (const p of particles) {
            p.x = p.hx;
            p.y = p.hy;
          }
        }
      }
    };

    init();
    raf = requestAnimationFrame(frame);

    const onResize = () => {
      layout();
      // Session-19 (S19-9): layout() reassigns canvas.width/height, which
      // CLEARS the canvas — and in reduced mode no rAF loop is running
      // to repaint it, so the title stayed blank until the next phrase
      // timer (up to ~3s; the full-motion face repaints every frame and
      // never noticed). Repaint the plain face synchronously, and skip
      // the particle build — the field is never drawn in reduced mode.
      if (reduced) {
        drawPlain();
        return;
      }
      buildParticles();
    };
    window.addEventListener("resize", onResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      clearTimeout(phraseTimer);
      window.removeEventListener("resize", onResize);
    };
  }, [texts.join("|"), fontSize, fontWeight, color]);

  return (
    <div ref={wrapRef} className={cn("relative w-full", className)} style={{ height: fontSize * 1.35 }}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      />
      {/* The real heading for crawlers + screen readers (the reference's
          own sr-only pattern — a REAL h1 whose visually-hidden text
          carries the full phrase list). */}
      <h1
        className="sr-only"
        style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}
      >
        {srText ?? texts.join(" ")}
      </h1>
    </div>
  );
}
