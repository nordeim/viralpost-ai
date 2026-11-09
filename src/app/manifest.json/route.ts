import { SITE_DESCRIPTION, siteUrl } from "@/lib/site";

// /manifest.json — the reference's installable web app manifest
// (live re-verified at session 8, 2026-11-09: the reference serves it via
// a 302 hop to /api/apps/manifests/<app-id>/manifest.json — the platform's
// API route — whose body our route matches field-for-field):
//   {name, short_name} "ViralPost AI", the same 170-char description, TWO icon
//   entries (192x192 + 512x512 — the SAME src on both, their platform
//   screenshot; the self-hosted expression is our /icon.png BrandMark
//   tile), start_url + scope at the origin, display "standalone",
//   theme_color "#000000", background_color "#ffffff".
// Served through an explicit route handler (NEVER app/manifest.ts) —
// Next's MetadataRoute.Manifest serializer re-orders the keys, and the
// object below is built in the reference's exact key order (JSON.stringify
// preserves insertion order). The reference serves it as application/json.
// Static content: prerendered at build time (NEXT_PUBLIC_SITE_URL is
// inlined — set it before `bun run build` in production).
export const dynamic = "force-static";

export function GET(): Response {
  const origin = siteUrl();
  const manifest = {
    name: "ViralPost AI",
    short_name: "ViralPost AI",
    description: SITE_DESCRIPTION,
    icons: [
      {
        src: `${origin}/icon.png`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: `${origin}/icon.png`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
    start_url: origin,
    display: "standalone",
    theme_color: "#000000",
    background_color: "#ffffff",
    scope: origin,
  };
  return new Response(JSON.stringify(manifest), {
    headers: { "content-type": "application/json" },
  });
}
