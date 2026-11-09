import type { NextConfig } from "next";
import path from "node:path";

// Standalone output keeps the production server self-contained (the e2e
// suite boots .next/standalone/server.js on an isolated port with its own
// SQLite file). outputFileTracingRoot is pinned so the traced
// prisma/schema.prisma copy lands at a stable location for the db-path
// resolver (src/lib/db-path.ts).

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.resolve(import.meta.dirname),
  // Session-170 (F-170a — THE ARTIFACT HYGIENE): the upload family's
  // runtime-computed fs paths (uploads.ts's validated-anchor
  // existsSync/resolve chains) make @vercel/nft fall back to tracing the
  // WHOLE repo root — every repo-root entry landed in
  // app/api/upload/route.js.nft.json (2715 skills files alone), shipping
  // .env (the real AUTH_SECRET), .git/ (171 MB), db/ (the dev SQLite
  // file with user rows), uploads/, skills/ (194 MB) and docs/ (49 MB)
  // inside every deployable artifact (~550 MB where ~151 MB suffices).
  // The excludes keep the artifact to the server's true runtime needs
  // (verified live: the photo-upload e2e pair ran GREEN against the
  // clean artifact — prisma/schema.prisma stays traced, the db-path
  // anchors still validate, db/ and uploads/ are mkdir'd on demand).
  // Next's own writeStandaloneDirectory ALSO copies .env explicitly
  // (build/index.js — immune to excludes): the build script's trailing
  // `rm -f .next/standalone/.env` removes that copy (the double-cure).
  outputFileTracingExcludes: {
    "*": [
      ".env",
      ".env.example",
      ".git/**",
      "db/**",
      "uploads/**",
      "skills/**",
      "docs/**",
      "test-results/**",
      "AGENTS.md",
      "CLAUDE.md",
      "README.md",
      "Project_Architecture_Document.md",
      "worklog.md",
      "dev.log",
      "bun.lock",
      "package-lock.json",
      "components.json",
      "eslint.config.mjs",
      "playwright.config.ts",
      "postcss.config.mjs",
      "tsconfig.json",
      "tsconfig.tsbuildinfo",
      "vitest.config.ts",
      "scripts/**",
      "tests/**",
    ],
  },
  // Hide the Next.js dev-tools indicator (the floating "N" button) so dev
  // server screenshots stay clean — it never ships in production anyway.
  devIndicators: false,
  // The reference serves its landing at BOTH / and /Home (its platform
  // routes case-insensitively); a canonical duplicate is an SEO defect, so
  // /Home 308-redirects to the canonical / (nav hrefs keep the reference's
  // /Home spelling — the click lands on the same page).
  async redirects() {
    return [{ source: "/Home", destination: "/", permanent: true }];
  },
  // Session-174 (F-174a — THE TYPE-GATE HARDENING): the scaffold-era
  // `typescript: { ignoreBuildErrors: true }` block is RETIRED — the
  // build IS the type gate now (the zero-balance graft, per the repo's
  // own skills/web-application/SKILL.md §2 + the evaluation report
  // §9.2). Under the old posture a planted type error compiled GREEN
  // into the deployable artifact (reproduced live at this round's
  // gate-proof); the type gate rode only on the manual `bun run
  // typecheck` step — a skipped-command hazard. The explicit typecheck
  // script stays in the gate chain (the FASTER signal); the build is
  // the enforcer. (The `typescript` key stays UNSET: Next's default —
  // ignoreBuildErrors: false — is the hardened form itself.)

  // The reference's edge security set (live census at session 8,
  // 2026-11-09 — curl -I over /, /login, /Dashboard, /sitemap.xml,
  // /robots.txt, the hashed CSS asset, and the manifest 302 hop):
  // `referrer-policy: strict-origin-when-cross-origin` and bare
  // `strict-transport-security: max-age=31536000` on EVERY probed
  // response; `x-content-type-options: nosniff` on the HTML/SSR routes
  // only (absent on sitemap.xml, robots.txt and the CSS asset — its edge
  // serves those without it). The self-hosted expression below ships ALL
  // THREE on every route — the documented superset (broader nosniff is
  // strictly defensive; pinned by tests/http-headers.test.ts). Per
  // RFC 6797 §7.1 a UA MUST NOT process HSTS over non-secure transport,
  // so it is inert on plain-HTTP localhost and correct whenever a
  // deployment runs behind HTTPS.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
        ],
      },
    ];
  },
};

export default nextConfig;
