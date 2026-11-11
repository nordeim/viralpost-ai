import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = join(import.meta.dirname, "..");
const read = (p: string) => readFileSync(join(root, p), "utf8");

// Session-26 (S26-4): the DISK CENSUS walker — every .ts/.tsx file under
// src/ whose content begins with the "use client" directive. The
// hardcoded 13-file roster this test replaced went stale silently the
// day a 14th client component shipped (a new file importing
// @/lib/generator would never be scanned); the census can never miss
// one. The docs-counts reality-census idiom (scan, never hardcode).
function listClientFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...listClientFiles(full));
    } else if (/\.(ts|tsx)$/.test(entry)) {
      const content = readFileSync(full, "utf8").trimStart();
      // Session-27 (S27-7): the single-quoted directive is legal
      // TS/React/Next — the census was blind to it (the double-quoted
      // form alone exempted a 'use client' file from the node:crypto
      // import ban). Both spellings admitted now.
      if (
        content.startsWith('"use client"') ||
        content.startsWith("'use client'")
      )
        out.push(full);
    }
  }
  return out;
}

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
      // Session-24 (S24-8): <PricingCards /> → <PricingSection /> — the
      // landing's pricing block renders the shared component now (the
      // hand-inlined duplicate retired; PricingCards still renders, one
      // level deeper inside PricingSection).
      "<PricingSection />",
      "<CtaSection />",
      // Session-25 (S25-13): <ContactForm /> → <ContactSection /> — the
      // contact block renders the shared component now (ContactForm
      // still renders, one level deeper inside ContactSection — the
      // S24-8 pricing precedent).
      "<ContactSection />",
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

  // Session-29 (S29-3): the response parse mirrors the family's
  // graceful-degradation idiom — login-card (×5), reset-password-screen,
  // and contact-form all parse with `await res.json().catch(() => null)`
  // so a NON-JSON error body (a proxy/CDN 502 HTML page) reaches the
  // `!res.ok || !body?.ok` arm and renders the server's own failure
  // face, not the catch block's network-error toast (misleading for a
  // server-side failure — the button settles either way, D-1 holds).
  it("S29-3: the response parse carries the family's .catch(() => null) (a non-JSON error body reaches the !res.ok arm, not the network catch)", () => {
    const card = read("src/components/marketing/generator-card.tsx");
    expect(card).toContain("res.json().catch(() => null)");
  });

  // Session-23 (S23-21): the two highest-traffic input surfaces' focus
  // styles are the reference's own (focus:ring-teal-500/20 +
  // focus:border-teal-400 — the border ≈1.86:1, the 20%-alpha ring
  // ≈1.2:1, both under the WCAG 1.4.11 3:1 focus-indicator floor).
  // The house genus (S14-6/S15-8/S22-10): a keyboard-only focus-visible
  // superset layer, the reference's base classes untouched. teal-600
  // (#0d9488) computes ≈3.05:1 on white — the floor cleared.
  it("session-23 (S23-21): the input surfaces carry the keyboard-only focus-visible superset ring (WCAG 1.4.11)", () => {
    const card = read("src/components/marketing/generator-card.tsx");
    expect(card).toContain("focus-visible:ring-2 focus-visible:ring-teal-600");
    const form = read("src/components/marketing/contact-form.tsx");
    expect(form).toContain("focus-visible:ring-2 focus-visible:ring-teal-600");
  });

  // Session-24 (S24-4): the Copy button's S21-20 superset ring rode
  // ring-teal-500 (≈2.49:1 on the near-white card — under the floor)
  // while the SAME FILE's textarea carried the S23-3 ring-teal-600
  // (≈3.05:1): the pre-standardization superset survived the AA-floor
  // round one row below the input it sits under. The family unifies —
  // and the sub-3:1 form is banned outright so no future surface can
  // reintroduce it (the reference's base classes stay untouched).
  it("session-24 (S24-4): the Copy button's superset ring joins the AA family — and the sub-3:1 teal-500 form is banned", () => {
    const card = read("src/components/marketing/generator-card.tsx");
    expect(card).toContain("focus-visible:ring-2 focus-visible:ring-teal-600");
    expect(card).not.toContain("focus-visible:ring-teal-500");
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

  // Session-25 (S25-1): the reference's footer Product column ships
  // THREE links — Home / Tool / Pricing — live-censused on both sides
  // this round (390×844 + 1280×800; the dossier §footer has recorded
  // the family since session 1). Ours mapped all four NAV_ROUTES
  // (Contact included) since session 1 — the footer column was never in
  // the side-by-side census set until this round. The navs (desktop +
  // mobile) keep all four routes; the footer is its own surface.
  it("session-25 (S25-1): the footer Product column is the reference's THREE-link family (no Contact)", () => {
    const footer = read("src/components/marketing/footer.tsx");
    expect(footer).toContain('NAV_ROUTES.filter((r) => r.id !== "contact")');
    // The unfiltered map — the drift form that shipped sessions 1–24.
    expect(footer).not.toMatch(/\{NAV_ROUTES\.map/);
  });

  it("session-25 (S25-13): the contact section is ONE component (both pages render ContactSection, the hand-inlined duplicate retired)", () => {
    const landing = read("src/app/(site)/page.tsx");
    const contact = read("src/app/(site)/Contact/page.tsx");
    expect(landing).toContain("<ContactSection />");
    expect(contact).toContain("<ContactSection />");
    // The hand-inlined duplicate — the drift-risk form that shipped
    // sessions 1–24 (the next contact-surface cure would have applied
    // in two places).
    expect(landing).not.toMatch(/<section id="contact"/);
    expect(contact).not.toMatch(/<section id="contact"/);
  });

  // Session-25 (S25-14): generator.ts imports node `crypto` (ideaSeed's
  // createHash) — the client card's FREE_LIMIT import dragged the
  // module (and its node builtin) into the client graph, green only via
  // bundler tolerance. FREE_LIMIT lives in generation-counter.ts now
  // (the client-safe quota module, zero imports); this boundary pin
  // keeps the crypto-bearing module server-side.
  // Session-26 (S26-4): the roster is now a DISK CENSUS — the walker at
  // the file top scans every src/ file carrying the "use client"
  // directive (the hardcoded 13-file roster could not see a 14th
  // client component). The floor documents today's census without
  // failing legitimate growth.
  it("session-25 (S25-14): NO client component imports @/lib/generator (the node-crypto client boundary)", () => {
    const clientFiles = listClientFiles(join(root, "src"));
    expect(
      clientFiles.length,
      "the client census found the expected floor of client components",
    ).toBeGreaterThanOrEqual(13);
    for (const f of clientFiles) {
      expect(readFileSync(f, "utf8"), f).not.toContain('from "@/lib/generator"');
    }
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

  it("the mobile-menu pill says 'Upgrade to Pro – $19' in the reference's bare form (S22-1/S22-2)", () => {
    const navbar = read("src/components/marketing/navbar.tsx");
    // The session-22 walk (2026-11-11): the reference's dropdown REVERTED
    // to its session-1-era form — the priced text WITHOUT the hover family
    // (the session-21 "Upgrade to Pro" + hover-family capture was a
    // transient deploy state on the reference). The closing quote pins
    // that no hover family follows the rounded-full.
    expect(navbar).toContain(
      'className="block w-full text-center px-5 py-2.5 text-sm font-semibold text-slate-900 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"',
    );
    // The priced text rides the MENU pill specifically (the desktop pill
    // keeps the bare "Upgrade to Pro" — the reference's own split).
    expect(navbar).toMatch(/rounded-full"\s*>\s*Upgrade to Pro – \$19/);
  });

  it("the mobile-menu links carry the reference's bare mobile family (S22-3)", () => {
    const navbar = read("src/components/marketing/navbar.tsx");
    // The session-22 walk: the reference's dropdown links show the BARE
    // mobile family again (no after:* underline affordances — the
    // session-21 S21-4 adoption is retired; py-2 rides the reference's
    // own base now, so the touch target matches ours).
    expect(navbar).toContain(
      'const MENU_LINK_BASE =\n  "block w-full text-left text-sm font-medium py-2 transition-colors";',
    );
    expect(navbar).toContain('? "text-teal-400"\n                  : "text-slate-300 hover:text-white",');
    // The underline family is banned from the menu composition (the
    // desktop LINK_BASE keeps it — only the MENU const is pinned bare).
    expect(navbar).not.toMatch(/MENU_LINK_BASE[\s\S]{0,400}after:absolute/);
  });

  it("the menu panel darkens when the home route scrolls into light sections (S22-5)", () => {
    const navbar = read("src/components/marketing/navbar.tsx");
    // Session-22 (S22-5): `onHero` alone keyed the dark-panel superset on
    // the ROUTE — on `/` the panel never gained bg-slate-900/95 even
    // scrolled deep into the landing's light sections (slate-300 links
    // over #f8fafc compute ~1.48:1). The scrolled arm mirrors the bar's
    // own `scrolled ||` key; top-of-hero unscrolled stays transparent
    // (the reference's dead /98 render over the hero).
    expect(navbar).toContain('(!onHero || scrolled) && "bg-slate-900/95 backdrop-blur-xl"');
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
