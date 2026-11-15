// The free-quota daily counter — the reference's own contract, verbatim
// semantics (docs/reference-investigation.md §4):
//
//   localStorage["viralpost_generations"] = {"date": <toDateString>, "count": n}
//   getUsedToday(): 0 when no record OR the stored date !== today (daily reset)
//   increment(): write {date: today, count: used + 1}
//
// Pure functions over (record, today) so tests need no DOM; the thin
// localStorage adapters live at the bottom.

export const GENERATIONS_KEY = "viralpost_generations";

// Session-25 (S25-14): the free-quota ceiling, moved from
// src/lib/generator.ts — that module imports node crypto (ideaSeed's
// createHash) and the CLIENT generator-card's constant import dragged
// it into the client graph (green only via bundler tolerance). This is
// the quota module (zero imports, client-safe); the reference's own
// `pl` constant, 3/day.
export const FREE_LIMIT = 3;

export interface QuotaRecord {
  date: string;
  count: number;
}

/** The reference's `toDateString()` day key (locale-independent shape). */
export function dayKey(date: Date = new Date()): string {
  return date.toDateString();
}

/** Parse a stored record; null when absent/corrupt (fail-open to 0 used). */
export function parseRecord(raw: string | null | undefined): QuotaRecord | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as { date?: unknown; count?: unknown };
    if (typeof parsed.date !== "string" || typeof parsed.count !== "number") return null;
    if (!Number.isFinite(parsed.count) || parsed.count < 0) return null;
    return { date: parsed.date, count: Math.floor(parsed.count) };
  } catch {
    return null;
  }
}

/** Used-today count with the daily-reset rule. */
export function usedToday(record: QuotaRecord | null, today: string): number {
  if (!record || record.date !== today) return 0;
  return record.count;
}

/** The record after one more generation. */
export function incremented(record: QuotaRecord | null, today: string): QuotaRecord {
  return { date: today, count: usedToday(record, today) + 1 };
}

/** True when the free limit is reached. Kept: pin-owned — the card
 * inlines the comparison (used >= FREE_LIMIT) at its call site; this
 * export exists for its pins (the emailSchema/countWords precedent,
 * S41-13; the missed sibling noted session-42, S42-4). */
export function limitReached(record: QuotaRecord | null, today: string, limit: number): boolean {
  return usedToday(record, today) >= limit;
}

// ---- localStorage adapters (browser only) ---------------------------------

// The usage store — a tiny emitter so React can read the counter through
// useSyncExternalStore (hydration-safe, no setState-in-effect cascades;
// incrementLive() notifies and the card re-renders with the fresh count).
const listeners = new Set<() => void>();

// Session-63 (S63-6, AUDIT-2 L2 + the registered cross-tab sibling): the
// store also re-emits when the live value moves WITHOUT this tab writing
// it — (a) the `storage` event (another tab's increment; the cross-tab
// staleness face registered session 30, cured here at the store), and
// (b) focus/visibilitychange (the same-tab date rollover: a tab left
// open across midnight re-reads the day-rolled counter and the mounted
// paywall unmounts — the server limiter stays the wall either way; this
// is the UX truth). Both re-emitters fire through a change-guard (no
// focus-event render spam), browser-guarded, StrictMode-safe (the wired
// flag — the listeners share the store's own page-lifetime class, the
// same class as the listeners Set itself).
let wired = false;
let lastSeenUsage: number | null = null;

function reemitIfChanged(): void {
  const now = getUsedTodayLive();
  if (now !== lastSeenUsage) {
    lastSeenUsage = now;
    emitUsage();
  }
}

function wireExternalChangeReemit(): void {
  if (wired || typeof window === "undefined") return;
  wired = true;
  window.addEventListener("storage", (e: StorageEvent) => {
    if (e.key === GENERATIONS_KEY) reemitIfChanged();
  });
  window.addEventListener("focus", reemitIfChanged);
  document.addEventListener("visibilitychange", reemitIfChanged);
}

export function subscribeUsage(fn: () => void): () => void {
  wireExternalChangeReemit();
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

function emitUsage(): void {
  // The change-guard's bookkeeping rides every emit path (the local
  // increment included) so a later external change compares against the
  // value the subscribers last saw.
  lastSeenUsage = getUsedTodayLive();
  for (const fn of listeners) fn();
}

function readRaw(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(GENERATIONS_KEY);
  } catch {
    return null; // private-mode / disabled storage — fail open to 0 used
  }
}

function writeRaw(raw: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(GENERATIONS_KEY, raw);
  } catch {
    // Storage unavailable: the counter silently stops persisting — the
    // server-side rate limit still bounds abuse.
  }
}

export function getUsedTodayLive(): number {
  return usedToday(parseRecord(readRaw()), dayKey());
}

export function incrementLive(): void {
  const today = dayKey();
  writeRaw(JSON.stringify(incremented(parseRecord(readRaw()), today)));
  emitUsage();
}

// (Session 9, F9-10: the resetLive escape hatch — documented "Test/escape
// hatch" but no test ever called it (the e2e family clears quota state by
// context, the unit family drives the pure functions) — was retired in the
// S7 api.ts precedent: dead exports go, with a note.)
