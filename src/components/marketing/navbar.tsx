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

export function Navbar() {
  const pathname = usePathname() ?? "/";
  const active = activeRoute(pathname);
  // The hero route paints its own dark backdrop; every other page is light.
  const onHero = active === "home";
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

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

  // Escape closes the mobile menu.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
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
          type="button"
          className="md:hidden p-2 text-slate-300"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>
      {/* The mobile menu — the reference's own dropdown, plus animation-safe
          conditional classes (height/opacity transitions when motion is
          allowed; the globals.css reduced-motion block collapses them).
          Transparent over the hero (the reference's dead /98 class — the
          WebGL glow bleeds through); dark + blurred on light pages. */}
      <div
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
                "block w-full text-left text-sm font-medium py-2 transition-colors",
                active === r.id ? "text-teal-400" : "text-slate-300 hover:text-white",
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
            className="block w-full text-center px-5 py-2.5 text-sm font-semibold text-slate-900 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
          >
            Upgrade to Pro – $19
          </a>
        </div>
      </div>
    </nav>
  );
}
