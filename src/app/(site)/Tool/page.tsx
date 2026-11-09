import type { Metadata } from "next";

import { GeneratorCard } from "@/components/marketing/generator-card";
import { CtaSection, ToolSection } from "@/components/marketing/sections";
import { pageMetadata } from "@/lib/site";

// /Tool — the reference's generator page: dark slate→teal page header
// (badge + H1 + sub), the generator card, the closing CTA.
export const metadata: Metadata = pageMetadata({ page: "Tool", route: "/Tool" });

export default function ToolPage() {
  return (
    <>
      <div className="pt-16 bg-gradient-to-b from-slate-900 to-teal-900 pb-16">
        <div className="max-w-3xl mx-auto text-center pt-16 px-6">
          <span className="inline-block px-4 py-1.5 bg-teal-400/10 text-teal-400 text-xs font-semibold rounded-full border border-teal-400/20 mb-4">
            Free Tool
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            AI Post Generator
          </h1>
          <p className="text-teal-200/60 text-lg">
            Describe your idea. Let AI do the rest. Viral-ready in seconds.
          </p>
        </div>
      </div>
      <ToolSection>
        <GeneratorCard />
      </ToolSection>
      <CtaSection />
    </>
  );
}
