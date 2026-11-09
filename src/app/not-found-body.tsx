"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { NOT_FOUND_LAYOUT } from "@/lib/page-layout";

/**
 * Client body of the custom 404 (session-12 S12-P2 lineage; re-attributed
 * at session 7, F7-4 — the scaffold's session-194 evidence citations
 * described the CRM reference's verification walks; this repo's own
 * evidence is cited below) — the reference's message interpolates the
 * unmatched PATHNAME inside a font-medium slate-700 span, which only a
 * client component can read. Structure (dossier §3.7: H1 "404", H2
 * "Page Not Found", the Go Home button — Verified): space-y-6 center
 * with THREE children — the space-y-2 heading group (404 + the 2px×64px
 * slate-200 divider bar), the space-y-3 text group (Page Not Found +
 * message), and the pt-6 button group (Go Home).
 *
 * THE PATH INTERPOLATION: the reference interpolates its router path
 * WITHOUT the leading slash — `The page "x" could not be found…`.
 * Next's usePathname() carries the leading slash, so the interpolation
 * strips it: pathname.replace(/^\//, "") (the deep-path form
 * "/a/b" → "a/b"). Pinned here by the e2e message assertion
 * (landing.spec.ts: The page "Dashboard" could not be found on
 * /Dashboard — the standing live parity walk re-verifies it each
 * round).
 *
 * THE GO HOME ARM: a <Link href="/"> — an ANCHOR, the WCAG-correct
 * link semantics for a navigation affordance (role=link, the href
 * affordances: right-click, cmd-click, AT announcements). The
 * reference renders a <button> with NO href (its SPA JS-router
 * idiom — dossier §3.7 observed the button) — its own platform gap,
 * the a11y-superset doctrine's member, never mirrored. The rides
 * land at the landing "/" on both.
 *
 * THE GO HOME GLYPH: the reference's HEROICONS home outline inlined
 * verbatim — exactly ONE path, NO stroke-width attr (computed weight
 * 1 — the visibly lighter stroke against lucide's weight-2 default),
 * NO width/height attrs, the bare w-4 h-4 mr-2 class (the one
 * non-lucide icon family in the reference's tree — its 404 view is
 * the platform template's own origin). OUR aria-hidden stays — the
 * reference's svg carries none, its own a11y gap.
 */
export function NotFoundBody() {
  const pathname = usePathname();
  return (
    <div className={NOT_FOUND_LAYOUT.page}>
      <div className={NOT_FOUND_LAYOUT.card}>
        <div className={NOT_FOUND_LAYOUT.center}>
          <div className={NOT_FOUND_LAYOUT.headingGroup}>
            <h1 className={NOT_FOUND_LAYOUT.h1}>404</h1>
            <div className={NOT_FOUND_LAYOUT.divider} aria-hidden="true" />
          </div>
          <div className={NOT_FOUND_LAYOUT.textGroup}>
            <h2 className={NOT_FOUND_LAYOUT.h2}>Page Not Found</h2>
            <p className={NOT_FOUND_LAYOUT.p}>
              The page{" "}
              <span className={NOT_FOUND_LAYOUT.pathSpan}>&quot;{pathname.replace(/^\//, "")}&quot;</span> could not be
              found in this application.
            </p>
          </div>
          <div className={NOT_FOUND_LAYOUT.buttonGroup}>
            <Link href={NOT_FOUND_LAYOUT.homeHref} className={NOT_FOUND_LAYOUT.homeButton}>
              <svg
                className={NOT_FOUND_LAYOUT.homeIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
