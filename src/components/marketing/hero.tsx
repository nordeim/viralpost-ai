// The hero — class-for-class the reference's (DOM + bundle extracted):
// slate-900 min-h-screen with the WebGL iridescence background (hue 174,
// power 1.5, focus 28, distortion 1.2) at 80% opacity under two gradient
// overlays, the cycling particle title, the teal/amber CTAs, WORKS WITH
// pills, and the floating-portrait right column with its two stat cards.
// Session-20 (S20-4): a Server Component — it only composes the client
// islands (Iridescence/ParticleText/Reveal carry their own directives)
// with serializable props, so the static subtree renders as server HTML
// and stays out of the client bundle (the DOM is byte-identical).

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

import { Iridescence } from "@/components/effects/iridescence";
import { ParticleText } from "@/components/effects/particle-text";
import { Reveal } from "@/components/effects/reveal";
import { GUMROAD_URL } from "./nav-config";

const PHRASES = ["Go Viral!", "Post Smarter.", "Grow Faster.", "ViralPost AI"] as const;

const PLATFORMS = ["Instagram", "TikTok", "Twitter", "LinkedIn"] as const;

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-slate-900 flex items-center">
      <div className="absolute inset-0 opacity-80">
        <Iridescence hue={174} power={1.5} focus={28} distortion={1.2} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-slate-900/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/40" />
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal direction="left" className="w-full" >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-500/20 border border-teal-400/30 rounded-full text-xs font-semibold text-teal-300 mb-6">
              <Zap className="h-3.5 w-3.5" aria-hidden="true" />
              AI-Powered Social Media Content
            </div>
            <ParticleText
              texts={PHRASES}
              className="mb-3"
              fontSize={54}
              fontWeight={800}
              color="rgb(255, 255, 255)"
              srText="Go Viral! Post Smarter. Grow Faster. ViralPost AI"
            />
            <h2 className="text-2xl sm:text-3xl font-bold text-white/90 leading-snug mb-5">
              Create Viral Social Media Posts <span className="text-teal-400">with AI</span>
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-lg">
              ViralPost AI helps creators, influencers, and businesses generate
              engaging posts for Instagram, TikTok, Twitter, and LinkedIn in
              seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Session-10 (F10-8): the internal CTA rides next/link (soft
                  nav — the navbar's own behavior; the DOM output is
                  identical: same tag, href, classes). */}
              <Link
                className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-teal-500/30 transition-all hover:-translate-y-0.5"
                href="/Tool"
              >
                Try the Tool
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <a
                href={GUMROAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-400/10 border-2 border-amber-400/50 text-amber-300 font-semibold rounded-full hover:bg-amber-400/20 hover:border-amber-400 transition-all hover:-translate-y-0.5"
              >
                Upgrade to Pro – $19
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Works with</span>
              {PLATFORMS.map((p) => (
                <span
                  key={p}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-slate-400"
                >
                  {p}
                </span>
              ))}
            </div>
          </Reveal>
          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute inset-0 bg-teal-400/20 rounded-full blur-3xl scale-75" aria-hidden="true" />
            {/* Session-22 (S22-20): the plain <img> is the documented
                standalone-parity choice — next/image rewrites to
                /_next/image URLs the standalone artifact must serve
                itself; the explicit width/height carry the CLS contract,
                and the portrait rides the hero's lazy default (below the
                LCP text/particle surface). */}
            <img
              src="/hero-portrait.png"
              alt="ViralPost AI user"
              width={512}
              height={512}
              className="relative z-10 w-full max-w-sm lg:max-w-md rounded-3xl shadow-2xl shadow-teal-900/50 animate-float"
            />
            <div className="absolute bottom-8 -left-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 shadow-xl">
              <p className="text-xs text-teal-300 font-medium">Posts Generated</p>
              <p className="text-2xl font-bold text-white">500K+</p>
            </div>
            <div className="absolute top-8 -right-4 bg-amber-400/20 backdrop-blur-md border border-amber-400/30 rounded-2xl px-5 py-3 shadow-xl">
              <p className="text-xs text-amber-300 font-medium">Active Users</p>
              <p className="text-2xl font-bold text-white">10K+</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent" />
    </section>
  );
}
