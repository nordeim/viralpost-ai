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
//  2. The PROVIDER FACE: `generatorPrompt(idea)` reproduces the reference's
//     exact prompt; an optional OpenAI-compatible HTTP provider (server
//     side, env-keyed) can be wired in src/lib/generator-provider.ts.
//
// Determinism: the engine is a pure function of (idea, seed) — same inputs,
// same post. The API route passes a crypto-random seed so users see variety
// per click; tests pin seeds.
//
// Relevance: a small niche detector maps the idea's keywords to a niche
// bank (hooks / body templates / hashtag pools). Unknown niches fall back
// to the evergreen bank; the idea's own keywords always join the hashtags.

import { createHash } from "crypto";

export const FREE_LIMIT = 3; // the reference's pl constant (3/day)

const MAX_IDEA_CHARS = 500;

/** Collapse whitespace, strip control chars, bound the length. */
export function sanitizeIdea(raw: string): string {
  const cleaned = raw
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!cleaned) {
    throw new Error("Describe your post idea first.");
  }
  if (cleaned.length > MAX_IDEA_CHARS) {
    throw new Error("Keep the idea a little shorter (500 characters max).");
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
        .filter((w) => w.length >= 3 && !STOPWORDS.has(w)),
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

/** 5-8 hashtags: 2-3 idea-derived + niche/evergreen pool, deduped, capped. */
function hashtagsFor(idea: string, niche: Niche | null, rng: () => number): string[] {
  const kws = keywordsOf(idea);
  const own = kws.slice(0, 2).map(toHashtag);
  const pool = [...(niche?.hashtags ?? EVERGREEN_TAGS)];
  const tags: string[] = [];
  for (const t of own) if (tags.length < 3 && !tags.includes(t)) tags.push(t);
  while (tags.length < 5 && pool.length) {
    const t = pool.splice(Math.floor(rng() * pool.length), 1)[0];
    if (!tags.includes(t)) tags.push(t);
  }
  const evergreen = [...EVERGREEN_TAGS];
  while (tags.length < 5 && evergreen.length) {
    const t = evergreen.splice(Math.floor(rng() * evergreen.length), 1)[0];
    if (!tags.includes(t)) tags.push(t);
  }
  return tags.slice(0, 8);
}

// ---- word counting ----------------------------------------------------------

export function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

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
  const paragraphCount = 2 + (rng() > 0.55 ? 1 : 0);
  const used = new Set<number>();
  const paragraphs: string[] = [];
  while (paragraphs.length < paragraphCount) {
    const idx = Math.floor(rng() * bodyBank.length) % bodyBank.length;
    if (used.has(idx)) continue;
    used.add(idx);
    paragraphs.push(bodyBank[idx].join(" "));
  }

  // Occasionaally append a reader CTA as the final short paragraph.
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
