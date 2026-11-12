"use client";

// The scroll-reveal — the reference's framer-motion `whileInView` family
// (y:20 → 0 fade, once) rebuilt WITHOUT a motion dependency:
// IntersectionObserver flips the element's own inline styles directly
// (no React state — no cascading renders, no hydration mismatch:
// SSR renders the hidden form exactly like the reference's own
// zero-opacity inline form (S32-4: re-spelled prose-safe — the compiled
// rule never matched a live consumer here), and the observer settles it
// on view).
// `prefers-reduced-motion` settles immediately; no observer support
// settles immediately too.

import * as React from "react";
import { cn } from "@/lib/utils";

type RevealDirection = "up" | "left";

function hiddenStyle(direction: RevealDirection): React.CSSProperties {
  return direction === "left"
    ? { opacity: 0, transform: "translateX(-16px)" }
    : { opacity: 0, transform: "translateY(20px)" };
}

/**
 * Wrap section content to reveal it on scroll.
 * - `up`: the default y:20 fade (the reference's section reveals)
 * - `left`: the x:-16 slide (the monetization section's benefit rows)
 * - `delay`: an optional entrance delay in ms (the reference staggers at
 *   0.1s steps)
 *
 * CONTRACT (session-31, S31-5b): `direction` and `delay` are MOUNT-TIME
 * constants. The observer effect arms once with `[]` deps while the
 * hidden inline style derives from the props — a call site that changes
 * either after mount would re-apply the hidden style to an element whose
 * observer has already disconnected (stuck invisible). Every live call
 * site passes mount-time constants — computed delays (`i * 100` and
 * kin) ride keyed instances, the prescribed keyed-remount form;
 * dynamic usage must remount using the `key` prop instead (the wording
 * re-spelled session-38, S38-7e: "literals" overstated — five sites
 * compute, none re-render past mount).
 */
export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
  as?: "div" | "section" | "span" | "li";
}) {
  const ref = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const settle = () => {
      el.style.opacity = "1";
      el.style.transform = "none";
    };
    // Reduced motion or no observer support: settle immediately.
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      settle();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            settle();
            io.disconnect();
          }
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The polymorphic Tag's ref narrows through a callback so the union of
  // allowed element types stays sound (a plain cast fights the JSX
  // intersection type React builds for union tags).
  const setRef = (node: HTMLElement | null) => {
    ref.current = node;
  };

  return (
    <Tag
      ref={setRef}
      className={cn("transition-all duration-500 ease-out", className)}
      style={{
        ...hiddenStyle(direction),
        ...(delay ? { transitionDelay: `${delay}ms` } : {}),
      }}
    >
      {children}
    </Tag>
  );
}
