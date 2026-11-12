import type { LucideIcon } from "lucide-react";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

import { Logo } from "./logo";
import { BRAND, GUMROAD_URL, NAV_ROUTES, SOCIAL_LINKS } from "./nav-config";

// The shared footer — class-for-class the reference's (DOM-extracted):
// slate-900, white/10 top border, 4-col grid (brand spans 2), social icon
// chips, Product column, Get Started upgrade link. Deviation: the social
// chips link the real platform homepages (the reference ships dead `#`).

// Session-41 (S41-9): the satisfies form makes the label→icon mapping
// COMPILE-TIME exhaustive — every SOCIAL_LINKS label must have an icon
// here (and no extra icons can ride along); the old
// `s.label as keyof typeof SOCIAL_ICONS` cast compiled even for a label
// with no entry and would have rendered <undefined/> at runtime.
const SOCIAL_ICONS = {
  Instagram,
  Twitter,
  LinkedIn: Linkedin,
  YouTube: Youtube,
  Facebook,
} as const satisfies Record<(typeof SOCIAL_LINKS)[number]["label"], LucideIcon>;

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-white/10 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
              {/* Session-39 (S39-9): the one-liner reads BRAND.tagline — the
                  single-source cure (the literal was an unpinned-against
                  BRAND duplicate; a tagline edit on one side drifted green).
                  DOM byte-identical: nav-config.test.ts:51 pins the string
                  on the BRAND side, landing-page.test.ts pins the wiring
                  here. */}
              {BRAND.tagline}
            </p>
            <div className="flex items-center gap-3 mt-5">
              {SOCIAL_LINKS.map((s) => {
                const Icon = SOCIAL_ICONS[s.label];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:border-teal-400/50 hover:bg-teal-400/10 transition-all"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {/* Session-25 (S25-1): the reference's footer Product column
                  ships THREE links — Home / Tool / Pricing (live-censused
                  both sides this round; the dossier §footer has recorded
                  the family since session 1). Contact is a NAV route (the
                  navs keep all four) but NOT a footer Product link. */}
              {NAV_ROUTES.filter((r) => r.id !== "contact").map((r) => (
                <li key={r.id}>
                  {/* Session-10 (F10-8): Link over the raw anchor — soft nav
                      like the navbar; the rendered <a> keeps the reference's
                      own href spelling (the /Home alias 308-redirects). */}
                  <Link href={r.href} className="text-slate-400 text-sm hover:text-teal-400 transition-colors">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Get Started</h4>
            {/* Session-21 (S21-1): re-anchored to the LIVE reference's
                classes (the 2026-11-11 computed-style walk found our
                from-teal-400/text-slate-900//25 form had drifted from
                its from-teal-500/text-white//30 pill). */}
            <a
              href={GUMROAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-teal-500/30 transition-all"
            >
              Upgrade – $19
            </a>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            {/* Session-16 (S16-5), documented deviation: the (site) pages
                are statically prerendered, so this year evaluates at
                `next build` and rolls only on the next deploy (the
                reference's SPA computes it client-side every load — the
                divergence window opens only after a calendar-year
                boundary crosses the last deploy). A client-side island
                here would trade hydration risk for zero current-day
                value; see PAD §11. */}
            © {new Date().getFullYear()} ViralPost AI. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">Made with ❤️ for creators</p>
        </div>
      </div>
    </footer>
  );
}
