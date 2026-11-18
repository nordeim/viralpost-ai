"use client";

// Toast system — a lightweight subscribe/store hook + viewport. Mirrors the
// @radix-ui/react-toast API shape but with far less ceremony (and no portal
// key pitfalls). Auto-dismiss with hover-pause.
// Session-62 (N-62a — donor-ledger numbers, the NEO-CRM family): the
// @radix-ui/react-toast PACKAGE was retired — this
// file never imported it (a from-scratch design since the scaffold); the
// reference above documents the API contract it mirrors, not a dependency.

import * as React from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastVariant = "success" | "error" | "info";

export interface ToastItem {
  id: number;
  title: string;
  description?: string;
  variant: ToastVariant;
}

let toastSeq = 0;

// Module-level store so any component (or plain function via `toast()`) can
// publish without prop drilling. Session-23 (S23-4): the listener is now
// the bare store-change signal (React's onStoreChange re-reads the
// snapshot itself — the payload-carrying form was the old
// setState-listener shape).
type Listener = () => void;
const listeners = new Set<Listener>();

// Session-24 (S24-5): the cached server snapshot — one stable empty
// array for every getServerSnapshot call (React 19's hydration branch
// calls it twice and compares with ===; a fresh literal per call trips
// the dev-console "should be cached" error and forces one redundant
// post-hydration render).
// Session-25 (S25-7): the cure completed — the STORE's initial array is
// the SAME const. S24-5 left `let toasts = []` a distinct object, so
// the hydration consistency check (getSnapshot vs getServerSnapshot,
// Object.is) still failed and the post-hydration re-render survived;
// numbers compare by value, arrays by reference. The store only ever
// REASSIGNS (filter/spread — never mutates), so seeding from the const
// is safe and the compare passes at hydration.
const EMPTY_TOASTS: ToastItem[] = [];
let toasts: ToastItem[] = EMPTY_TOASTS;

// Session-72 (S72-4, AUDIT-2 M-1 — live-probed on the real app): the
// last-mouse-position tracker. The S71-6 :hover-at-mount probe was
// INERT in Chromium — the engine does not update the :hover
// pseudo-class for an element INSERTED under a stationary pointer
// until the next real mouse input (probed: matches(":hover") read
// false at mount in every run while the born-under-cursor card
// auto-dismissed at ~4s with the pointer inside its rect; a 1px move
// after birth correctly pauses — the event machinery was never the
// problem). The geometry probe replaces it: the tracker records the
// pointer's viewport position (clientX/Y pairs with
// getBoundingClientRect), null until the first mouse move (a
// keyboard-only session never parks a cursor — no phantom pause),
// fed by ONE passive listener the Toaster arms at its mount (the
// Toaster is root-mounted, page-lifetime — the listener never churns
// per card). The pointerType === "mouse" gate is the modality gate:
// touch/pen drags fire pointermove too, and a touch-scrolled
// position under the toast would park a phantom cursor that no
// mouseleave would ever release (on touch there is no resting
// cursor — pause-on-hover is a mouse-only concept; live touch/pen
// interaction still rides the mouseenter path).
let lastMousePos: { x: number; y: number } | null = null;

function emit() {
  for (const l of listeners) l();
}

// Session-23 (S23-4): the stable subscription hand useSyncExternalStore
// requires (the Set's add/delete API, wrapped in the subscribe/unsubscribe
// pair React calls on every mount/unmount).
function subscribeToasts(onStoreChange: Listener): () => void {
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
}

function dismiss(id: number) {
  toasts = toasts.filter((t) => t.id !== id);
  emit();
}

function push(title: string, variant: ToastVariant = "info", description?: string) {
  toastSeq += 1;
  const item: ToastItem = { id: toastSeq, title, description, variant };
  toasts = [...toasts, item].slice(-4); // keep the viewport tidy
  emit();
  return item.id;
}

/** Imperative helper usable from anywhere client-side.
 *
 * Session-41 (S41-6): `success` and the public `dismiss` member carry
 * NO in-src call sites today (only toast.error ×5 + toast.info ×1 — 6
 * live call sites total — have live callers; the count re-derived
 * mechanically by the session-42 call-site census in
 * tests/toast-anatomy.test.ts, S42-7) — they stay BY DESIGN, not dead
 * surface: the variant triad + the dismiss control are the reference's
 * walk-censused toast ANATOMY (the parity face of the component kit;
 * retirement would cascade emerald-200's pin and shrink the parity
 * face — the BRAND.name precedent in nav-config.ts).
 * tests/toast-anatomy.test.ts owns every member of this API. */
export const toast = {
  success: (title: string, description?: string) => push(title, "success", description),
  error: (title: string, description?: string) => push(title, "error", description),
  info: (title: string, description?: string) => push(title, "info", description),
  dismiss,
};

function useToasts(): ToastItem[] {
  // Session-23 (S23-4): useSyncExternalStore — the generator-card
  // precedent for this exact store shape (a module-level mutable
  // array + a listeners Set). The old useState+effect pair carried a
  // missed-update window (a toast pushed during a sibling's mount
  // effect emits before the Toaster's effect subscribes — silently
  // dropped) and no tear protection under concurrent rendering. The
  // snapshot `() => toasts` is reference-stable between pushes (the
  // module reassigns on mutation); the server snapshot is the empty
  // viewport.
  // Session-24 (S24-5): the server snapshot reads the module-level
  // EMPTY_TOASTS const — the uncached `() => []` minted a fresh array
  // per call, and React 19's hydration branch calls getServerSnapshot
  // TWICE comparing with === (the dev-console "should be cached"
  // error on every Toaster hydration) plus one redundant
  // post-hydration render (the consistency check saw [] ≠ toasts).
  // The generator-card `() => 0` precedent is value-cached the same
  // way.
  return React.useSyncExternalStore(subscribeToasts, () => toasts, () => EMPTY_TOASTS);
}

const ICONS: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle2 className="h-4.5 w-4.5 text-success" aria-hidden="true" />,
  error: <AlertCircle className="h-4.5 w-4.5 text-danger" aria-hidden="true" />,
  info: <Info className="h-4.5 w-4.5 text-primary" aria-hidden="true" />,
};

function Toaster() {
  const items = useToasts();
  // Session-72 (S72-4): the tracker's single writer — armed here, at
  // the root-mounted viewport's mount, cleaned up at its unmount
  // (the page-lifetime pairing; one listener, never per card).
  // Session-73 (S73-4, AUDIT-2 L-1): the pairing gains the EXIT arm —
  // the tracker is never parked at a position the pointer has left.
  // A mouse exiting the window parks the S72-4 tracker at its exit
  // coordinates (desktop toasts mount at the bottom-right corner —
  // the most common exit path), and a card mounting over that stale
  // position while the pointer is out-of-window probes "inside" →
  // paused with no un-pause path (no mouseenter/mouseleave pair on
  // the inserted card fires while the pointer is outside; the
  // engine never marks it hovered). The exit arm: pointerout fires
  // over every element boundary, so relatedTarget === null is the
  // spec's window-exit discriminator (an interior hop carries the
  // next target); the same mouse-modality gate as the move arm.
  React.useEffect(() => {
    const track = (e: PointerEvent) => {
      if (e.pointerType === "mouse") lastMousePos = { x: e.clientX, y: e.clientY };
    };
    const exit = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.relatedTarget === null) lastMousePos = null;
    };
    window.addEventListener("pointermove", track, { passive: true });
    window.addEventListener("pointerout", exit, { passive: true });
    return () => {
      window.removeEventListener("pointermove", track);
      window.removeEventListener("pointerout", exit);
    };
  }, []);
  return (
    <div
      aria-label="Notifications"
      role="region"
      // Session-19 (S19-8): the viewport is the polite live region — a
      // dynamically INSERTED role="status" card is inconsistently
      // announced unless the live region existed before the content
      // change (the ARIA authoring guidance; role="alert" error cards
      // announce on their own, success/info did not). The sonner/Radix
      // pattern: the container announces, the cards ride inside.
      aria-live="polite"
      // Session-7 live pin: the reference viewport is top-of-screen on
      // phones and bottom-right from sm (sonner-style), the 420px
      // max-width cap at md.
      className="pointer-events-none fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"
    >
      {items.map((t) => (
        <ToastCard key={t.id} item={t} />
      ))}
    </div>
  );
}

function ToastCard({ item }: { item: ToastItem }) {
  // Auto-dismiss (hover-pause via timer reset).
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  // Session-66 (S66-4, AUDIT-2 L-1): the dismiss FOCUS arm's root ref —
  // the repo's focus-return doctrine (the navbar's three arms
  // F11-11/S25-16/S31-2, the paywall swap S25-15, the login view swaps
  // S19-10, the reset success swap S21-6) applied to the toast's own
  // unmount path: dismissing the focused card used to drop focus to
  // <body> (the next Tab resumed at the document top).
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = React.useState(false);

  // Session-72 (S72-4, AUDIT-2 M-1 — live-probed): the MOUNT probe,
  // redesigned as GEOMETRY. The pause machinery is entirely
  // transition-event-driven — a card that MATERIALIZES under a
  // stationary pointer receives no mouseenter on the input path
  // (browsers only fire it on pointer MOVEMENT), and Session-71's
  // :hover probe here was INERT at mount in every observed context:
  // Chromium does not update the :hover pseudo-class for an element
  // INSERTED under a stationary pointer until its own re-evaluation
  // (probed: matches(":hover") read false at the mount call both in
  // a fast-mount harness — insertion ~41ms after the last input,
  // where the card then auto-dismissed at ~4s in 6/6 runs, the
  // synthetic boundary pass never reaching it — and on this app's
  // slow-mount face, insertion ~800ms after the input, where the
  // engine's later re-evaluation DID deliver the pause ~1.5s in).
  // The rescue is engine-scheduled, not contractual — the fast-mount
  // window (a fetch-failure catch arm, a client-side validation
  // toast) mounts inside it and dismisses mid-read. The geometry
  // probe closes the window deterministically at mount,
  // engine-independent: any engine that fires pointermove is
  // covered, and an engine that DOES live-update :hover at insertion
  // is covered by the same rect. The empty dep array runs once,
  // before any transition event can arrive; the tracker
  // (module-level, above), not the event stream, carries the
  // pre-mount state (the S20-6/S70-4 claim family — "an auto-dismiss
  // never fires while focus is inside OR the pointer rests on the
  // card" — now mechanically true on the mount face; the behavioral
  // contract is pinned by the S72-4b leg in generator.spec.ts).
  React.useEffect(() => {
    const root = rootRef.current;
    if (root && lastMousePos) {
      const r = root.getBoundingClientRect();
      if (lastMousePos.x >= r.left && lastMousePos.x <= r.right && lastMousePos.y >= r.top && lastMousePos.y <= r.bottom) setPaused(true);
    }
  }, []);

  React.useEffect(() => {
    if (paused) return;
    timer.current = setTimeout(() => dismiss(item.id), 4000);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [paused, item.id]);

  // The focus handoff rides BEFORE the store mutation (focus management
  // on an unmounting node is a no-op — the S31-2 lesson). DOM order =
  // tab order: the viewport's flex-col-reverse (phone) reorders
  // VISUALS, never tabs, so the DOM-next card is the tab-next target;
  // the previous card is the fallback when this is the newest. The
  // last-card face falls back to <body> (the pre-cure behavior — no
  // viewport focus target exists). The 5th-push eviction face
  // (slice(-4) evicting a FOCUSED card from push(), which has no DOM
  // seam) is REGISTERED — PAD §11 owns it. The S20-6 focus-pause arm
  // means an auto-dismiss never fires while focus is inside the card,
  // so the dismiss click is the sole focus-drop path this arm owns
  // (session-70, S70-4: mechanically true since the mixed-modality
  // guards landed — the mouseLeave/blur unpausers defer to the other
  // modality before re-arming the timer).
  function handleDismiss(): void {
    const root = rootRef.current;
    if (root && root.contains(document.activeElement)) {
      const next = (
        root.nextElementSibling ?? root.previousElementSibling
      )?.querySelector<HTMLButtonElement>(
        "button[aria-label='Dismiss notification']",
      );
      next?.focus();
    }
    dismiss(item.id);
  }

  return (
    <div
      ref={rootRef}
      // Session-11 (F11-17): error toasts announce ASSERTIVELY
      // (role="alert"); every other variant stays polite (role="status").
      role={item.variant === "error" ? "alert" : "status"}
      className={cn(
        "pointer-events-auto flex items-start gap-3 rounded-xl border p-3.5 shadow-lg outline-none",
        // Session-37 (S37-3 file-level lineage note — the .env.example
        // S21-12 / login-card:85 precedent): the bare donor cites in
        // this file — Session-131 (D-131a0/D-131a1), F-128c1, F-131c1,
        // D-124a7, s128/s129/s130, and walk22 below — are DONOR-LEDGER
        // numbers (the NEO-CRM/digma template family's own sessions and
        // findings), never this repo's docs/session_N.md; this repo's
        // own ledger is docs/session_1..85.md (re-spelled session-38,
        // S38-7c, to the census-legible range form — the docs-counts
        // lag invariant now owns this claim).
        // Session-131 (D-131a1): the scaffold-era data-[state] animation
        // family RETIRED — the ToastCard never set data-state, so
        // data-[state=open]:animate-in / animate-out / fade-* /
        // slide-in-from-bottom-4 NEVER applied (zero animation since the
        // scaffold — live-censused tc.animName=none at walk22). The
        // F-131c1 record: the reference's toast system is DOM-DEAD (four
        // Ix.* calls in its bundle, ZERO rendered elements on any trigger
        // path) — no reference surface contracts an animation; retired per
        // the D-124a7 dead-code doctrine. Session-11 (F11-2) completed the
        // retirement: the tw-animate.css vendor import that survived on
        // the phantom "the Radix dialog family rides it" claim is gone too
        // (no Radix package has existed since the session-2 diet).
        item.variant === "success" && "border-emerald-200 bg-white",
        item.variant === "error" && "border-rose-200 bg-white",
        item.variant === "info" && "border-line bg-white",
      )}
      // Session-75 (S74-4b, AUDIT-2 L-1): the ENTER arm is
      // pointer-typed — onPointerEnter gated mouse-only. A touch TAP
      // on a toast fires the compat mouseenter (Chromium/iOS tap
      // synthesis), arming the pause with NO release on that path:
      // the emulated hover parks until the NEXT tap elsewhere, so the
      // pause was unbounded — the S70-4 comment below spelled it "a
      // beat longer", understating the touch face. The gate stops the
      // touch path from arming the pause at all (the 4s auto-dismiss
      // holds); the mouse path is behaviorally identical under the
      // swap (pointerenter fires at the same boundary crossing with
      // the same enter semantics, pointerType "mouse" — the S72-4b
      // e2e leg's real-mouse path unchanged). Pen joins touch on the
      // gated-out side (the S73-4 exit-arm's modality family).
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setPaused(true);
      }}
      // Session-70 (S70-4, AUDIT-2 L-1 — code-read): the unpausers
      // carry the mixed-modality guards — pause = focus inside OR
      // pointer over, mechanically. The old unconditional
      // onMouseLeave re-armed the 4s timer while a keyboard user's
      // focus was still INSIDE the card (the S20-6 claim "an
      // auto-dismiss never fires while focus is inside" was false on
      // this path — the timer unmounted the focused card and focus
      // fell to <body>, the WCAG 2.4.3 genus the S66-4 arm cured for
      // the click path); the guard defers to the focus pair. The
      // spelling stays onMouseLeave: a compat leave at the next tap
      // releases an un-armed pause — a harmless no-op on touch since
      // S74-4b (the enter never fired), and the real unpauser for
      // the mouse path.
      onMouseLeave={() => {
        if (!rootRef.current?.contains(document.activeElement)) setPaused(false);
      }}
      // Session-20 (S20-6): the focus pair mirrors the hover pair — a
      // keyboard user tabbing to the Dismiss button (or an AT user
      // still reading the announced message) keeps the card; the
      // existing paused effect re-arms the timer on both paths.
      onFocus={() => setPaused(true)}
      // Session-70 (S70-4): the MIRROR face — focus leaving while the
      // pointer still hovers must not re-arm the timer either (the
      // hover-hold contract); the :hover check is the pointer
      // containment test. The sticky touch-hover residual is retired
      // by S74-4b's enter-side modality gate (the accepted-residual
      // doctrine this comment carried now belongs to no live path).
      // Session-75 (S75-5, AUDIT-2 A2-F4): the guard consults BOTH
      // pointer truths — the live pseudo-class AND the mount probe's
      // geometry. The :hover-only test contradicted the S72-4 mount
      // probe on the compound path: a card born under a STATIONARY
      // mouse (geometry-paused; the engine does not live-update
      // :hover for an inserted element — the S71-6 probe record
      // above) whose Dismiss is tabbed into and out of read :hover
      // false, re-armed the timer, and auto-dismissed while the
      // pointer physically rested on the card — a residual hole in
      // the S20-6 hover-hold invariant. The geometry mirror (the
      // lastMousePos rect test, the same four comparisons the mount
      // probe runs) closes it: the unpause fires only when NEITHER
      // truth says the pointer rests on the card.
      // Session-76 (S76-1, AUDIT-2 A2-F1): the rect HOISTED — one
      // read, four field comparisons, the mount probe's own idiom
      // (the S75-5 inline form re-resolved the rect per comparison;
      // consecutive reads in one task hit the same layout, so this
      // is the idiom alignment, not a behavior change).
      onBlur={() => {
        const root = rootRef.current;
        if (!root) return;
        if (root.matches(":hover")) return;
        const rect = root.getBoundingClientRect();
        if (
          lastMousePos &&
          lastMousePos.x >= rect.left &&
          lastMousePos.x <= rect.right &&
          lastMousePos.y >= rect.top &&
          lastMousePos.y <= rect.bottom
        )
          return;
        setPaused(false);
      }}
    >
      <span className="mt-0.5 shrink-0">{ICONS[item.variant]}</span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">{item.title}</p>
        {item.description && <p className="mt-0.5 text-xs text-muted">{item.description}</p>}
      </div>
      <button
        type="button"
        onClick={() => handleDismiss()}
        // Session-131 (D-131a0): the hover TEXT arm is the neutral-900
        // literal (the retired foreground-token hover ink #0a0a0a → the
        // neutral-900 form #171717) — the F-128c1 genus's FOURTH arm (s128
        // menu-item ink · s129 outline hover text · s130 ghost hover text;
        // the reference's stock interactive-hover ink #171717). The
        // reference's toast surface is DOM-DEAD (F-131c1 — no live face to
        // parity), so the fix rides OUR superset by the trio precedent +
        // internal consistency: the last live ride of that retired
        // hover-ink form in src/.
        // Session-14 (S14-6): the keyboard focus arm — the OTP inputs'
        // own focus-visible family, so the only per-toast control shows
        // its focus to keyboard users (hover-only was invisible focus).
        // S25-9: the resting ink rides text-muted (4.76:1) — the old
        // sub-3:1 slate-400 ink (2.57:1) sat under the 1.4.11 floor in
        // its resting state. (S28-4: spell the retired form only in
        // prose-safe words — the raw-text step-less census would read
        // the class-shaped spelling as a live consumer demand.)
        className="shrink-0 rounded-md p-1 text-muted transition-colors hover:bg-line-soft hover:text-neutral-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Dismiss notification"
      >
        <X className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}

export { Toaster };
