// ViralPost AI — the post generator seam.
//
// Two faces, one contract:
//  1. The LOCAL ENGINE (default): a deterministic viral-formula writer that
//     satisfies the reference's prompt rules for any idea (hook first line,
//     1-2 sentence paragraphs, emotional tone, blank-line separated, 5-8
//     hashtags, under 200 words, no labels). Zero-config, offline, seeded
//     for tests — the reference's platform LLM was observed returning HTTP
// 402 with the UI hanging forever (docs/reference-investigation.md §5 D-1);
//     the clone's generator must actually WORK without any external key.
//  2. THE PROVIDER FACE (a documented wire-in point, NOT a shipped
//     feature — session-9, F9-3): `generatorPrompt(idea)` reproduces the
//     reference's exact prompt so a future env-keyed OpenAI-compatible
//     module (e.g. src/lib/generator-provider.ts) can slot in without
//     touching the contract. No code reads a provider env var today.
//
// Determinism: the engine is a pure function of (idea, seed) — same inputs,
// same post. The API route passes a crypto-random seed so users see variety
// per click; tests pin seeds.
//
// Relevance: a small niche detector maps the idea's keywords to a niche
// bank (hooks / body templates / hashtag pools). Unknown niches fall back
// to the evergreen bank; the idea's own keywords always join the hashtags.

// Session-40 (S40-12): the specifier normalized to the explicit
// "node:crypto" form (password.ts already used it; the bare-"crypto"
// spelling was the straggler here and in auth/generate).
import { createHash } from "node:crypto";

// Session-25 (S25-14): FREE_LIMIT moved to src/lib/generation-counter.ts
// (the client-safe quota module) — this module imports node crypto
// (ideaSeed's createHash) and the client generator-card's constant
// import dragged it into the client graph. Server consumers of the
// limit (none today) would import it from the counter module.

/** Session-50 (S50-12, AUDIT-1 I1): the seam's bound, exported (one
 *  home) — the API route's schema-failure branch compares the
 *  collapsed idea against THIS bound to pick the honest message,
 *  never a duplicated 500. */
export const MAX_IDEA_CHARS = 500;

/** Session-11 (F11-7): the over-length message, exported so the API
 *  route's schema-failure branch answers the SAME text the seam throws —
 *  the two ceilings (Zod's fast 1000-char pre-filter and the seam's
 *  500-char bound after whitespace collapse) must read as one rule to
 *  the user, not two different errors. */
export function ideaTooLongMessage(): string {
  return "Keep the idea a little shorter (500 characters max).";
}

/** Session-50 (S50-12, AUDIT-1 I1): the RAW-length message — the
 *  schema pre-filter's own bound, never the seam's. A 1001-char idea
 *  whose whitespace-collapsed form fits the seam's 500 was rejected
 *  by the route's raw pre-filter alone; answering the seam's message
 *  told the user their (collapsed) idea was too long when the seam
 *  would have accepted it. The 1000 the text names is the route
 *  bodySchema's max(1000) — co-pinned in api-robustness; the two move
 *  together. */
export function ideaRawLengthMessage(): string {
  return "That idea is too long to submit (1000 characters max).";
}

/** Session-50 (S50-12): the seam's exact collapse, one home — the
 *  control-char replacement, the whitespace collapse, the trim.
 *  sanitizeIdea runs it before its bounds; the route's schema-failure
 *  branch runs it to pick the honest message (a collapse that fits
 *  the seam was rejected by the RAW pre-filter, not the seam). */
export function collapseIdea(raw: string): string {
  return raw
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Collapse whitespace, strip control chars, bound the length. */
export function sanitizeIdea(raw: string): string {
  const cleaned = collapseIdea(raw);
  if (!cleaned) {
    throw new Error("Describe your post idea first.");
  }
  if (cleaned.length > MAX_IDEA_CHARS) {
    throw new Error(ideaTooLongMessage());
  }
  return cleaned;
}

/** The reference's exact LLM prompt (bundle-extracted, verbatim). */
export function generatorPrompt(idea: string): string {
  return `You are ViralPost AI, an expert social media copywriter. Generate a single viral social media post based on this idea: "${idea}"
Rules:
- Write an attention-grabbing hook as the first line
- Use short paragraphs (1-2 sentences each)
- Use an emotional, motivational, or relatable tone
- Add line breaks between paragraphs for readability
- End with 5-8 relevant hashtags
- Keep it under 200 words
- Do NOT include labels like "Hook:" — just the raw post text
- Make it ready to copy and paste directly to social media`;
}

// ---- seeded PRNG (mulberry32 — small, fast, deterministic) ---------------

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rng: () => number, arr: readonly T[]): T {
  return arr[Math.floor(rng() * arr.length) % arr.length];
}

function ideaSeed(idea: string): number {
  const h = createHash("sha256").update(idea).digest();
  return h.readUInt32LE(0);
}

// ---- niche banks -----------------------------------------------------------

interface Niche {
  id: string;
  keywords: readonly string[];
  hooks: readonly string[];
  bodies: readonly (readonly string[])[]; // each entry: 1-2 sentence paragraph templates
  hashtags: readonly string[];
}

const EVERGREEN_HOOKS = [
  "Nobody talks about this, but it changes everything.",
  "Stop scrolling — this is the sign you needed today.",
  "The smallest habit made the biggest difference in my life.",
  "I wish someone had told me this five years ago.",
  "This one shift took me from stuck to unstoppable.",
  "Everyone wants the result. Almost nobody wants this part.",
] as const;

const EVERGREEN_BODIES = [
  [
    "The truth is, most people quit right before it starts working.",
    "Not because they're weak — because nobody showed them what the middle looks like.",
  ],
  [
    "Progress isn't loud — it's showing up on the days you don't feel like it.",
    "That's where the compounding lives.",
  ],
  [
    "You don't need more motivation — you need a smaller first step.",
    "Make it so small you can't say no, then repeat it daily.",
  ],
  [
    "One year from now, you'll wish you had started today.",
    "Start messy, start scared — just start.",
  ],
] as const;

const EVERGREEN_TAGS = [
  "#GrowthMindset",
  "#DailyMotivation",
  "#KeepGoing",
  "#SmallSteps",
  "#MindsetShift",
  "#LevelUp",
] as const;

const NICHES: readonly Niche[] = [
  {
    id: "fitness",
    keywords: ["fitness", "gym", "workout", "training", "run", "running", "muscle", "health", "diet", "weight"],
    hooks: [
      "The body you want is built on the days you don't feel like it.",
      "Six months of consistency beats six years of starting over.",
      "Your only competition is the version of you that skipped today.",
    ],
    bodies: [
      [
        "Every rep is a vote for the person you're becoming.",
        "You don't need a perfect plan — you need Monday, done.",
      ],
      [
        "Show up for 20 minutes and watch what happens after 90 days.",
        "That's the whole secret.",
      ],
      [
        "Discipline tastes bitter daily but sweet forever.",
        "Choose your hard.",
      ],
    ],
    hashtags: ["#FitnessMotivation", "#GymLife", "#Consistency", "#TrainHard", "#HealthyHabits", "#NoExcuses"],
  },
  {
    id: "business",
    keywords: ["business", "entrepreneur", "startup", "founder", "sales", "client", "customers", "hustle", "money", "revenue"],
    hooks: [
      "Your business doesn't need more tools. It needs more reps.",
      "I lost money chasing shiny strategies. I made money mastering one.",
      "Most entrepreneurs don't have a traffic problem. They have a clarity problem.",
    ],
    bodies: [
      [
        "Pick one offer, one audience, one channel.",
        "Then be boringly consistent for 90 days.",
      ],
      [
        "Revenue loves simplicity.",
        "The faster you can explain what you do, the faster people can say yes.",
      ],
      [
        "Every expert was once a beginner who refused to quit in public.",
        "Ship the thing, answer the messages, ask for the sale.",
      ],
    ],
    hashtags: ["#EntrepreneurLife", "#BusinessGrowth", "#BuildInPublic", "#FounderMindset", "#SalesTips", "#SmallBusiness"],
  },
  {
    id: "lifestyle",
    keywords: ["lifestyle", "morning", "routine", "habits", "mindfulness", "self", "care", "balance", "minimal"],
    hooks: [
      "Romanticize your life — starting with the next 10 minutes.",
      "Slow mornings changed my entire personality.",
      "You don't need a new life. You need new eyes for this one.",
    ],
    bodies: [
      [
        "The coffee, the sunlight, the quiet before the noise.",
        "That's the luxury everyone can afford and almost nobody takes.",
      ],
      [
        "Protect your peace like it pays bills — because it does.",
        "One boundary at a time.",
      ],
      [
        "Small rituals, repeated, become a life you don't need to escape from.",
        "Start with tonight.",
      ],
    ],
    hashtags: ["#SlowLiving", "#MorningRoutine", "#SelfCareDaily", "#IntentionalLiving", "#MindfulMoments", "#ProtectYourPeace"],
  },
  {
    id: "fashion",
    keywords: ["fashion", "style", "outfit", "wear", "wardrobe", "beauty", "skincare", "look"],
    hooks: [
      "Style isn't about money. It's about decisions.",
      "The best outfit is the one that makes you walk differently.",
      "Your wardrobe should reflect who you're becoming, not who you were.",
    ],
    bodies: [
      [
        "Three staples beat thirty almosts.",
        "Fit, fabric, confidence — in that order.",
      ],
      [
        "Trends borrow your confidence and never give it back.",
        "Wear what makes you feel like the main character.",
      ],
    ],
    hashtags: ["#StyleTips", "#OutfitInspo", "#CapsuleWardrobe", "#FashionDaily", "#WearYourConfidence", "#TimelessStyle"],
  },
  {
    id: "food",
    keywords: ["food", "recipe", "cook", "cooking", "meal", "baking", "kitchen", "dinner", "lunch", "breakfast"],
    hooks: [
      "The 15-minute meal that made my week better.",
      "Good food doesn't need to be complicated — it needs to be shared.",
      "This recipe lives in my head rent-free.",
    ],
    bodies: [
      [
        "Fresh ingredients, one pan, zero stress.",
        "Dinner solved before the playlist ends.",
      ],
      [
        "Cooking at home isn't a chore, it's a plot twist for your week.",
        "Save this for your next grocery run.",
      ],
    ],
    hashtags: ["#EasyRecipes", "#HomeCooking", "#FoodieLife", "#MealPrep", "#ComfortFood", "#CookWithMe"],
  },
  {
    id: "travel",
    keywords: ["travel", "trip", "adventure", "explore", "wanderlust", "vacation", "journey", "destination", "hike"],
    hooks: [
      "The best investment I ever made was a plane ticket.",
      "Go where your phone doesn't know the way home.",
      "One weekend away can reset a whole season of stress.",
    ],
    bodies: [
      [
        "New streets, new pace, new perspective.",
        "You come back different — that's the point.",
      ],
      [
        "Collect moments, not boarding passes.",
        "Save this for your next escape.",
      ],
    ],
    hashtags: ["#TravelMore", "#Wanderlust", "#AdventureAwaits", "#ExploreMore", "#TravelDiaries", "#WeekendGetaway"],
  },
  {
    id: "motivation",
    keywords: ["motivational", "motivation", "discipline", "consistency", "mindset", "goals", "success", "focus", "grind", "habit"],
    hooks: [
      "Motivation is a mood. Discipline is a decision.",
      "You are always one honest conversation with yourself away from a breakthrough.",
      "Consistency will take you places talent can't.",
    ],
    bodies: [
      [
        "Do it tired, do it unsure, do it anyway.",
        "The version of you that doesn't quit is unstoppable.",
      ],
      [
        "Show up when it's boring — that's when it's working.",
        "Future you is watching.",
      ],
      [
        "Small daily wins stack into a life you're proud of.",
        "Start today and stay loud about it.",
      ],
    ],
    hashtags: ["#MotivationDaily", "#DisciplineOverMotivation", "#ConsistencyIsKey", "#MindsetMatters", "#KeepPushing", "#SuccessHabits"],
  },
  {
    id: "tech",
    keywords: ["tech", "ai", "code", "coding", "developer", "software", "app", "startup", "product", "build"],
    hooks: [
      "The tools changed. The winners are still the ones who ship.",
      "AI won't replace you. Someone using it just might.",
      "Every great product started as an embarrassing v1.",
    ],
    bodies: [
      [
        "Learn the tool, solve the problem, share the process.",
        "That's the whole playbook right now.",
      ],
      [
        "Ship small, ship weekly, ship publicly.",
        "Momentum beats perfection.",
      ],
    ],
    hashtags: ["#BuildInPublic", "#TechTwitter", "#AItools", "#DevLife", "#ShipFast", "#LearnInPublic"],
  },
] as const;

const STOPWORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "but", "by", "for", "from", "how",
  "i", "in", "is", "it", "its", "my", "of", "on", "or", "our", "post", "so",
  "that", "the", "their", "them", "they", "this", "to", "up", "we", "what",
  "when", "who", "why", "with", "you", "your", "about", "into", "over", "make",
  "need", "want", "get", "got", "me", "will", "can", "just", "some", "more",
]);

/** Meaningful keywords from the idea, longest first, capped. */
function keywordsOf(idea: string): string[] {
  return Array.from(
    new Set(
      idea
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, " ")
        .split(/\s+/)
        // Session-40 (S40-13): the letter-or-digit guard — a dash-run
        // token (`----`) survived this filter as a "keyword" (the char
        // class keeps `-`), and toHashtag's split/filter/join chain
        // rendered it as a BARE `#` on the hashtag line (extractHashtags
        // would not count it, so the window helper and hashtagCount
        // disagreed on a pathological idea). A keyword must carry at
        // least one alphanumeric character.
        .filter((w) => w.length >= 3 && !STOPWORDS.has(w) && /[a-z0-9]/.test(w)),
    ),
  ).slice(0, 6);
}

function detectNiche(keywords: string[]): Niche | null {
  for (const niche of NICHES) {
    if (keywords.some((k) => niche.keywords.some((nk) => k.includes(nk) || nk.includes(k)))) {
      return niche;
    }
  }
  return null;
}

// ---- hashtag synthesis -----------------------------------------------------

function toHashtag(word: string): string {
  const camel = word
    .split(/[-\s]/)
    .filter(Boolean)
    .map((p) => p[0].toUpperCase() + p.slice(1))
    .join("");
  return `#${camel}`;
}

/** The hashtag fill: idea-derived tags first, then the niche/evergreen
 *  pools, deduped. Session-10 (F10-13): the target is SEEDED to vary in
 *  5-7 — the reference's prompt contract says "5-8 relevant hashtags"
 *  and the old loops always stopped at exactly 5, satisfying the window
 *  only at its minimum (the advertised variety never happened). The
 *  ceiling stays 8 (`slice` cap) for the property suite's window. */
function hashtagsFor(idea: string, niche: Niche | null, rng: () => number): string[] {
  const kws = keywordsOf(idea);
  const own = kws.slice(0, 2).map(toHashtag);
  const target = Math.min(8, 5 + Math.floor(rng() * 3));
  const pool = [...(niche?.hashtags ?? EVERGREEN_TAGS)];
  const tags: string[] = [];
  for (const t of own) if (tags.length < 3 && !tags.includes(t)) tags.push(t);
  while (tags.length < target && pool.length) {
    const t = pool.splice(Math.floor(rng() * pool.length), 1)[0];
    if (!tags.includes(t)) tags.push(t);
  }
  const evergreen = [...EVERGREEN_TAGS];
  while (tags.length < target && evergreen.length) {
    const t = evergreen.splice(Math.floor(rng() * evergreen.length), 1)[0];
    if (!tags.includes(t)) tags.push(t);
  }
  return tags.slice(0, 8);
}

// ---- word counting ----------------------------------------------------------

// Session-41 (S41-13): the export is pin-owned (generator.test.ts and
// property.test.ts assert the engine's wordCount against this helper —
// the independent-oracle form; the extractHashtags precedent below).
export function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

/** Extract the hashtag tokens from a rendered post (the e2e-facing
 * contract helper — tests/generator.test.ts reads the tags back out of
 * the generated text with it). Kept: it has a live caller. */
export function extractHashtags(text: string): string[] {
  return text.match(/#[A-Za-z0-9_]+/g) ?? [];
}

// ---- the engine -------------------------------------------------------------

export interface GeneratedPost {
  text: string;
  wordCount: number;
  hashtagCount: number;
  niche: string;
}

const READER_CTA = [
  "Save this for the day you need it.",
  "Send this to someone who's building something.",
  "Which one hits hardest? Tell me below.",
  "Follow for more honest takes.",
];

/**
 * Deterministic local generation of a viral-ready post.
 * Satisfies the reference prompt's rules; see tests/generator.test.ts.
 */
export function generatePost(idea: string, seed?: number): GeneratedPost {
  const clean = sanitizeIdea(idea);
  const rng = mulberry32(seed ?? ideaSeed(clean));
  const kws = keywordsOf(clean);
  const niche = detectNiche(kws);

  const hooks = [...(niche?.hooks ?? []), ...EVERGREEN_HOOKS];
  const bodyBank = [...(niche?.bodies ?? []), ...EVERGREEN_BODIES];
  const hook = pick(rng, hooks);

  // 2-3 paragraphs, each 1-2 sentences, blank-line separated.
  // Session-20 (S20-11): capped by the bank size — the used-set dedupe
  // below terminates only while bodyBank.length >= paragraphCount (true
  // by 2x margin today), and a future bank edit below 3 entries would
  // otherwise spin this loop forever on a deterministic path.
  const paragraphCount = Math.min(2 + (rng() > 0.55 ? 1 : 0), bodyBank.length);
  const used = new Set<number>();
  const paragraphs: string[] = [];
  while (paragraphs.length < paragraphCount) {
    const idx = Math.floor(rng() * bodyBank.length) % bodyBank.length;
    if (used.has(idx)) continue;
    used.add(idx);
    paragraphs.push(bodyBank[idx].join(" "));
  }

  // Occasionally append a reader CTA as the final short paragraph.
  if (rng() > 0.5) paragraphs.push(pick(rng, READER_CTA));

  const hashtags = hashtagsFor(clean, niche, rng);
  const text = [hook, ...paragraphs, hashtags.join(" ")].join("\n\n");

  return {
    text,
    wordCount: countWords(text),
    hashtagCount: hashtags.length,
    niche: niche?.id ?? "evergreen",
  };
}
