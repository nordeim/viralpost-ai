import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-131 pins — TEMPLATE-FAMILY LINEAGE, re-attributed session 10
// (F10-4, the F8-6 precedent): the header below originally narrated the
// CRM scaffold's toast walk (its reference's profile page, its walk22
// probe battery) as if it were THIS reference's evidence. It never was:
// viralpostai.base44.app has no photo-upload profile page, and this
// repo's own dossier (docs/reference-investigation.md) records no toast
// surface on any route. What actually holds HERE:
//
//   * THIS reference ships no toast system on any censused surface —
//     our toast is a DELIBERATE SUPERSET construction (the mobile-nav
//     doctrine: the reference's own absence covered by our working
//     surface). The superset justification stands; only the CRM-walk
//     narration was phantom.
//   * The neutral-900 hover literal (D-131a0) and the dead-animation
//     retirement (D-131a1) were scaffold-era fixes whose SESSION
//     NUMBERS (128–131) belong to the template family, not this repo's
//     round history. The classes they pinned are still OUR live
//     contract; the pins below freeze that contract as it ships.
//   * The "tabs.tsx / mobile-nav.tsx" citations described the CRM
//     tree's surfaces — neither file exists here (the s10 sweep
//     verified; session-4's directory census). The toast X is simply
//     the only hover:text-neutral-900 ride in this tree's src/.

const root = path.resolve(import.meta.dirname, "..");
const srcRaw = readFileSync(path.join(root, "src/components/ui/toast.tsx"), "utf8");

// comment-stripped source for the NEGATIVE pins — the fix comments
// themselves name the retired strings (the D-131a0/D-131a1 records), so
// negatives must read code-only (the mutation-feedback stripComments idiom)
// Session-48 (S48-1): the hardened form — line pass first, block
// opener anchored (the S47-10 idiom; the one-idiom doctrine, the
// family's only shape). Session-66 (S66-5): the JSX-comment arm rides
// FIRST (the battery-found third pass — a JSX comment is the one
// comment family the anchored block pass never strips).
function stripComments(s: string): string {
  return s
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/\/\/[^\n]*/g, "")
    .replace(/(^|\s)\/\*[\s\S]*?\*\//g, "$1");
}
const src = stripComments(srcRaw);

/** A bounded region around an anchor (a failed anchor fails the pin). */
function regionAt(anchor: string, before: number, after: number): string {
  const i = src.indexOf(anchor);
  expect(i, `anchor not found: ${anchor}`).toBeGreaterThanOrEqual(0);
  return src.slice(Math.max(0, i - before), i + after);
}

describe("the toast family contract (scaffold-lineage pins, re-attributed session 10 — ours the deliberate superset over a reference that ships no toast)", () => {
  it("the close X rides the neutral-900 hover literal (the scaffold's interactive-hover ink, carried into our literal family)", () => {
    // the button block (the className rides the line above the aria-label)
    const x = regionAt('aria-label="Dismiss notification"', 400, 60);
    expect(x).toContain("hover:text-neutral-900");
    expect(x).not.toContain("hover:text-foreground");
  });

  // Session-14 (S14-6): the dismiss control was hover-only — no visible
  // keyboard focus on the ONE control each toast carries. The cure is the
  // OTP inputs' own focus-visible family (the house pattern, login-card).
  it("the close X shows a visible keyboard focus ring (the OTP inputs' focus-visible family)", () => {
    const x = regionAt('aria-label="Dismiss notification"', 400, 60);
    expect(x).toContain("focus-visible:outline-none");
    expect(x).toContain("focus-visible:ring-2");
    expect(x).toContain("focus-visible:ring-ring");
  });

  it("the card carries NO data-[state] animation arms — the inert scaffold string retired", () => {
    expect(src).not.toContain("data-[state=open]:animate-in");
    expect(src).not.toContain("data-[state=closed]:animate-out");
    expect(src).not.toContain("slide-in-from-bottom-4");
  });

  it("the viewport geometry family (the walk-censused contract: bottom-right from sm, top-full-width below, max-w-[420px] at md, p-4, gap-2)", () => {
    expect(src).toContain("fixed top-0 z-[100]");
    expect(src).toContain("sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]");
    expect(src).toContain("gap-2 p-4");
    expect(src).toContain('aria-label="Notifications"');
    expect(src).toContain('role="region"');
  });

  it("the card chrome family (rounded-xl + p-3.5 + shadow-lg — live-censused 12px radius, 14px padding, the two-layer lg shadow; the polite status role — errors swap to alert, session-11 F11-17)", () => {
    expect(src).toContain("rounded-xl border p-3.5 shadow-lg");
    // Session-11 (F11-17): the role is now variant-conditional — errors
    // announce assertively (role="alert"), every other variant stays
    // polite. The conditional itself is the pin.
    expect(src).toContain('role={item.variant === "error" ? "alert" : "status"}');
  });

  it("the three variant borders (the walk-censused success/error/info pair)", () => {
    expect(src).toContain('item.variant === "success" && "border-emerald-200 bg-white"');
    expect(src).toContain('item.variant === "error" && "border-rose-200 bg-white"');
    expect(src).toContain('item.variant === "info" && "border-line bg-white"');
  });

  it("the 4000ms auto-dismiss + the max-4 cap (live-measured 4126/4118ms; 4 cards after 5 pushes)", () => {
    expect(src).toContain("setTimeout(() => dismiss(item.id), 4000)");
    expect(src).toContain(".slice(-4)");
  });

  it("the title/description classes (the walk-censused 14px/500 title + the 12px muted description)", () => {
    expect(src).toContain('"text-sm font-medium text-foreground"');
    expect(src).toContain('"mt-0.5 text-xs text-muted"');
  });

  it("the icon family (h-4.5 w-4.5 + the three token rides — live-censused 18px rgb(16,185,129) success)", () => {
    expect(src).toContain("h-4.5 w-4.5 text-success");
    expect(src).toContain("h-4.5 w-4.5 text-danger");
    expect(src).toContain("h-4.5 w-4.5 text-primary");
  });

  it("the hover-pause seam (the onMouseEnter/Leave pair — live-proven: holds at 6.5s, dismisses ~4.1s after the unpause)", () => {
    expect(src).toContain("onMouseEnter={() => setPaused(true)}");
    // Session-70 (S70-4a re-anchor): the unpauser carries the
    // focus-containment guard — a keyboard user who focused the card
    // and then sweeps the mouse out must NOT re-arm the timer (the
    // mixed-modality face; the S69-2a co-pin precedent).
    expect(src).toContain(
      "onMouseLeave={() => {\n        if (!rootRef.current?.contains(document.activeElement)) setPaused(false);\n      }}",
    );
  });

  // Session-48 (S48-4, AUDIT-2 L1): the re-arm's dep array joins the
  // seam pin — the round-47 generator.spec comment claimed "the pause
  // arm's dep-array shape is the cheap owner" while NO pin owned it
  // (the comment-truth genus). A "simplified" [item.id] or [] dep
  // deletes the pause entirely (the toast dismisses mid-read) while
  // every existing pin stays green: the seam pair still exists in
  // source, the 4s literal still exists, the e2e leg never hovers.
  it("the pause re-arm's dep array carries BOTH paused and item.id (a dep regression deletes the pause silently)", () => {
    expect(src).toContain("}, [paused, item.id]);");
  });

  // Session-20 (S20-6): the auto-dismiss paused for the MOUSE only — a
  // keyboard user tabbing to the Dismiss button (or an AT user still
  // reading the announced message) got a hard 4s window with no pause
  // equivalent. The focus pair mirrors the hover pair on the card root
  // (the existing paused effect re-arms the timer on both).
  it("the focus-pause seam (onFocus/onBlur mirror the hover pair — keyboard/AT users keep the card while reading)", () => {
    expect(src).toContain("onFocus={() => setPaused(true)}");
    // Session-70 (S70-4a re-anchor): the blur unpauser carries the
    // pointer guard — focus leaving while the pointer still hovers
    // must NOT re-arm the timer (the mirror mixed-modality face).
    expect(src).toContain(
      "onBlur={() => {\n        if (!rootRef.current?.matches(\":hover\")) setPaused(false);\n      }}",
    );
  });

  // Session-70 (S70-4, AUDIT-2 L-1 — code-read): the MIXED-MODALITY
  // pause leak. The unguarded unpausers falsified the S20-6 claim
  // ("an auto-dismiss never fires while focus is inside the card"):
  // a keyboard user who focused the Dismiss button and then swept the
  // mouse across and out of the card re-armed the 4s timer WHILE
  // FOCUS WAS STILL INSIDE — the timer unmounted the focused card and
  // focus fell to <body> (the WCAG 2.4.3 genus the S66-4 arm cured
  // for the click path). The mirror face rode onBlur (focus leaves
  // while the pointer still hovers → unpause → dismiss mid-hover,
  // violating the hover-hold contract). The cure: pause = focus
  // inside OR pointer over, mechanically — the mouseLeave unpauser
  // checks focus containment (rootRef.contains(activeElement)), the
  // blur unpauser checks the :hover state. The sticky touch-hover
  // residual is accepted (the failure direction is "the card stays a
  // beat longer" — the safe direction; the S65-1 over-redaction
  // doctrine one seam over).
  it("the mixed-modality pause guards (mouseLeave checks focus containment, blur checks the pointer — pause = focus inside OR pointer over)", () => {
    expect(src).toContain("if (!rootRef.current?.contains(document.activeElement)) setPaused(false)");
    expect(src).toContain('if (!rootRef.current?.matches(":hover")) setPaused(false)');
    // The unguarded spellings are gone (the battery's revert target).
    expect(src).not.toContain("onMouseLeave={() => setPaused(false)}");
    expect(src).not.toContain("onBlur={() => setPaused(false)}");
  });

  // Session-72 (S72-4, AUDIT-2 M-1 — live-probed): the mount probe,
  // REDESIGNED. The pause machinery is entirely transition-event-driven
  // — a card that MATERIALIZES under a stationary pointer receives no
  // mouseenter on the input path (browsers only fire it on pointer
  // MOVEMENT), and Session-71's :hover-at-mount probe was INERT in
  // every observed context: Chromium does not update the :hover
  // pseudo-class for an element INSERTED under a stationary pointer
  // until its own re-evaluation (probed: false at the mount call
  // both in a fast-mount harness — where the card then auto-dismissed
  // 6/6, the synthetic boundary pass never reaching it — and on the
  // real app's slow-mount face, where the engine's LATER
  // re-evaluation delivered the pause ~1.5s in: the rescue is
  // engine-scheduled, not contractual, and the fast-mount window — a
  // fetch-failure catch arm, a client-side toast — mounts inside it).
  // The cure is the GEOMETRY probe: a module-level last-mouse-position
  // tracker fed by ONE passive pointermove listener (armed at the
  // Toaster's mount — the Toaster is root-mounted, page-lifetime, so
  // the listener never churns per card; the pointerType === "mouse"
  // gate keeps touch/pen drags from parking a phantom cursor that no
  // mouseleave would ever release), read at card mount into a
  // getBoundingClientRect containment test. Deterministic and
  // engine-independent: any engine that fires pointermove is covered,
  // and an engine that DOES live-update :hover at insertion is
  // covered by the same rect. The S20-6 claim family ("an auto-dismiss
  // never fires while focus is inside OR the pointer rests on the
  // card") now mechanically true on the mount face (the behavioral
  // contract rides the S72-4b leg in generator.spec.ts — born green
  // on this app's slow-mount timing, both-writers-deleted is its
  // documented plant; this pin owns the source shape and REDden on
  // the geometry revert plant — the battery's record).
  it("the mount-time geometry probe pauses a card born under a stationary pointer (the :hover-at-mount probe was inert in Chromium — S72-4)", () => {
    // The module-level tracker (null until the first mouse move — a
    // keyboard-only session never parks a cursor).
    expect(src).toContain("let lastMousePos: { x: number; y: number } | null = null;");
    // The Toaster's mount effect arms ONE passive listener with the
    // mouse-only modality gate and cleans it up.
    expect(src).toContain('window.addEventListener("pointermove", track, { passive: true });');
    expect(src).toContain("if (e.pointerType === \"mouse\") lastMousePos = { x: e.clientX, y: e.clientY };");
    expect(src).toContain('window.removeEventListener("pointermove", track);');
    // The card's mount effect reads the rect containment into the
    // pause writer (empty deps — runs once, before any transition
    // event can arrive; the tracker, not the event stream, carries
    // the pre-mount state).
    expect(src).toMatch(
      /const r = root\.getBoundingClientRect\(\);\s*if \(lastMousePos\.x >= r\.left && lastMousePos\.x <= r\.right && lastMousePos\.y >= r\.top && lastMousePos\.y <= r\.bottom\) setPaused\(true\);/,
    );
    // The dead probe is GONE from the source (the inert :hover-at-
    // mount claim retired with it — the comment-truth doctrine).
    expect(src).not.toContain('if (rootRef.current?.matches(":hover")) setPaused(true);');
  });

  // Session-19 (S19-7): the toast icons are decorative — the S15-4
  // doctrine (empty lucide svgs are ignored by AT today, but the
  // attribute is the latent-double-announcement guard for a future
  // title-bearing icon). The ICONS map + the dismiss X carry
  // aria-hidden like every other icon family in the tree.
  it("the decorative icons carry aria-hidden (the S15-4 doctrine, completed on the last unattributed family)", () => {
    expect(src).toContain('success: <CheckCircle2 className="h-4.5 w-4.5 text-success" aria-hidden="true" />');
    expect(src).toContain('error: <AlertCircle className="h-4.5 w-4.5 text-danger" aria-hidden="true" />');
    expect(src).toContain('info: <Info className="h-4.5 w-4.5 text-primary" aria-hidden="true" />');
    expect(src).toContain('<X className="h-3.5 w-3.5" aria-hidden="true" />');
  });

  // Session-19 (S19-8): dynamically INSERTED role="status" cards are
  // inconsistently announced — the ARIA authoring guidance requires the
  // live region to exist before the content change (role="alert" error
  // cards announce reliably; success/info may fall silent on some AT
  // pairs). The viewport itself is the polite live region now (the
  // sonner/Radix pattern).
  it("the viewport is a polite live region (inserted status cards are announced)", () => {
    expect(src).toMatch(/aria-label="Notifications"\s+\n?\s*role="region"/);
    expect(src).toContain('aria-live="polite"');
  });

  // Session-23 (S23-4): the store's subscription rode useState + an
  // effect — a missed-update window (a toast pushed during a sibling's
  // mount effect emits to zero listeners: page-tree effects run before
  // the Toaster's own effect subscribes) and no tear protection under
  // concurrent rendering. The designated primitive is the one the quota
  // counter already uses (generator-card's subscribeUsage — the
  // codebase's own precedent for a module-level mutable store).
  it("session-23 (S23-4): useToasts reads the store through useSyncExternalStore (the generator-card precedent)", () => {
    expect(src).toContain("React.useSyncExternalStore(");
    // The hook's old shape is gone: no seeded useState over the module
    // array (the missed-update window's carrier).
    expect(src).not.toMatch(/useState<ToastItem\[\]>\(toasts\)/);
  });

  // Session-24 (S24-5): the conversion's getServerSnapshot was the
  // uncached `() => []` — React 19's hydration branch calls it TWICE and
  // compares with ===, so every dev hydration of the root-mounted
  // Toaster tripped the "should be cached" console error, plus one
  // redundant post-hydration render (the consistency check sees a fresh
  // [] ≠ the module toasts). The generator-card precedent (`() => 0`) is
  // value-cached; the toast store gains the same: a module-level
  // EMPTY_TOASTS const the snapshot reads.
  it("session-24 (S24-5): the server snapshot is CACHED (a module-level empty const, never a fresh array per call)", () => {
    expect(src).toMatch(/const EMPTY_TOASTS: ToastItem\[\] = \[\]/);
    // The uncached literal form is banned in the store's call — the
    // fresh-array-per-call shape React's hydration branch flags.
    expect(src).not.toContain("() => []");
  });
});

// Session-25 (S25-9): the dismiss glyph rested at text-subtle
// (#94a3b8 ≈2.57:1 on the white card — under the 1.4.11 3:1
// graphical-object floor in its RESTING state; hover lifted it to
// neutral-900). The toast's own description text already rides
// text-muted (#64748b ≈4.76:1); the glyph joins it. The hover arm and
// the S14-6 focus-visible ring stay untouched.
describe("session-25 (S25-9): the dismiss glyph rests over the 3:1 floor (text-muted)", () => {
  const read = (p: string) => readFileSync(path.join(root, p), "utf8");
  it("the dismiss button's resting ink is text-muted, the sub-3:1 text-subtle form banned", () => {
    const src = read("src/components/ui/toast.tsx");
    expect(src).not.toContain("p-1 text-subtle");
    expect(src).toContain("p-1 text-muted");
  });

  // Session-25 (S25-7): the S24-5 cure was incomplete — the store's
  // own `let toasts: ToastItem[] = []` was a DIFFERENT array object
  // from EMPTY_TOASTS, so the hydration consistency check
  // (getSnapshot vs getServerSnapshot, Object.is) still failed and
  // forced the one post-hydration re-render the S24-5 ledger listed as
  // cured. Only the dev-console === warning had been fixed. The store
  // only ever REASSIGNS (filter/spread — never mutates), so seeding
  // from the const is safe and the compare passes.
  it("session-25 (S25-7): the store's initial array IS the cached const (the hydration compare passes)", () => {
    const src = read("src/components/ui/toast.tsx");
    expect(src).toMatch(/let toasts: ToastItem\[\] = EMPTY_TOASTS;/);
    // The fresh-literal init — the shape that kept the post-hydration
    // re-render alive after S24-5 (two distinct objects; Object.is
    // fails; numbers compare by value, arrays by reference).
    expect(src).not.toMatch(/let toasts: ToastItem\[\] = \[\];/);
  });
});

// ---------------------------------------------------------------------------
// Session-42 (S42-7): the toast call-site census — the S41-6 note's count,
// made mechanical. The note shipped reading "only toast.error ×6 and
// toast.info ×1 have live callers" — the actual call sites are error ×5
// (generator-card ×3, contact-form ×2) + info ×1 (login-card) = 6 TOTAL;
// the ×6 counted the total and mis-attributed it to error (the count-truth
// genus, the same session's own S41-10). This census re-derives the live
// multiset from comment-stripped src/ every run, so the note can never
// drift from the code again. `toast.success` is pinned at ZERO call sites
// BY DESIGN (the S41-6 adjudication: the variant triad is the reference's
// censused toast anatomy — the kit face; it stays). The internal `dismiss(`
// calls in toast.tsx are bare (not `toast.dismiss(`), so the member-anchored
// regex counts only external call sites.
// ---------------------------------------------------------------------------
describe("session-42 — the toast call-site census (S42-7)", () => {
  it("THE CALL-SITE CENSUS: comment-stripped src/ carries exactly toast.error ×5 + toast.info ×1 (success ×0 BY DESIGN)", () => {
    const srcDir = path.join(root, "src");
    const files = readdirSync(srcDir, { recursive: true })
      .map(String)
      .filter((f) => f.endsWith(".ts") || f.endsWith(".tsx"));
    expect(files.length).toBeGreaterThan(20); // the census actually censused
    const code = files
      .map((f) => stripComments(readFileSync(path.join(srcDir, f), "utf8")))
      .join("\n");
    const count = (member: string) =>
      [...code.matchAll(new RegExp(`\\btoast\\.${member}\\(`, "g"))].length;
    expect(count("error"), "toast.error call sites (generator-card ×3 + contact-form ×2)").toBe(5);
    expect(count("info"), "toast.info call sites (login-card ×1)").toBe(1);
    expect(
      count("success"),
      "toast.success call sites — zero BY DESIGN (S41-6: the kit face, never retired)",
    ).toBe(0);
  });
});

// Session-66 (S66-4, AUDIT-2 L-1 — verified by read): the dismiss
// FOCUS arm. The only per-card control was the icon-only Dismiss
// button; activating it unmounted the focused card and focus fell to
// <body> (the next Tab resumed at the document top). The same genus
// was deliberately cured on the navbar (F11-11/S25-16/S31-2), the
// paywall swap (S25-15), the login view swaps (S19-10), and the reset
// success swap (S21-6) — but not here. The cure: ToastCard's
// handleDismiss checks whether THIS card holds document.activeElement
// before the store mutation and hands focus to the next remaining
// card's dismiss control (DOM order = tab order; the viewport's
// flex-col-reverse reorders visuals, never tabs). The 5th-push
// eviction face (slice(-4) evicting a focused card) is REGISTERED —
// push() has no DOM seam (the PAD §11 row owns it). The focus-pause
// arm (S20-6) means an auto-dismiss never fires while focus is inside
// the card, so the dismiss click is the sole focus-drop path this arm
// owns. Source pin (the toast is transient — no e2e face; the S31-2
// navbar precedent): the stripped source must carry the
// contains(activeElement) check and the sibling-focus handoff BEFORE
// the dismiss call.
describe("session-66 (S66-4): the dismiss click never drops focus to <body> (the focus-return doctrine's toast arm)", () => {
  it("handleDismiss checks the active element and hands focus to the next remaining card's dismiss control before the store mutation", () => {
    const code = stripComments(srcRaw);
    // The rootRef exists and rides the card's root div.
    expect(code).toContain("rootRef");
    // The focus check precedes the store mutation, and the handoff
    // targets the next remaining card's dismiss control (next sibling
    // first, previous as the fallback).
    expect(code).toMatch(
      /rootRef\.current;[^]*?root\.contains\(document\.activeElement\)[^]*?nextElementSibling[^]*?previousElementSibling[^]*?\.focus\(\);[^]*?dismiss\(item\.id\);/,
    );
  });
});
