// The free-quota counter contract — the reference's verbatim semantics.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import {
  dayKey,
  GENERATIONS_KEY,
  incremented,
  limitReached,
  parseRecord,
  usedToday,
  type QuotaRecord,
} from "@/lib/generation-counter";

const TODAY = "Sat Nov 08 2026";
const OTHER_DAY = "Fri Nov 07 2026";

describe("generation counter: the reference's daily-reset contract", () => {
  it("the storage key matches the reference's", () => {
    expect(GENERATIONS_KEY).toBe("viralpost_generations");
  });

  it("dayKey() produces Date#toDateString output", () => {
    expect(dayKey(new Date(2026, 10, 8, 14, 33))).toBe(
      new Date(2026, 10, 8, 14, 33).toDateString(),
    );
  });

  it("no record means 0 used", () => {
    expect(usedToday(null, TODAY)).toBe(0);
  });

  it("a record from another day resets to 0 (the daily reset)", () => {
    const record: QuotaRecord = { date: OTHER_DAY, count: 3 };
    expect(usedToday(record, TODAY)).toBe(0);
  });

  it("a same-day record returns its count", () => {
    const record: QuotaRecord = { date: TODAY, count: 2 };
    expect(usedToday(record, TODAY)).toBe(2);
  });

  it("increment() writes today + used+1 (the reference's kj())", () => {
    expect(incremented(null, TODAY)).toEqual({ date: TODAY, count: 1 });
    expect(incremented({ date: TODAY, count: 2 }, TODAY)).toEqual({ date: TODAY, count: 3 });
    // a stale record counts as 0 — the increment lands on today's key
    expect(incremented({ date: OTHER_DAY, count: 3 }, TODAY)).toEqual({ date: TODAY, count: 1 });
  });

  it("limitReached() flips at the limit (3/day, the reference's pl)", () => {
    expect(limitReached({ date: TODAY, count: 2 }, TODAY, 3)).toBe(false);
    expect(limitReached({ date: TODAY, count: 3 }, TODAY, 3)).toBe(true);
    expect(limitReached({ date: OTHER_DAY, count: 3 }, TODAY, 3)).toBe(false);
  });
});

describe("generation counter: parseRecord robustness", () => {
  it("accepts the canonical shape", () => {
    expect(parseRecord('{"date":"Sat Nov 08 2026","count":2}')).toEqual({
      date: "Sat Nov 08 2026",
      count: 2,
    });
  });

  it("rejects null / empty / non-JSON", () => {
    expect(parseRecord(null)).toBeNull();
    expect(parseRecord("")).toBeNull();
    expect(parseRecord("{oops")).toBeNull();
  });

  it("rejects wrong-typed fields (fail open to 0 used); fractional counts floor", () => {
    expect(parseRecord('{"date":5,"count":2}')).toBeNull();
    expect(parseRecord('{"date":"Sat Nov 08 2026","count":"2"}')).toBeNull();
    expect(parseRecord('{"date":"Sat Nov 08 2026","count":-1}')).toBeNull();
    // a tampered fractional count floors to its integer part (fail open)
    expect(parseRecord('{"date":"Sat Nov 08 2026","count":1.5}')).toEqual({
      date: "Sat Nov 08 2026",
      count: 1,
    });
  });
});

// Session-63 (S63-6, AUDIT-2 L2 — plus its registered cross-tab sibling):
// the quota store re-emits when the live value moves WITHOUT this tab
// writing it — (a) the `storage` event (another tab's increment; the
// cross-tab staleness face registered session 30 now cured at the store),
// and (b) focus/visibilitychange (the same-tab date rollover: a tab left
// open across midnight re-reads the day-rolled counter and the paywall
// unmounts — the server limiter is the wall either way, this is the UX
// truth). Both re-emitters fire through a change-guard (no focus-event
// render spam), browser-guarded, StrictMode-safe (a module-level wired
// flag — the listeners share the store's own page-lifetime class, the
// same class as the listeners Set itself). Source-census: the S29-2
// idiom.
describe("session-63 (S63-6): the quota store re-emits on external change (cross-tab + date rollover)", () => {
  it("subscribeUsage's wiring carries the storage listener (key-guarded) + the focus/visibilitychange re-emitters behind a change-guard", () => {
    const root = join(import.meta.dirname, "..");
    const src = readFileSync(join(root, "src", "lib", "generation-counter.ts"), "utf8");
    // The cross-tab face: the storage listener guarded on the counter key.
    expect(src).toContain('addEventListener("storage"');
    expect(src).toContain("e.key === GENERATIONS_KEY");
    // The rollover face: focus + visibilitychange re-emit.
    expect(src).toContain('addEventListener("focus"');
    expect(src).toContain('addEventListener("visibilitychange"');
    // The change-guard: re-emit only when the live value moved.
    expect(src).toContain("reemitIfChanged");
    // The StrictMode-safe one-time wiring.
    expect(src).toContain("wired");
  });
});
