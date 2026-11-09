import { siteUrl } from "@/lib/site";

// /robots.txt — the reference's exact format (live re-verified at
// session 8, 2026-11-09: LF-only, no trailing newline, lowercase
// "User-agent", one blank line before the Sitemap entry — the reference's
// 75-byte body with its own origin substituted is byte-identical to ours).
// Served through an explicit route handler because Next's robots.ts
// serializer emits "User-Agent" (capital A) — a cosmetic drift from the
// reference's "User-agent". Static content: prerendered at build time
// (NEXT_PUBLIC_SITE_URL is inlined — set it before `bun run build` in
// production).
export const dynamic = "force-static";

export function GET(): Response {
  const body = `User-agent: *
Allow: /

Sitemap: ${siteUrl()}/sitemap.xml`;
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
