import { describe, expect, it } from "vitest";
import fc from "fast-check";

import {
  countWords,
    generatePost,
  generatorPrompt,
  sanitizeIdea,
} from "@/lib/generator";
import { FREE_LIMIT } from "@/lib/generation-counter";
import { computeWatermark, rateLimit } from "@/lib/rate-limit";

// The property layer (session-9, F9-5 — the PAD's "property tests
// (fast-check) on the generator contract" claim made TRUE, and the
// rate-limit fixed-window arithmetic pinned over generated spaces —
// the same properties rate-limit.ts's header has cited since
// session-173, whose test file never existed until now).
//
// House doctrine: properties assert the CONTRACT, never the
// implementation — every rule below traces to the reference's own
// prompt (generatorPrompt) or the fixed-window semantics, and holds
// for ANY (idea, seed) the generator can face.

// ---- shared arbitraries -------------------------------------------------

// A printable, non-blank idea (the sanitizer's accept class): letters,
// digits, spaces, and common punctuation.
const ideaArb = fc
  .string({ minLength: 1, maxLength: 60 })
  .filter((s) => s.trim().length > 0);

const seedArb = fc.integer({ min: 0, max: 0xffffffff });

// Deterministic unique limiter keys (the seam's Map is module-global).
let keySeq = 0;
const freshKey = () => `prop:${keySeq++}`;

// ---- the generator contract (the reference's own prompt rules) -----------

describe("property: the generator contract over (idea, seed) spaces", () => {
  it("determinism: the same (idea, seed) always produces the identical post", () => {
    fc.assert(
      fc.property(ideaArb, seedArb, (idea, seed) => {
        const a = generatePost(idea, seed);
        const b = generatePost(idea, seed);
        expect(b).toEqual(a);
      }),
    );
  });

  it("the hashtag window: 5-8 hashtags for every idea (the reference's rule)", () => {
    fc.assert(
      fc.property(ideaArb, seedArb, (idea, seed) => {
        const post = generatePost(idea, seed);
        expect(post.hashtagCount).toBeGreaterThanOrEqual(5);
        expect(post.hashtagCount).toBeLessThanOrEqual(8);
      }),
    );
  });

  it("the word bound: every post stays under 200 words (the reference's rule)", () => {
    fc.assert(
      fc.property(ideaArb, seedArb, (idea, seed) => {
        const post = generatePost(idea, seed);
        expect(post.wordCount).toBeLessThan(200);
        expect(post.wordCount).toBe(countWords(post.text));
      }),
    );
  });

  it("the hashtag line: the LAST block is the hashtag line — all tags well-formed, deduped, counted", () => {
    fc.assert(
      fc.property(ideaArb, seedArb, (idea, seed) => {
        const post = generatePost(idea, seed);
        const blocks = post.text.split("\n\n");
        const last = blocks[blocks.length - 1];
        const tags = last.split(/\s+/).filter(Boolean);
        // every token is a hashtag (the last block is tags and only tags)
        for (const t of tags) expect(t).toMatch(/^#[A-Za-z0-9_]+$/);
        // deduped, and the count the envelope reports is the truth
        expect(new Set(tags).size).toBe(tags.length);
        expect(tags.length).toBe(post.hashtagCount);
      }),
    );
  });

  it("the hook-first shape: a non-empty first line, never a labeled form (the 'no labels' rule)", () => {
    fc.assert(
      fc.property(ideaArb, seedArb, (idea, seed) => {
        const post = generatePost(idea, seed);
        const lines = post.text.split("\n");
        const first = lines[0];
        expect(first.trim().length).toBeGreaterThan(0);
        expect(first).not.toMatch(/^(Hook|Body|CTA|Hashtags)\s*:/i);
      }),
    );
  });

  it("the paragraph shape: blocks are single-spaced lines, separated by exactly one blank line", () => {
    fc.assert(
      fc.property(ideaArb, seedArb, (idea, seed) => {
        const post = generatePost(idea, seed);
        const blocks = post.text.split("\n\n");
        expect(blocks.length).toBeGreaterThanOrEqual(3); // hook + body + tags
        for (const block of blocks) {
          expect(block.trim().length).toBeGreaterThan(0); // no empty blocks
          expect(block).not.toMatch(/\n/); // one line per block
        }
      }),
    );
  });

  it("the niche resolution: every post names a niche (a bank id or evergreen)", () => {
    fc.assert(
      fc.property(ideaArb, seedArb, (idea, seed) => {
        const post = generatePost(idea, seed);
        expect(post.niche.length).toBeGreaterThan(0);
      }),
    );
  });
});

// ---- sanitizeIdea (the boundary seam) ------------------------------------

describe("property: sanitizeIdea over arbitrary strings", () => {
  it("accepts-or-throws, never a third thing: the output is always collapsed and bounded", () => {
    fc.assert(
      fc.property(fc.string({ maxLength: 800 }), (raw) => {
        try {
          const clean = sanitizeIdea(raw);
          expect(clean.length).toBeLessThanOrEqual(500);
          expect(clean).toBe(clean.replace(/\s+/g, " ").trim());
          expect(clean.length).toBeGreaterThan(0);
        } catch {
          // the throw class: empty-after-collapse or over-length — the
          // ONLY two throws the seam defines
          const collapsed = raw.replace(/[\u0000-\u001f\u007f]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
          expect(collapsed.length === 0 || collapsed.length > 500).toBe(true);
        }
      }),
    );
  });

  it("control characters never survive into a sanitized idea", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }).filter((s) => s.trim().length > 0),
        fc.string({ minLength: 0, maxLength: 10 }),
        (body, noise) => {
          const clean = sanitizeIdea(`a ${body} b ${noise} c`);
          expect(clean).not.toMatch(/[\u0000-\u001f\u007f]/);
        },
      ),
    );
  });
});

// ---- the fixed-window limiter over generated spaces -----------------------

describe("property: the fixed-window limiter (the crossing, the ceiling, the monotonicity)", () => {
  it("the crossing: exactly `limit` allowed per window, denied until the reset, allowed again after", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 10 }),
        fc.integer({ min: 1_000, max: 600_000 }),
        fc.integer({ min: 0, max: 5 }),
        (limit, windowMs, extraPast) => {
          const key = freshKey();
          const t0 = 1_000_000;
          let allowed = 0;
          for (let i = 0; i < limit; i++) {
            if (rateLimit(key, limit, windowMs, t0).allowed) allowed += 1;
          }
          expect(allowed).toBe(limit); // the window admits exactly `limit`
          // the (limit + over)th and every one until the reset denies
          const over = limit + 1 + extraPast;
          for (let i = limit; i < over; i++) {
            const r = rateLimit(key, limit, windowMs, t0 + i);
            expect(r.allowed).toBe(false);
            expect(r.retryAfterSec).toBeGreaterThanOrEqual(1);
          }
          // past the reset, the window opens again
          const reopened = rateLimit(key, limit, windowMs, t0 + windowMs + 1);
          expect(reopened.allowed).toBe(true);
        },
      ),
    );
  });

  it("the retryAfter ceiling: a denial never promises more than the window (nor less than 1s)", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 6 }),
        fc.integer({ min: 2_000, max: 900_000 }),
        // the probe stays STRICTLY inside the live window (a drift past
        // the reset legitimately reopens the bucket — not this property)
        fc.double({ min: 0, max: 0.99, noNaN: true }),
        (limit, windowMs, driftRatio) => {
          const key = freshKey();
          const t0 = 5_000_000;
          const ceilingSec = Math.ceil(windowMs / 1000);
          const driftMs = Math.floor(driftRatio * windowMs);
          for (let i = 0; i < limit; i++) rateLimit(key, limit, windowMs, t0);
          const denied = rateLimit(key, limit, windowMs, t0 + driftMs);
          expect(denied.allowed).toBe(false);
          expect(denied.retryAfterSec).toBeGreaterThanOrEqual(1);
          expect(denied.retryAfterSec).toBeLessThanOrEqual(ceilingSec);
        },
      ),
    );
  });

  it("remaining is monotonic non-increasing within a window (no refill until the reset)", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 8 }),
        fc.integer({ min: 1_000, max: 300_000 }),
        fc.integer({ min: 0, max: 20_000 }),
        (limit, windowMs, driftMs) => {
          const key = freshKey();
          const t0 = 9_000_000;
          let prev = rateLimit(key, limit, windowMs, t0).remaining;
          for (let i = 1; i < limit; i++) {
            const r = rateLimit(key, limit, windowMs, t0 + driftMs);
            expect(r.remaining).toBeLessThanOrEqual(prev);
            prev = r.remaining;
          }
        },
      ),
    );
  });

  it("computeWatermark: the minimum LIVE resetAt, or `now` when nothing is live", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 50 }),
        fc.integer({ min: 1, max: 100_000 }),
        fc.integer({ min: 0, max: 100_000 }),
        (count, spread, now) => {
          const t = 2_000_000;
          const map = new Map<string, { resetAt: number }>();
          for (let i = 0; i < count; i++) {
            map.set(`k${i}`, { resetAt: t + ((i * spread) % (spread + 1)) });
          }
          const wm = computeWatermark(map, t + now);
          const live = [...map.values()].map((b) => b.resetAt).filter((r) => r > t + now);
          expect(wm).toBe(live.length ? Math.min(...live) : t + now);
        },
      ),
    );
  });
});

// ---- the free-quota constant + the prompt face (static pins) --------------

describe("property layer: the static contract faces", () => {
  it("FREE_LIMIT is the reference's 3/day", () => {
    expect(FREE_LIMIT).toBe(3);
  });

  it("generatorPrompt carries the reference's exact rule family", () => {
    const prompt = generatorPrompt("test idea");
    for (const rule of [
      "attention-grabbing hook as the first line",
      "1-2 sentences",
      "5-8 relevant hashtags",
      "under 200 words",
      "Do NOT include labels",
    ]) {
      expect(prompt).toContain(rule);
    }
  });
});
