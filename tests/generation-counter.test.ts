// The free-quota counter contract — the reference's verbatim semantics.
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
