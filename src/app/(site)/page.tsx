import { Hero } from "@/components/marketing/hero";
import { GeneratorCard } from "@/components/marketing/generator-card";
import {
  ContactSection,
  CtaSection,
  FeaturesSection,
  HowItWorksSection,
  MonetizationSection,
  PricingSection,
  StatsSection,
  TestimonialsSection,
  ToolSection,
} from "@/components/marketing/sections";

// The landing page — the reference's 10-section composition (docs/
// reference-investigation.md §3.2): hero → tool → monetization →
// features → how-it-works → stats → testimonials → pricing → CTA →
// contact. The root layout's metadata object already IS the reference's
// landing head (title "ViralPost AI", the 170-char description, the
// bare-origin canonical, the OG family) — a page export would only
// re-declare the same values.
export default function LandingPage() {
  return (
    <>
      <Hero />
      <ToolSection>
        <GeneratorCard />
      </ToolSection>
      <MonetizationSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <TestimonialsSection />
      {/* Session-24 (S24-8): the pricing block renders PricingSection —
          the /Pricing page's own component — instead of the hand-inlined
          duplicate (byte-identical markup today, but the session-19
          unfaded-header cure had to be applied in TWO places; the
          component IS the markup, so the DOM is unchanged by
          construction). */}
      <PricingSection />
      <CtaSection />
      {/* Session-25 (S25-13): the S24-8 genus, completed — the contact
          block renders the shared ContactSection (the /Contact page's
          own section component) instead of the hand-inlined duplicate. */}
      <ContactSection />
    </>
  );
}
