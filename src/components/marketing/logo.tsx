import Link from "next/link";
import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

// The brand mark — the reference's 32px rounded-square teal gradient tile
// with a white sparkles glyph + the teal→amber gradient wordmark. The
// glyph is the lucide Sparkles icon (the reference's own choice), so the
// mark is independently composed from an open-licensed icon set (no
// proprietary asset is copied).
// Session-12 (F12-13): the mark is a next/link (soft navigation) — the
// raw <a href="/Home"> shipped by the clone did a full document load
// plus the 308 hop; every other internal CTA converted at session 10.

export function Logo({ className }: { className?: string }) {
  return (
    <Link className={cn("flex items-center gap-2 group", className)} href="/Home" aria-label="ViralPost AI — Home">
      <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/30 group-hover:shadow-teal-400/50 transition-shadow">
        <Sparkles className="h-4 w-4 text-white" aria-hidden="true" />
      </div>
      {/* Session-21 (S21-5): the sRGB inline form — v4 compiles the
          hue-crossing utility pair `in oklab`, a ΔR≈26 midband drift
          from the reference's v3 sRGB blend (pinned in
          tests/design-tokens.test.ts). */}
      <span
        className="text-lg font-bold bg-clip-text text-transparent"
        style={{ backgroundImage: "linear-gradient(to right, #2dd4bf, #fbbf24)" }}
      >
        ViralPost AI
      </span>
    </Link>
  );
}
