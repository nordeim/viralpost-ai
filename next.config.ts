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
  // THE ARTIFACT HYGIENE (the scaffold family's session-170 F-170a
  // lesson, carried over — this repo has no upload route, but the same
  // tracing hazard applies to ANY repo-root baggage): without excludes,
  // @vercel/nft can drag the whole repo root into the standalone trace —
  // shipping .env (the real AUTH_SECRET), .git/, db/ (the dev SQLite
  // file with user rows), skills/ and docs/ inside every deployable
  // artifact. The excludes keep the artifact to the server's true
  // runtime needs (smoke leg 16 asserts the built artifact carries none
  // of them; prisma/schema.prisma stays traced and the db-path anchors
  // still validate). Next's own writeStandaloneDirectory ALSO copies
  // BOTH .env AND .env.production explicitly (build/index.js's
  // loadedEnvFiles reduce — immune to excludes): the build script's
  // trailing rm removes BOTH copies (the double-cure, extended to the
  // production file at session-49/S49-1 — the standard-convention
  // operator's secrets file shipped inside the artifact before it). The
  // .env.local exclude is nft belt-and-braces (Next's copy loop never
  // touches it, the tracer could).
  outputFileTracingExcludes: {
    "*": [
      ".env",
      ".env.example",
      // Session-49 (S49-1): the production-family names join the env
      // excludes — .env.production is the file Next's standalone writer
      // copies (the rm side of the double-cure); .env.local the
      // convention sibling the tracer could drag.
      ".env.production",
      ".env.local",
      ".git/**",
      "db/**",
      "skills/**",
      "docs/**",
      "test-results/**",
      "AGENTS.md",
      "CLAUDE.md",
      "README.md",
      "Project_Architecture_Document.md",
      "worklog.md",
      "dev.log",
      // Session-23 (S23-18): server.log joins dev.log — the start
      // script's tee creates it; a stale one is nft baggage.
      "server.log",
      "bun.lock",
      "package-lock.json",
      "eslint.config.mjs",
      "playwright.config.ts",
      "postcss.config.mjs",
      "tsconfig.json",
      "tsconfig.tsbuildinfo",
      "vitest.config.mts",
      "scripts/**",
      "tests/**",
      // Session-34 (S34-7): the four tracked root files the excludes
      // missed — none is runtime-traced (nft never imports them), so
      // these are belt-and-suspenders symmetry with the smoke ladder's
      // hygiene leg, which now mirrors this list (the F-170a nft
      // repo-root-drag tripwire in both places).
      "viralpost-ai_SKILL.md",
      "neo-crm_SKILL.md",
      "next.config.ts",
      "LICENSE",
    ],
  },
  // Hide the Next.js dev-tools indicator (the floating "N" button) so dev
  // server screenshots stay clean — it never ships in production anyway.
  devIndicators: false,
  // Session-10 (F10-17 — THE DEV-ORIGIN HYDRATION LOCK): Next 16's
  // blockCrossSiteDEV rejects the HMR WebSocket whenever the browser's
  // Origin hostname is off the dev allowlist (defaults: localhost + its
  // subdomains + the start hostname). Opening dev at
  // http://127.0.0.1:3000 — the loopback IP the repo's own curl probes
  // use — therefore killed ONLY the HMR socket: the page LOOKED loaded
  // while React never hydrated, leaving the mobile menu and every
  // client island inert with zero console errors (live-reproduced: the
  // upgrade probe answered the bare body "Unauthorized"; via localhost
  // the same tree hydrates fine; the production build is immune — the
  // block is dev-only). Entries are BARE HOSTNAMES: only the Origin's
  // hostname is matched, never a scheme or port.
  allowedDevOrigins: ["127.0.0.1"],
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
  // Session-44 (S44-6): X-Frame-Options and CSP ship NOWHERE by the
  // same census — the reference's edge serves neither, so their
  // absence is the deliberate parity posture, not an oversight. A
  // self-hoster behind a framing- or injection-sensitive proxy adds
  // them at that layer (the addition point this note exists to name).
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
