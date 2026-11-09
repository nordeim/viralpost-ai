import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

import { Logo } from "./logo";
import { GUMROAD_URL, NAV_ROUTES, SOCIAL_LINKS } from "./nav-config";

// The shared footer — class-for-class the reference's (DOM-extracted):
// slate-900, white/10 top border, 4-col grid (brand spans 2), social icon
// chips, Product column, Get Started upgrade link. Deviation: the social
// chips link the real platform homepages (the reference ships dead `#`).

const SOCIAL_ICONS = {
  Instagram,
  Twitter,
  LinkedIn: Linkedin,
  YouTube: Youtube,
  Facebook,
} as const;

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
              Smart AI tools for creators, influencers, and businesses. Generate
              viral-ready social media posts in seconds.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {SOCIAL_LINKS.map((s) => {
                const Icon = SOCIAL_ICONS[s.label as keyof typeof SOCIAL_ICONS];
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
              {NAV_ROUTES.map((r) => (
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
            <a
              href={GUMROAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-900 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full hover:shadow-lg hover:shadow-teal-500/25 transition-all"
            >
              Upgrade – $19
            </a>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} ViralPost AI. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">Made with ❤️ for creators</p>
        </div>
      </div>
    </footer>
  );
}
