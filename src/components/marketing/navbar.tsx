"use client";

// The shared top navigation — class-for-class the reference's (DOM-extracted
// 2026-11-09): fixed transparent bar over the hero, slate-900/95 +
// backdrop-blur once scrolled, teal active underline, amber Upgrade pill,
// hamburger → dropdown on mobile (the reference's own working mobile menu —
// verified live at 390×844).
//
// Supersets (documented in the Deviations Ledger): the hamburger carries an
// aria-label + aria-expanded and the menu closes on route change and on
// Escape (keyboard/a11y hardening the reference lacks). The reference's
// panel class `bg-slate-900/98` is a DEAD class in its Tailwind build
// (computed backgroundColor: transparent — /98 is not a generated opacity
// step), so over the hero its menu shows the WebGL glow through the panel.
// We replicate that by leaving the panel transparent on the hero route, and
// SUPERSET: on light pages the panel gets slate-900/95 + blur (the reference
// leaves slate-300 links unreadable on light pages there).

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { Logo } from "./logo";
import { activeRoute, GUMROAD_URL, NAV_ROUTES } from "./nav-config";
import { cn } from "@/lib/utils";

const LINK_BASE =
  "text-sm font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-teal-400 after:transition-all";

// Session-21 (S21-4): the mobile menu reuses the desktop link family —
// the reference's dropdown re-renders its own LINK_BASE underline
// affordances (verified live 2026-11-11). The menu links keep
// `block w-full text-left py-2` as the touch-target superset (the
// reference's bare text-sm links measure ~20px tall — under the
// WCAG 2.5.8 24px floor; ours measure 36px). Spelled out in full
// (not composed from LINK_BASE) so the source pin owns one literal.
const MENU_LINK_BASE =
  "block w-full text-left py-2 text-sm font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-teal-400 after:transition-all";

export function Navbar() {
  const pathname = usePathname() ?? "/";
  const active = activeRoute(pathname);
  // The hero route paints its own dark backdrop; every other page is light.
  const onHero = active === "home";
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  // Session-11 (F11-11): the toggle owns the panel by id (aria-controls)
  // and takes focus back on Escape — focus left on the now-hidden panel
  // content effectively falls to <body>.
  const menuButtonRef = React.useRef<HTMLButtonElement | null>(null);

  // Session-10 (F10-10): close on ANY pathname change — including the
  // browser's own history navigation (back/forward), which fires no link
  // click. The adjust-during-render pattern (a prev-value comparison,
  // never `useEffect(() => setState)` — the React-19 rule) re-closes the
  // menu exactly once per navigation, hydration-safe.
  const [prevPathname, setPrevPathname] = React.useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    // The initial read rides a rAF (async — no synchronous setState in
    // the effect body) so a mid-page reload still paints the scrolled bar.
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Escape closes the mobile menu and returns focus to the toggle.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent",
      )}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center gap-8">
          {NAV_ROUTES.map((r) => (
            <Link
              key={r.id}
              href={r.href}
              className={cn(
                LINK_BASE,
                active === r.id
                  ? "text-teal-400 after:w-full"
                  : "text-slate-300 hover:text-white after:w-0 hover:after:w-full",
              )}
              aria-current={active === r.id ? "page" : undefined}
            >
              {r.label}
            </Link>
          ))}
          <a
            href={GUMROAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 text-sm font-semibold text-slate-900 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full hover:shadow-lg hover:shadow-amber-400/30 transition-all hover:-translate-y-0.5"
          >
            Upgrade to Pro
          </a>
        </div>
        <button
          ref={menuButtonRef}
          type="button"
          // Session-15 (S15-8): the keyboard focus arm — the S14-6
          // toast-dismiss family. slate-300 (not the house ring-ring
          // #0f172a) because the navbar is dark: the toggle's OWN ink is
          // the only ring that reads on slate-950. Keyboard-only
          // visibility — the reference's base classes are untouched.
          className="md:hidden p-2 text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>
      {/* The mobile menu — the reference's own dropdown. The
          height/opacity transition classes are INERT by design: the
          `hidden` attribute removes display, so no transition can play
          (the reference's menu has no transition either — SKILL §9
          item 13); they stay as harmless dead classes. Transparent over
          the hero (the reference's dead /98 class — the WebGL glow
          bleeds through); dark + blurred on light pages (our superset). */}
      <div
        id="mobile-menu"
        className={cn(
          "md:hidden border-b border-white/10 overflow-hidden transition-all duration-300",
          !onHero && "bg-slate-900/95 backdrop-blur-xl",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
        hidden={!open}
      >
        <div className="px-6 py-4 space-y-3">
          {NAV_ROUTES.map((r) => (
            <Link
              key={r.id}
              href={r.href}
              onClick={() => setOpen(false)}
              className={cn(
                MENU_LINK_BASE,
                active === r.id
                  ? "text-teal-400 after:w-full"
                  : "text-slate-300 hover:text-white after:w-0 hover:after:w-full",
              )}
              aria-current={active === r.id ? "page" : undefined}
            >
              {r.label}
            </Link>
          ))}
          {/* Session-21 (S21-3): re-anchored to the LIVE reference — its
              dropdown pill says "Upgrade to Pro" (the priced form was the
              session-1 capture; the reference changed it) and carries the
              desktop pill's full hover family. The `block w-full
              text-center` prefix stays (the touch-target superset). */}
          <a
            href={GUMROAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-5 py-2.5 text-sm font-semibold text-slate-900 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full hover:shadow-lg hover:shadow-amber-400/30 transition-all hover:-translate-y-0.5"
          >
            Upgrade to Pro
          </a>
        </div>
      </div>
    </nav>
  );
}
