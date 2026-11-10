import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = join(import.meta.dirname, "..");
const read = (p: string) => readFileSync(join(root, p), "utf8");

// The landing page's composition pins — the reference's 10-section
// structure (docs/reference-investigation.md §3.2) read at the source
// level. The e2e battery asserts the runtime headings; this is the
// regression net for the section set + the exact vocabulary the
// reference ships.

describe("landing: the section composition", () => {
  it("the page renders hero → tool → monetization → features → how → stats → testimonials → pricing → CTA → contact", () => {
    const page = read("src/app/(site)/page.tsx");
    const order = [
      "<Hero />",
      "<ToolSection>",
      "<MonetizationSection />",
      "<FeaturesSection />",
      "<HowItWorksSection />",
      "<StatsSection />",
      "<TestimonialsSection />",
      "<PricingCards />",
      "<CtaSection />",
      "<ContactForm />",
    ];
    const positions = order.map((marker) => page.indexOf(marker));
    for (const p of positions) expect(p).toBeGreaterThanOrEqual(0);
    expect([...positions].sort((a, b) => a - b)).toEqual(positions);
  });

  it("the hero carries the reference's exact phrase cycle", () => {
    const hero = read("src/components/marketing/hero.tsx");
    expect(hero).toContain('"Go Viral!", "Post Smarter.", "Grow Faster.", "ViralPost AI"');
    expect(hero).toContain("Create Viral Social Media Posts");
    expect(hero).toContain('className="text-teal-400">with AI</span>');
    expect(hero).toContain("AI-Powered Social Media Content");
  });

  // Session-20 (S20-4): the hero composes client islands (Iridescence,
  // ParticleText, Reveal) with serializable props and zero hooks/handlers
  // — a superfluous "use client" shipped its whole static subtree in the
  // client bundle (the CLAUDE standard: the directive only where
  // interactivity demands it). Server composition, byte-identical DOM.
  it("the hero is a Server Component (no use client — the islands carry their own directives)", () => {
    const hero = read("src/components/marketing/hero.tsx");
    expect(hero.startsWith('"use client"')).toBe(false);
  });

  it("the hero mounts the iridescence background with the reference's props", () => {
    const hero = read("src/components/marketing/hero.tsx");
    expect(hero).toContain("<Iridescence hue={174} power={1.5} focus={28} distortion={1.2} />");
    expect(hero).toContain("absolute inset-0 opacity-80");
  });

  it("the hero stat cards match the reference's pair", () => {
    const hero = read("src/components/marketing/hero.tsx");
    expect(hero).toContain("Posts Generated");
    expect(hero).toContain("500K+");
    expect(hero).toContain("Active Users");
    expect(hero).toContain("10K+");
  });

  it("the monetization section ships the reference's EN copy (the session-19 redesign, live-extracted 2026-11-10)", () => {
    const sections = read("src/components/marketing/sections.tsx");
    expect(sections).toContain("Free Access — No Strings Attached");
    expect(sections).toContain("Download Free.");
    expect(sections).toContain("If It Helps You, Help Us Too.");
    // The paragraph (pinned in two halves — prettier wraps the sentence).
    expect(sections).toContain("We believe in honesty. Use the tool completely free. If it transforms");
    expect(sections).toContain("your content and grows your social media presence, contribute");
    expect(sections).toContain("any amount that feels right to you");
    expect(sections).toContain("100% free to start — no credit card required");
    expect(sections).toContain("Instant access, no sign-up hassle");
    expect(sections).toContain("Supporters receive the full Pro version as a thank-you");
    expect(sections).toContain("Your support keeps the tool free for everyone");
    expect(sections).toContain("Get Free Access Now");
    expect(sections).toContain("Support &amp; Unlock Pro");
    // The trust line (pinned in halves — prettier wraps it).
    expect(sections).toContain("100% secure payment via Gumroad · Instant Pro access after");
    expect(sections).toContain("contribution");
    // The retired PT face is gone from the tree entirely.
    expect(sections).not.toContain("Baixe");
    expect(sections).not.toContain("Acesso Gratuito");
  });

  it("the monetization section's CTAs are BOTH Gumroad anchors with the live-extracted classes (the PT era's internal /Tool Link is retired)", () => {
    const sections = read("src/components/marketing/sections.tsx");
    expect(sections).toContain("px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-full");
    expect(sections).toContain("px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-bold rounded-full");
    expect(sections).toContain("w-full sm:w-auto");
    expect(sections).not.toContain('href="/Tool"');
  });

  it("the monetization section mounts the FloatingIcons island (the reference's ten floating icons)", () => {
    const sections = read("src/components/marketing/sections.tsx");
    expect(sections).toContain("<FloatingIcons />");
    const icons = read("src/components/effects/floating-icons.tsx");
    // The ten pinned icons (identity + color step + position + size,
    // live-captured on the reference 2026-11-10).
    expect(icons).toContain('icon: Hash, color: "text-teal-400/40", left: "8%", top: "15%", size: 28');
    expect(icons).toContain('icon: Star, color: "text-amber-400/50", left: "90%", top: "10%", size: 22');
    expect(icons).toContain('icon: TrendingUp, color: "text-teal-300/30", left: "5%", top: "70%", size: 26');
    expect(icons).toContain('icon: Instagram, color: "text-pink-400/40", left: "92%", top: "65%", size: 24');
    expect(icons).toContain('icon: Twitter, color: "text-sky-400/40", left: "15%", top: "85%", size: 20');
    expect(icons).toContain('icon: Sparkles, color: "text-amber-300/50", left: "80%", top: "80%", size: 26');
    expect(icons).toContain('icon: MessageCircle, color: "text-teal-400/30", left: "50%", top: "8%", size: 22');
    expect(icons).toContain('icon: Hash, color: "text-white/20", left: "72%", top: "25%", size: 18');
    expect(icons).toContain('icon: Zap, color: "text-amber-400/30", left: "25%", top: "50%", size: 20');
    expect(icons).toContain('icon: Star, color: "text-teal-300/40", left: "60%", top: "88%", size: 18');
  });

  it("the features section ships the six reference cards", () => {
    const sections = read("src/components/marketing/sections.tsx");
    for (const title of [
      "Instant Generation",
      "Platform Optimized",
      "Smart Hashtags",
      "Viral Formulas",
      "Copy & Post",
      "Any Niche",
    ]) {
      expect(sections).toContain(`title: "${title}"`);
    }
  });

  it("the stats row ships the reference's four numbers", () => {
    const sections = read("src/components/marketing/sections.tsx");
    expect(sections).toContain('value: "10K+"');
    expect(sections).toContain('value: "500K+"');
    expect(sections).toContain('value: "4.9★"');
    expect(sections).toContain('value: "3 sec"');
  });

  it("the testimonials ship the reference's three creators", () => {
    const sections = read("src/components/marketing/sections.tsx");
    expect(sections).toContain("@sofialifestyle");
    expect(sections).toContain("@marcusbizcoach");
    expect(sections).toContain("@lunatiktok");
  });

  it("the pricing cards ship the reference's feature lists", () => {
    const sections = read("src/components/marketing/sections.tsx");
    expect(sections).toContain('"3 posts per day"');
    expect(sections).toContain('"Basic post generation"');
    expect(sections).toContain('"Standard hashtags"');
    expect(sections).toContain('"Unlimited posts"');
    expect(sections).toContain('"High-engagement writing style"');
    expect(sections).toContain('"Advanced hashtag suggestions"');
    expect(sections).toContain('"Priority generation"');
    expect(sections).toContain("MOST POPULAR");
    expect(sections).toContain("Current Plan");
  });
});

describe("landing: the generator card (the reference's core contract)", () => {
  it("carries the reference's class strings", () => {
    const card = read("src/components/marketing/generator-card.tsx");
    expect(card).toContain("bg-white rounded-3xl border border-slate-200 shadow-xl shadow-teal-100/50 p-6 sm:p-8");
    expect(card).toContain("w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl");
    expect(card).toContain("from-teal-500 to-teal-700 text-white font-semibold rounded-2xl");
    expect(card).toContain("from-teal-50/50 to-slate-50 border border-teal-100 rounded-2xl p-6");
    expect(card).toContain("Example: motivational post for entrepreneurs about consistency");
  });

  it("the copy round-trip flips Copy ⇄ Copied! for 2s", () => {
    const card = read("src/components/marketing/generator-card.tsx");
    expect(card).toContain("navigator.clipboard.writeText(post)");
    expect(card).toContain("setTimeout(() => setCopied(false), 2000)");
  });

  it("the limit wall ships the reference's paywall copy", () => {
    const card = read("src/components/marketing/generator-card.tsx");
    expect(card).toContain("You reached the free limit");
    expect(card).toContain("Upgrade to generate unlimited viral social media posts.");
    expect(card).toContain("Unlock Unlimited Posts – $19");
  });

  it("the dot meter fills used-first (teal left-to-right)", () => {
    const card = read("src/components/marketing/generator-card.tsx");
    expect(card).toContain('${i < used ? "bg-teal-500" : "bg-slate-100"}');
  });

  it("the error states settle (the superset over the reference's hang)", () => {
    const card = read("src/components/marketing/generator-card.tsx");
    expect(card).toContain("toast.error");
    expect(card).toContain("setGenerating(false)");
  });
});

describe("landing: the page shells", () => {
  it("the Tool page ships the reference's header trio", () => {
    const page = read("src/app/(site)/Tool/page.tsx");
    expect(page).toContain("Free Tool");
    expect(page).toContain("AI Post Generator");
    expect(page).toContain("Describe your idea. Let AI do the rest. Viral-ready in seconds.");
  });

  it("the Pricing page ships the reference's header trio", () => {
    const page = read("src/app/(site)/Pricing/page.tsx");
    expect(page).toContain("Simple, Transparent Pricing");
    expect(page).toContain("No subscriptions. Pay once, create unlimited viral posts forever.");
  });

  it("the Contact page ships the reference's header trio", () => {
    const page = read("src/app/(site)/Contact/page.tsx");
    expect(page).toContain("Get in Touch");
    expect(page).toContain("Contact Us");
    expect(page).toContain("love to hear from you");
  });

  it("the footer ships the reference's one-liner + product column", () => {
    const footer = read("src/components/marketing/footer.tsx");
    expect(footer).toContain("Smart AI tools for creators, influencers, and businesses.");
    expect(footer).toContain("viral-ready social media posts in seconds");
    expect(footer).toContain("Upgrade – $19");
  });

  it("the site layout wraps every page in navbar + footer", () => {
    const layout = read("src/app/(site)/layout.tsx");
    expect(layout).toContain("<Navbar />");
    expect(layout).toContain("<Footer />");
  });

  it("the standalone auth pages carry NO site chrome", () => {
    for (const p of ["src/app/login/page.tsx", "src/app/signup/page.tsx"]) {
      expect(existsSync(join(root, p))).toBe(true);
      const src = read(p);
      expect(src).not.toContain("Navbar");
      expect(src).not.toContain("Footer");
    }
  });
});

describe("landing: the session-21 CTA re-anchors (the live reference walk)", () => {
  // The 2026-11-11 computed-style walk found five class-level drifts —
  // the first since session 19. These pins hold the re-anchored class
  // strings byte-for-byte against the LIVE reference captures (the
  // round's agent-browser census, both sides, desktop + 390×844).

  it("the footer 'Upgrade – $19' CTA carries the reference's exact classes (S21-1)", () => {
    const footer = read("src/components/marketing/footer.tsx");
    expect(footer).toContain(
      "inline-block px-5 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-teal-500/30 transition-all",
    );
    // The retired clone-form fragments must never return.
    expect(footer).not.toContain("from-teal-400 to-teal-600");
  });

  it("the Pro-card CTA carries the reference's exact classes incl. the hover family (S21-2)", () => {
    const sections = read("src/components/marketing/sections.tsx");
    expect(sections).toContain(
      "mt-8 block w-full py-3.5 text-center font-semibold rounded-2xl bg-white text-teal-700 hover:shadow-lg hover:-translate-y-0.5 transition-all",
    );
    // The retired hover-tint form is banned.
    expect(sections).not.toContain("hover:bg-teal-50 transition-colors inline-block");
  });

  it("the mobile-menu pill says 'Upgrade to Pro' with the reference's hover family (S21-3)", () => {
    const navbar = read("src/components/marketing/navbar.tsx");
    // The menu pill's unique layout prefix + the reference's pill hover
    // family (the desktop pill's own classes — the reference's dropdown
    // now reuses them wholesale).
    expect(navbar).toContain(
      "block w-full text-center px-5 py-2.5 text-sm font-semibold text-slate-900 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full hover:shadow-lg hover:shadow-amber-400/30 transition-all hover:-translate-y-0.5",
    );
    // The retired priced form is banned (the reference changed its pill
    // text after the session-1 dossier capture).
    expect(navbar).not.toContain("Upgrade to Pro – $19");
  });

  it("the mobile-menu links carry the desktop underline family (S21-4)", () => {
    const navbar = read("src/components/marketing/navbar.tsx");
    expect(navbar).toContain(
      "block w-full text-left py-2 text-sm font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-teal-400 after:transition-all",
    );
    expect(navbar).toContain("text-teal-400 after:w-full");
    expect(navbar).toContain("text-slate-300 hover:text-white after:w-0 hover:after:w-full");
  });
});

describe("landing: the fire-and-forget reset timers are unmount-safe (session-17, S17-6)", () => {
  // The toast's own ref + unmount-clearTimeout idiom (toast.tsx),
  // mirrored by the two marketing fire-and-forget resets (the copy
  // flip at 2s, the sent flip at 2.6s). Co-pinned faces — ONE owner:
  // the planted-defect proof removes either unmount clear (or the
  // ref tracking) and REDs this pin. The pins read comment-stripped
  // source (the s64 needle-in-own-doc lesson).
  const bare = (p: string) =>
    read(p)
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/[^\n]*/g, "");

  it("generator-card + contact-form track their reset timers in a ref, reset before re-arm, and clear on unmount", () => {
    for (const [p, setter, ms] of [
      ["src/components/marketing/generator-card.tsx", "setCopied(false)", "2000"],
      ["src/components/marketing/contact-form.tsx", "setSent(false)", "2600"],
    ] as const) {
      const src = bare(p);
      expect(src, `${p} must track the reset timer in a ref`).toContain(
        "React.useRef<ReturnType<typeof setTimeout> | null>(null)",
      );
      expect(src, `${p} must clear the tracked timer before re-arming (the toast's timer-reset idiom)`).toContain(
        "if (resetTimer.current) clearTimeout(resetTimer.current);",
      );
      expect(src, `${p} must clear the tracked timer on unmount`).toMatch(
        /useEffect\(\(\) => \(\) => \{\s*if \(resetTimer\.current\) clearTimeout\(resetTimer\.current\);/,
      );
      expect(src, `${p} must arm the tracked timer`).toContain(
        `resetTimer.current = setTimeout(() => ${setter}, ${ms})`,
      );
    }
  });
});
