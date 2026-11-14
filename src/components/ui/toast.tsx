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
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused) return;
    timer.current = setTimeout(() => dismiss(item.id), 4000);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [paused, item.id]);

  return (
    <div
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
        // own ledger is docs/session_1..54.md (re-spelled session-38,
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
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      // Session-20 (S20-6): the focus pair mirrors the hover pair — a
      // keyboard user tabbing to the Dismiss button (or an AT user
      // still reading the announced message) keeps the card; the
      // existing paused effect re-arms the timer on both paths.
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <span className="mt-0.5 shrink-0">{ICONS[item.variant]}</span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">{item.title}</p>
        {item.description && <p className="mt-0.5 text-xs text-muted">{item.description}</p>}
      </div>
      <button
        type="button"
        onClick={() => dismiss(item.id)}
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
        className="shrink-0 rounded-md p-1 text-muted transition-colors hover:bg-line-soft hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Dismiss notification"
      >
        <X className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}

export { Toaster };
