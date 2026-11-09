import type { Metadata } from "next";

import { CtaSection, PricingSection } from "@/components/marketing/sections";
import { pageMetadata } from "@/lib/site";

// /Pricing — the reference's pricing page: amber-badged dark header, the
// pricing cards, the closing CTA.
export const metadata: Metadata = pageMetadata({ page: "Pricing", route: "/Pricing" });

export default function PricingPage() {
  return (
    <>
      <div className="pt-16 bg-gradient-to-b from-slate-900 to-teal-900 pb-16">
        <div className="max-w-3xl mx-auto text-center pt-16 px-6">
          <span className="inline-block px-4 py-1.5 bg-amber-400/10 text-amber-400 text-xs font-semibold rounded-full border border-amber-400/20 mb-4">
            Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-teal-200/60 text-lg">
            No subscriptions. Pay once, create unlimited viral posts forever.
          </p>
        </div>
      </div>
      <PricingSection />
      <CtaSection />
    </>
  );
}
