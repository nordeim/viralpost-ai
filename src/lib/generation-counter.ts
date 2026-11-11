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

/** True when the free limit is reached (the card swaps to the paywall). */
export function limitReached(record: QuotaRecord | null, today: string, limit: number): boolean {
  return usedToday(record, today) >= limit;
}

// ---- localStorage adapters (browser only) ---------------------------------

// The usage store — a tiny emitter so React can read the counter through
// useSyncExternalStore (hydration-safe, no setState-in-effect cascades;
// incrementLive() notifies and the card re-renders with the fresh count).
const listeners = new Set<() => void>();

export function subscribeUsage(fn: () => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

function emitUsage(): void {
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
