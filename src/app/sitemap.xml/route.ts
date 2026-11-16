import { siteUrl } from "@/lib/site";

// /sitemap.xml — the reference's exact format (live re-verified at
// session 8, 2026-11-09: LF-only, no trailing newline after </urlset>,
// 4-space URL indent, changefreq weekly on every entry, priority
// "1.0" for the landing and "0.8" for the rest, the same four routes.
// Session-79 (S79-2, AUDIT-2 L-1 — comment truth): the session-8 note
// recorded the reference listing them /, /Contact, /Pricing, /Tool
// against our nav order; the LIVE reference now lists them /, /Tool,
// /Pricing, /Contact (walk #52's fetch, 2026-11-17) — the SAME order as
// ours, a semantically null difference either way since priorities are
// explicit). Served through an explicit route handler because Next's
// sitemap.ts serializer DROPS the number formatting ("1.0" serializes
// as "1").
//
// Route surface: the canonical paths the router serves — / (the landing),
// /Tool, /Pricing, /Contact. The reference's capitalized /Home alias
// 308-redirects to / (the duplicate-content fix), so only / is listed.
//
// Static content: prerendered at build time (NEXT_PUBLIC_SITE_URL is
// inlined — set it before `bun run build` in production) — the sibling
// SEO routes' own note (robots.txt/manifest.json carry the same
// sentence; session-55, S55-3 — family symmetry for the operator
// reading this one file's header).
export const dynamic = "force-static";

const ROUTES: Array<{ path: string; priority: string }> = [
  { path: "/", priority: "1.0" },
  { path: "/Tool", priority: "0.8" },
  { path: "/Pricing", priority: "0.8" },
  { path: "/Contact", priority: "0.8" },
];

export function GET(): Response {
  const origin = siteUrl();
  const urls = ROUTES.map(
    ({ path, priority }) => `    <url>
        <loc>${origin}${path}</loc>
        <changefreq>weekly</changefreq>
        <priority>${priority}</priority>
    </url>`,
  ).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  return new Response(xml, {
    // The reference's exact content-type (no charset suffix).
    headers: { "content-type": "application/xml" },
  });
}
