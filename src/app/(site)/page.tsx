import { Hero } from "@/components/marketing/hero";
import { GeneratorCard } from "@/components/marketing/generator-card";
import { ContactForm } from "@/components/marketing/contact-form";
import {
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
      <section id="contact" className="py-24 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Contact</h2>
            <p className="mt-4 text-slate-500">
              Have questions or partnership ideas? Reach out and let&apos;s build
              something amazing.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
