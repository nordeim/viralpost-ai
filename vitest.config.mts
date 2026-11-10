import { defineConfig } from "vitest/config";
import path from "node:path";

// Unit-test layer for the pure domain seams of the app (SQLite path
// normalization via the db-path contract, scrypt/HMAC auth helpers, the
// deterministic generator engine, the unknown-route title derivation,
// rate limiting, login/reset view machines, the boot gate, sitemap/SEO
// formats). Browser/E2E coverage lives in tests/e2e/*.spec.ts
// (Playwright — never picked up by this config, which matches
// *.test.ts only).
export default defineConfig({
  test: {
    include: ["src/**/*.test.ts", "tests/**/*.test.ts"],
    // Session-20 (S20-16): the explicit exclusion — tsconfig and eslint
    // both carry skills/ in their exclude/ignores; the include scope
    // above could never reach it, but a future widening would silently
    // admit the owner's catalog (which contains .test.ts files of its
    // own). The three-config exclusion doctrine is now mechanical.
    exclude: ["skills/**", "**/node_modules/**"],
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
});
