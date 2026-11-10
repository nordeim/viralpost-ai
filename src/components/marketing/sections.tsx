import {
  ArrowRight,
  Check,
  Gift,
  Hash,
  Heart,
  Lock,
  PenLine,
  Rocket,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  WandSparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/effects/reveal";
import { FloatingIcons } from "@/components/effects/floating-icons";
import { GUMROAD_URL } from "./nav-config";

// The landing page's marketing sections — class-for-class the reference's
// (DOM-extracted 2026-11-09). Each section is a server component except
// where interactivity demands a client island (the generator card and the
// contact form).

// ---- section 2: the tool (generator) ---------------------------------------

export function ToolSection({ children }: { children: React.ReactNode }) {
  return (
    <section id="tool" className="py-24 px-6 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-3xl mx-auto">
        <Reveal className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            AI Social Media Post Generator
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto">
            Describe your post idea and instantly generate a viral-ready social
            media post with engaging structure and optimized hashtags.
          </p>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

// ---- section 3: the pay-what-you-want monetization ---------------------------
//
// Session-19 (S19-2): the reference REDESIGNED this section between the
// session-18 and session-19 walks — the PT (Portuguese) copy was replaced
// by a redesigned EN face, live-extracted 2026-11-10: a new badge/h2/
// paragraph, four EN benefit cards, BOTH CTAs now external Gumroad
// anchors (the PT era's internal /Tool Link is retired with the copy), a
// lock-icon trust line at mt-6, and a ten-icon floating field
// (FloatingIcons — the rAF island). The retired PT face is preserved in
// the session-1 dossier (docs/reference-investigation.md §3.2 item 3).

const MONETIZATION_BENEFITS = [
  { icon: Gift, text: "100% free to start — no credit card required" },
  { icon: Zap, text: "Instant access, no sign-up hassle" },
  { icon: Star, text: "Supporters receive the full Pro version as a thank-you" },
  { icon: Heart, text: "Your support keeps the tool free for everyone" },
] as const;

export function MonetizationSection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-slate-900 via-teal-950 to-slate-900 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <FloatingIcons />
      <div className="max-w-3xl mx-auto relative text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-400/10 border border-amber-400/30 rounded-full text-xs font-semibold text-amber-300 mb-6">
            <Gift className="h-3.5 w-3.5" aria-hidden="true" />
            Free Access — No Strings Attached
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
            Download Free.{" "}
            {/* Session-21 (S21-5): the sRGB inline form — v4 compiles
                the hue-crossing utility pair `in oklab`, a ΔR≈26 midband
                drift from the reference's v3 sRGB blend (pinned in
                tests/design-tokens.test.ts). */}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(to right, #2dd4bf, #fbbf24)" }}
            >
              If It Helps You, Help Us Too.
            </span>
          </h2>
          <p className="text-slate-300/70 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            We believe in honesty. Use the tool completely free. If it transforms
            your content and grows your social media presence, contribute{" "}
            <strong className="text-white">any amount that feels right to you</strong>{" "}
            — and as a token of gratitude, you&apos;ll instantly receive the full
            Pro version unlocked.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 text-left max-w-xl mx-auto">
          {MONETIZATION_BENEFITS.map((b, i) => (
            <Reveal key={b.text} direction="left" delay={i * 100}>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <div className="h-8 w-8 rounded-lg bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                  <b.icon className="h-4 w-4 text-teal-400" aria-hidden="true" />
                </div>
                <span className="text-sm text-slate-300">{b.text}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={100}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Session-19: BOTH CTAs are external Gumroad anchors on the
                reference's redesigned face (the PT era's internal /Tool
                Link retired with the copy) — live-extracted classes. */}
            <a
              href={GUMROAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-full hover:bg-white/15 hover:border-white/30 transition-all hover:-translate-y-0.5 text-base"
            >
              <Gift className="h-5 w-5 text-teal-400" aria-hidden="true" />
              Get Free Access Now
            </a>
            <a
              href={GUMROAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-bold rounded-full hover:shadow-xl hover:shadow-amber-400/30 transition-all hover:-translate-y-0.5 text-base"
            >
              <Heart className="h-5 w-5" aria-hidden="true" />
              Support &amp; Unlock Pro
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 mt-6 text-slate-500 text-xs">
            <Lock className="h-3.5 w-3.5" aria-hidden="true" />
            100% secure payment via Gumroad · Instant Pro access after
            contribution
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---- section 4: features -----------------------------------------------------

const FEATURES = [
  {
    icon: Zap,
    chip: "bg-teal-100 group-hover:bg-teal-500",
    iconColor: "text-teal-600 group-hover:text-white",
    title: "Instant Generation",
    text: "Generate complete, publish-ready posts in under 3 seconds powered by advanced AI.",
  },
  {
    icon: Target,
    chip: "bg-amber-100 group-hover:bg-amber-400",
    iconColor: "text-amber-600 group-hover:text-white",
    title: "Platform Optimized",
    text: "Posts are tailored specifically for Instagram, TikTok, Twitter, or LinkedIn formats.",
  },
  {
    icon: Hash,
    chip: "bg-teal-100 group-hover:bg-teal-500",
    iconColor: "text-teal-600 group-hover:text-white",
    title: "Smart Hashtags",
    text: "Automatically includes trending, high-engagement hashtags for maximum reach.",
  },
  {
    icon: TrendingUp,
    chip: "bg-amber-100 group-hover:bg-amber-400",
    iconColor: "text-amber-600 group-hover:text-white",
    title: "Viral Formulas",
    text: "Uses proven hooks and storytelling structures that drive likes, shares, and follows.",
  },
  {
    icon: Check,
    chip: "bg-teal-100 group-hover:bg-teal-500",
    iconColor: "text-teal-600 group-hover:text-white",
    title: "Copy & Post",
    text: "One click to copy. Paste directly into any social media platform instantly.",
  },
  {
    icon: Rocket,
    chip: "bg-amber-100 group-hover:bg-amber-400",
    iconColor: "text-amber-600 group-hover:text-white",
    title: "Any Niche",
    text: "Works for fitness, business, lifestyle, fashion, food, travel, and more.",
  },
] as const;

export function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full border border-teal-100 mb-4">
            Why ViralPost AI?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Everything You Need to Go Viral
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto">
            Powerful AI features built specifically for social media growth.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 100}>
              <div className="group p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-teal-100 hover:shadow-lg hover:shadow-teal-50 transition-all hover:-translate-y-1 h-full">
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-4 transition-colors ${f.chip}`}>
                  <f.icon className={`h-6 w-6 transition-colors ${f.iconColor}`} aria-hidden="true" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- section 5: how it works -------------------------------------------------

const STEPS = [
  {
    icon: PenLine,
    title: "Describe Your Idea",
    text: "Type a short description of your post topic, brand voice, or campaign goal.",
  },
  {
    icon: WandSparkles,
    title: "AI Generates Your Post",
    text: "Our AI crafts a viral-ready post with proven hooks and optimized hashtags.",
  },
  {
    icon: Rocket,
    title: "Copy & Post",
    text: "One click to copy, then paste directly to any platform and watch it perform.",
  },
] as const;

export function HowItWorksSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-slate-900 to-teal-900 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="max-w-5xl mx-auto relative">
        <Reveal className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-teal-400/10 text-teal-400 text-xs font-semibold rounded-full border border-teal-400/20 mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">How It Works</h2>
          <p className="mt-4 text-teal-200/60 max-w-xl mx-auto">
            Three simple steps to your next viral post.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px bg-gradient-to-r from-teal-500/50 to-transparent" aria-hidden="true" />
          <div className="hidden md:block absolute top-10 left-2/3 right-0 h-px bg-gradient-to-r from-teal-500/50 to-transparent" aria-hidden="true" />
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 150}>
              <div className="text-center relative">
                <div className="inline-flex flex-col items-center">
                  <span className="text-6xl font-black text-teal-500/20 leading-none mb-2" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="h-16 w-16 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center mb-4">
                    <s.icon className="h-7 w-7 text-teal-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">{s.title}</h3>
                  <p className="text-teal-200/60 text-sm leading-relaxed max-w-xs">{s.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- section 6: stats ----------------------------------------------------------

const STATS = [
  { value: "10K+", label: "Active Users", sub: "Creators & businesses" },
  { value: "500K+", label: "Posts Generated", sub: "Across all platforms" },
  { value: "4.9★", label: "Average Rating", sub: "From verified users" },
  { value: "3 sec", label: "Generation Speed", sub: "From idea to post" },
] as const;

export function StatsSection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-teal-500 to-teal-600">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <Reveal key={s.label} className="text-center">
              <div className="text-4xl sm:text-5xl font-black text-white mb-1">{s.value}</div>
              <div className="text-white font-semibold mb-1">{s.label}</div>
              <div className="text-teal-100/70 text-xs">{s.sub}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- section 7: testimonials -----------------------------------------------------

const TESTIMONIALS = [
  {
    quote:
      "ViralPost AI changed my content game. I went from 2K to 18K followers in 3 months just by using this tool daily. The hooks it creates are insane!",
    name: "Sofia M.",
    handle: "@sofialifestyle",
    initial: "S",
  },
  {
    quote:
      "As a business coach, I struggled with LinkedIn content. Now I generate 10 posts in minutes. My engagement tripled. Best $19 I ever spent.",
    name: "Marcus T.",
    handle: "@marcusbizcoach",
    initial: "M",
  },
  {
    quote:
      "I use it every morning for my TikTok captions. The hashtags are always on point and the tone matches my brand perfectly. Super worth it!",
    name: "Luna R.",
    handle: "@lunatiktok",
    initial: "L",
  },
] as const;

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Loved by Creators
          </h2>
          <p className="mt-4 text-slate-500">
            Real results from real people using ViralPost AI.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.handle} delay={i * 100}>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-teal-100 hover:shadow-lg hover:shadow-teal-50 transition-all hover:-translate-y-1 h-full flex flex-col">
                <div className="flex gap-0.5 mb-4" role="img" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-5 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-teal-600 text-xs">{t.handle}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- section 8: pricing --------------------------------------------------------

const FREE_FEATURES = ["3 posts per day", "Basic post generation", "Standard hashtags"] as const;
const PRO_FEATURES = [
  "Unlimited posts",
  "High-engagement writing style",
  "Advanced hashtag suggestions",
  "Priority generation",
] as const;

export function PricingCards() {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
      <Reveal>
        <div className="relative rounded-3xl p-8 transition-all hover:-translate-y-1 bg-white border-2 border-slate-100 hover:border-teal-100 shadow-lg h-full">
          <h3 className="text-lg font-bold text-slate-400">Free</h3>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-4xl font-extrabold">$0</span>
            <span className="text-sm text-slate-400">/forever</span>
          </div>
          <ul className="mt-8 space-y-4">
            {FREE_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm">
                <div className="h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 bg-teal-50">
                  <Check className="h-3 w-3 text-teal-600" aria-hidden="true" />
                </div>
                <span className="text-slate-600">{f}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 w-full py-3.5 text-center font-semibold rounded-2xl bg-slate-50 text-slate-400 border border-slate-200">
            Current Plan
          </div>
        </div>
      </Reveal>
      <Reveal delay={100}>
        <div className="relative rounded-3xl p-8 transition-all hover:-translate-y-1 bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-2xl shadow-teal-300/40 h-full">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-4 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-full shadow-lg">
            <Star className="h-3 w-3" aria-hidden="true" />
            MOST POPULAR
          </div>
          <h3 className="text-lg font-bold text-white/80">Pro</h3>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-4xl font-extrabold">$19</span>
            <span className="text-sm text-white/60">/one-time</span>
          </div>
          <ul className="mt-8 space-y-4">
            {PRO_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm">
                <div className="h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 bg-white/20">
                  <Check className="h-3 w-3 text-white" aria-hidden="true" />
                </div>
                <span className="text-white/90">{f}</span>
              </li>
            ))}
          </ul>
          {/* Session-21 (S21-2): re-anchored to the LIVE reference's
              hover family (shadow + lift, transition-all) — our
              hover:bg-teal-50 tint had drifted from it. */}
          <a
            href={GUMROAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 block w-full py-3.5 text-center font-semibold rounded-2xl bg-white text-teal-700 hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            Upgrade to Pro – $19
          </a>
        </div>
      </Reveal>
    </div>
  );
}

export function PricingSection({ children }: { children?: React.ReactNode }) {
  return (
    <section id="pricing" className="py-24 px-6 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        {/* Session-19 (S19-11): the header is UNFADED on the reference's
            BOTH routes (live-verified 2026-11-10 — no reveal wrapper on
            the "Simple Pricing" head on / or /Pricing; the CARDS reveal
            on both). The scaffold-era <Reveal> here was a motion-only
            drift; removed for parity. The cards keep their Reveals. */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Simple Pricing</h2>
          <p className="mt-4 text-slate-500">No subscriptions. Pay once, create forever.</p>
        </div>
        {children ?? <PricingCards />}
      </div>
    </section>
  );
}

// ---- section 9: the closing CTA -----------------------------------------------

export function CtaSection() {
  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 p-12 sm:p-16 text-center">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        <Reveal className="relative">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Start Creating Viral Content Today
          </h2>
          <p className="mt-5 text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Upgrade to the Pro version and generate unlimited social media posts
            designed to increase engagement and grow your audience.
          </p>
          {/* Session-21 (S21-5): the gradient rides the sRGB inline form
              (see the monetization headline above) — the utility pair
              compiles `in oklab` and drifts from the reference. */}
          <a
            href={GUMROAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 mt-10 px-10 py-4 text-slate-900 font-bold rounded-full hover:shadow-2xl hover:shadow-teal-400/30 transition-all hover:-translate-y-0.5 text-lg"
            style={{ backgroundImage: "linear-gradient(to right, #2dd4bf, #fbbf24)" }}
          >
            Get Unlimited Access
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
