// The generator contract — the reference's own rules, pinned.
//
// Source of truth: the reference app's LLM prompt (extracted verbatim from
// its bundle; docs/reference-investigation.md §4):
//   - attention-grabbing hook as the first line
//   - short paragraphs (1-2 sentences each)
//   - emotional / motivational / relatable tone
//   - line breaks between paragraphs
//   - ends with 5-8 relevant hashtags
//   - under 200 words
//   - no labels like "Hook:" — raw post text only
//
// The local engine must satisfy every rule for ANY idea input (property
// tests), and the provider seam must expose the same shape.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import fc from "fast-check";

import {
  countWords,
  extractHashtags,
  generatePost,
  generatorPrompt,
  sanitizeIdea,
} from "@/lib/generator";
import { FREE_LIMIT } from "@/lib/generation-counter";

// Non-throwing mirror of sanitizeIdea's emptiness rule (sanitizeIdea itself
// throws on empty input — a throwing filter breaks fast-check's runner).
const hasContent = (s: string) => s.replace(/[\u0000-\u001f\u007f\s]+/g, "").length > 0;
const IDEA_ARBITRARY = fc.string({ minLength: 1, maxLength: 300 }).filter(hasContent);

describe("generator: the reference prompt contract", () => {
  it("reproduces the reference's exact prompt for an idea", () => {
    expect(generatorPrompt("morivational post about consistency")).toBe(
      'You are ViralPost AI, an expert social media copywriter. Generate a single viral social media post based on this idea: "morivational post about consistency"\nRules:\n- Write an attention-grabbing hook as the first line\n- Use short paragraphs (1-2 sentences each)\n- Use an emotional, motivational, or relatable tone\n- Add line breaks between paragraphs for readability\n- End with 5-8 relevant hashtags\n- Keep it under 200 words\n- Do NOT include labels like "Hook:" — just the raw post text\n- Make it ready to copy and paste directly to social media',
    );
  });

  it("ends with 5-8 hashtags for any idea (property)", () => {
    fc.assert(
      fc.property(IDEA_ARBITRARY, fc.integer({ min: 0, max: 1 << 30 }), (raw, seed) => {
        const post = generatePost(sanitizeIdea(raw), seed).text;
        const tags = extractHashtags(post);
        expect(tags.length).toBeGreaterThanOrEqual(5);
        expect(tags.length).toBeLessThanOrEqual(8);
        // hashtags live on the FINAL line, after the body
        const lines = post.trimEnd().split("\n");
        const lastLine = lines[lines.length - 1];
        expect(lastLine.trim()).toBe(tags.join(" "));
        // body (before hashtags) is non-empty
        expect(lines.length).toBeGreaterThanOrEqual(3);
      }),
    );
  });

  it("stays under 200 words including hashtags (property)", () => {
    fc.assert(
      fc.property(IDEA_ARBITRARY, fc.integer({ min: 0, max: 1 << 30 }), (raw, seed) => {
        const { text, wordCount } = generatePost(sanitizeIdea(raw), seed);
        expect(wordCount).toBeLessThanOrEqual(199);
        expect(wordCount).toBe(countWords(text));
      }),
    );
  });

  it("paragraphs are short (1-2 sentences) and separated by blank lines (property)", () => {
    fc.assert(
      fc.property(IDEA_ARBITRARY, fc.integer({ min: 0, max: 1 << 30 }), (raw, seed) => {
        const post = generatePost(sanitizeIdea(raw), seed).text;
        const paragraphs = post
          .trimEnd()
          .split("\n")
          .slice(0, -1) // drop the hashtag line
          .join("\n")
          .split(/\n{2,}/)
          .map((p) => p.trim())
          .filter(Boolean);
        expect(paragraphs.length).toBeGreaterThanOrEqual(2);
        for (const p of paragraphs) {
          const sentences = p.split(/(?<=[.!?])\s+/).filter(Boolean);
          expect(sentences.length).toBeGreaterThanOrEqual(1);
          expect(sentences.length).toBeLessThanOrEqual(2);
        }
      }),
    );
  });

  it("never emits labels like Hook: / Body: / Post: (property)", () => {
    fc.assert(
      fc.property(IDEA_ARBITRARY, fc.integer({ min: 0, max: 1 << 30 }), (raw, seed) => {
        const post = generatePost(sanitizeIdea(raw), seed).text;
        expect(post).not.toMatch(/^\s*(hook|body|post|cta|hashtags?)\s*:/im);
      }),
    );
  });

  // Session-20 (S20-11): the paragraph loop dedupes by a used-set, so it
  // terminates only while bodyBank.length >= paragraphCount — true today
  // by 2x margin (count <= 3; smallest bank = 2 niche + 4 evergreen),
  // but nothing enforced it: a future bank edit below 3 entries would
  // spin the request thread forever on a deterministic path. The count
  // is bank-capped now (source-pinned — the property layer cannot
  // shrink the module-level banks from outside).
  it("session-20 (S20-11): the paragraph count is capped by the body bank (no latent infinite loop)", () => {
    const src = readFileSync(join(import.meta.dirname, "../src/lib/generator.ts"), "utf8")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/[^\n]*/g, "");
    expect(src).toContain("Math.min(2 + (rng() > 0.55 ? 1 : 0), bodyBank.length)");
  });

  it("the first line is a single hook line (no sentence pileup)", () => {
    fc.assert(
      fc.property(IDEA_ARBITRARY, fc.integer({ min: 0, max: 1 << 30 }), (raw, seed) => {
        const post = generatePost(sanitizeIdea(raw), seed).text;
        const firstLine = post.split("\n")[0].trim();
        expect(firstLine.length).toBeGreaterThan(10);
        expect(countWords(firstLine)).toBeLessThanOrEqual(18);
      }),
    );
  });

  it("is deterministic for a fixed seed and varies across seeds", () => {
    const idea = "morivational post for entrepreneurs about consistency";
    const a = generatePost(idea, 42).text;
    const b = generatePost(idea, 42).text;
    expect(a).toBe(b);
    // 20 seeds over a rich idea produce >1 distinct hook
    const hooks = new Set(
      Array.from({ length: 20 }, (_, i) => generatePost(idea, i).text.split("\n")[0]),
    );
    expect(hooks.size).toBeGreaterThan(1);
  });

  it("exercises the hashtag window (the count varies across seeds, 5-7) — session-10, F10-13", () => {
    // The reference's prompt contract says "5-8 relevant hashtags"; the
    // engine used to stop its fill loops at exactly 5 every time — the
    // window satisfied only at its minimum, an honest-claim gap (the
    // advertised variety never happened). The seeded target now varies
    // in 5-7: still inside the 5-8 contract, never fewer than 5, and
    // observably different posts across seeds.
    const idea = "morivational post for entrepreneurs about consistency";
    const counts = new Set(
      Array.from({ length: 100 }, (_, i) => generatePost(idea, i).hashtagCount),
    );
    for (const c of counts) {
      expect(c).toBeGreaterThanOrEqual(5);
      expect(c).toBeLessThanOrEqual(8);
    }
    expect(counts.size).toBeGreaterThan(1);
  });

  it("reflects the idea's topic in the output (relevance)", () => {
    const idea = "morivational post for entrepreneurs about consistency";
    const out = generatePost(idea, 7).text.toLowerCase();
    expect(out).toMatch(/consistency|discipline|showing up|entrepreneur/);
  });
});

describe("generator: input hygiene", () => {
  it("sanitizes control characters and collapses whitespace", () => {
    expect(sanitizeIdea("  hello \n\n world \t!  ")).toBe("hello world !");
    expect(sanitizeIdea("a\x00b")).toBe("a b");
  });

  it("rejects empty / whitespace-only / oversized ideas", () => {
    expect(() => sanitizeIdea("   ")).toThrow(/describe/i);
    expect(() => sanitizeIdea("x".repeat(501))).toThrow(/shorter/i);
  });

  // Session-40 (S40-13): a dash-run token (`love ---- today`) used to
  // survive keywordsOf as a "keyword" (the char class keeps `-`) and
  // render a bare `#` hashtag — toHashtag's split/filter/join chain
  // yields "" for an all-dash token, so the final line carried a lone
  // `#` that extractHashtags would not count (the window helper and
  // hashtagCount disagreed on a pathological idea). The guard: a
  // keyword token must contain a letter or digit.
  it("S40-13: a dash-run idea token never renders a bare # hashtag", () => {
    const post = generatePost("love ---- today", 42);
    // no lone `#` anywhere in the text (line-start, space-adjacent, or line-end)
    expect(post.text).not.toMatch(/(^|\s)#(\s|$)/m);
    // and the hashtag window still satisfies the 5-8 contract
    const tags = extractHashtags(post.text);
    expect(tags.length).toBeGreaterThanOrEqual(5);
    expect(tags.length).toBeLessThanOrEqual(8);
  });
});

describe("generator: constants", () => {
  it("FREE_LIMIT matches the reference's 3/day", () => {
    expect(FREE_LIMIT).toBe(3);
  });
});
