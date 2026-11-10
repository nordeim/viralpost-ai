"use client";

import * as React from "react";
import {
  Hash,
  Instagram,
  MessageCircle,
  Sparkles,
  Star,
  TrendingUp,
  Twitter,
  Zap,
  type LucideIcon,
} from "lucide-react";

// The monetization section's floating icon field — the reference's
// session-19 redesign ships TEN absolutely-positioned lucide icons that
// bob, rotate and pulse (live-captured 2026-11-10: identity, color step,
// left/top percentage and pixel size per icon below; the reference drives
// them with framer-motion's per-frame inline styles — observed
// translateY oscillating ≈ -20..-70px, rotation ≈ ±10deg, opacity
// pulsing 0↔1, each icon on its own phase).
//
// This island reproduces the OBSERVABLE contract dependency-free: one
// rAF loop writing per-frame transform/opacity to the ten wrappers,
// staggered phases so the field never moves as a block. The exact
// interpolation curve is not claimed byte-identical to framer-motion's
// — the DOM contract (icons, positions, colors, sizes) is pinned by
// tests/landing-page.test.ts; the motion is the visual character.
//
// REDUCED MOTION (our documented superset posture, the effects-family
// doctrine): prefers-reduced-motion collapses the field to a static
// render at the pinned positions — no rAF loop, full opacity, no
// transform. (The reference's own reduced-motion behavior is unobserved;
// our house rule is collapse, matching iridescence/particle-text/reveal.)

interface FloaterSpec {
  icon: LucideIcon;
  color: string;
  left: string;
  top: string;
  size: number;
}

const FLOATERS: FloaterSpec[] = [
  { icon: Hash, color: "text-teal-400/40", left: "8%", top: "15%", size: 28 },
  { icon: Star, color: "text-amber-400/50", left: "90%", top: "10%", size: 22 },
  { icon: TrendingUp, color: "text-teal-300/30", left: "5%", top: "70%", size: 26 },
  { icon: Instagram, color: "text-pink-400/40", left: "92%", top: "65%", size: 24 },
  { icon: Twitter, color: "text-sky-400/40", left: "15%", top: "85%", size: 20 },
  { icon: Sparkles, color: "text-amber-300/50", left: "80%", top: "80%", size: 26 },
  { icon: MessageCircle, color: "text-teal-400/30", left: "50%", top: "8%", size: 22 },
  { icon: Hash, color: "text-white/20", left: "72%", top: "25%", size: 18 },
  { icon: Zap, color: "text-amber-400/30", left: "25%", top: "50%", size: 20 },
  { icon: Star, color: "text-teal-300/40", left: "60%", top: "88%", size: 18 },
];

// The observed oscillation envelope: translateY ≈ -20..-70px (base -45,
// amplitude 25), rotation ≈ ±10deg, opacity 0..1. Slower-than-1Hz
// periods read as "drifting", not "vibrating".
const Y_BASE = -45;
const Y_AMPLITUDE = 25;
const ROT_AMPLITUDE = 10;
const Y_PERIOD_S = 6;
const ROT_PERIOD_S = 8;
const OPACITY_PERIOD_S = 5;

export function FloatingIcons() {
  const wrapRefs = React.useRef<Array<HTMLDivElement | null>>([]);

  React.useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // the static render below IS the reduced-motion face

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      for (let i = 0; i < wrapRefs.current.length; i += 1) {
        const el = wrapRefs.current[i];
        if (!el) continue;
        // Staggered phases per icon and per property — the field never
        // moves as a block (live-observed on the reference: independent
        // phases per icon).
        const y = Y_BASE + Y_AMPLITUDE * Math.sin((2 * Math.PI * t) / Y_PERIOD_S + i * 0.7);
        const rot = ROT_AMPLITUDE * Math.sin((2 * Math.PI * t) / ROT_PERIOD_S + i * 1.3);
        const opacity = (Math.sin((2 * Math.PI * t) / OPACITY_PERIOD_S + i * 0.9) + 1) / 2;
        el.style.transform = `translateY(${y.toFixed(3)}px) rotate(${rot.toFixed(3)}deg)`;
        el.style.opacity = opacity.toFixed(3);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      {FLOATERS.map((f, i) => {
        const Icon = f.icon;
        return (
          <div
            key={`${f.color}-${f.left}-${i}`}
            ref={(el) => {
              wrapRefs.current[i] = el;
            }}
            aria-hidden="true"
            className={`absolute pointer-events-none ${f.color}`}
            style={{ left: f.left, top: f.top, opacity: 1 }}
          >
            <Icon style={{ width: f.size, height: f.size }} aria-hidden="true" />
          </div>
        );
      })}
    </>
  );
}
