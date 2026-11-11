"use client";

// The shared top navigation — class-for-class the reference's (DOM-extracted
// 2026-11-09): fixed transparent bar over the hero, slate-900/95 +
// backdrop-blur once scrolled, teal active underline, amber Upgrade pill,
// hamburger → dropdown on mobile (the reference's own working mobile menu —
// verified live at 390×844).
//
// Session-23 (S23-1): the reference's hamburger aria family was a
// TRANSIENT deploy state — present at session-22's capture (S22-22),
// REMOVED again by session-23's live walk (the button ships only
// `md:hidden p-2 text-slate-300`; the reference has now flip-flopped
// twice: absent sessions 1–21, present 22, absent 23). Chasing its
// deploy state would strip a WCAG 4.1.2 state/label contract — ours
// STAYS, as a DOCUMENTED SUPERSET (the a11y doctrine's genus). The
// supersets (Deviations Ledger): the aria family itself, the menu
// closing on route change and on Escape with focus return (keyboard
// hardening the reference lacks). The reference's panel class
// `bg-slate-900/98` is a DEAD class in its Tailwind build (computed
// backgroundColor: transparent — /98 is not a generated opacity step),
// so over the hero its menu shows the WebGL glow through the panel. We
// replicate that by leaving the panel transparent on the hero route
// (unscrolled), and SUPERSET: scrolled or on light pages the panel gets
// slate-900/95 + blur (session-22's scrolled arm — the reference leaves
// slate-300 links unreadable over light content).

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { Logo } from "./logo";
import { activeRoute, GUMROAD_URL, NAV_ROUTES } from "./nav-config";
import { cn } from "@/lib/utils";

const LINK_BASE =
  "text-sm font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-teal-400 after:transition-all";

// Session-22 (S22-3): the reference's dropdown links show the BARE
// mobile family again (verified live 2026-11-11 — the session-21
// LINK_BASE adoption is retired; the reference reverted to its
// session-1-era form). `py-2` rides the reference's own base now, so
// its touch target (36px) matches ours. Spelled out in full so the
// source pin owns one literal.
const MENU_LINK_BASE =
  "block w-full text-left text-sm font-medium py-2 transition-colors";

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
          // Session-22 (S22-5): the scrolled arm — the home route's own
          // landing sections are light below the hero, and a route-only
          // key left the panel transparent there (slate-300 links over
          // #f8fafc ≈ 1.48:1). Mirrors the bar's `scrolled ||` key;
          // top-of-hero unscrolled stays transparent (the reference's
          // dead /98 render over the hero).
          (!onHero || scrolled) && "bg-slate-900/95 backdrop-blur-xl",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
        hidden={!open}
      >
        <div className="px-6 py-4 space-y-3">
          {NAV_ROUTES.map((r) => (
            <Link
              key={r.id}
              href={r.href}
              // Session-25 (S25-16): the link-click path returns focus to
              // the toggle before closing — the Escape path's counterpart.
              // The close hides the panel (display:none), which unloads
              // the focused link; without the return, focus falls to
              // <body> and post-navigation Tab resumes at the document
              // top (WCAG 2.4.3).
              onClick={() => {
                menuButtonRef.current?.focus();
                setOpen(false);
              }}
              className={cn(
                MENU_LINK_BASE,
                active === r.id
                  ? "text-teal-400"
                  : "text-slate-300 hover:text-white",
              )}
              aria-current={active === r.id ? "page" : undefined}
            >
              {r.label}
            </Link>
          ))}
          {/* Session-22 (S22-1/S22-2): re-anchored to the LIVE reference
              (verified 2026-11-11) — its dropdown pill reverted to the
              session-1-era priced text WITHOUT the hover family (the
              session-21 "Upgrade to Pro" + hover-family capture was a
              transient deploy state on the reference; the desktop pill
              keeps the bare text + hover family). */}
          <a
            href={GUMROAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-5 py-2.5 text-sm font-semibold text-slate-900 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
          >
            Upgrade to Pro – $19
          </a>
        </div>
      </div>
    </nav>
  );
}
