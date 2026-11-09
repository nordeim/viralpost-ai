# Reference Investigation — ViralPost AI (`viralpostai.base44.app`)

**Investigated:** 2026-11-09 (UTC+8), via agent-browser (Chromium) with authorized
operator credentials. This dossier follows the `skills/replicate-web-app` evidence
discipline: every non-trivial claim carries **Verified / Reasoned / Assumed /
Unknown** with the observation that backs it.

**Target origin:** `https://viralpostai.base44.app/` (Base44 no-code platform,
app id `69b30f47e8ef99e55d231da6`, SPA bundle `assets/index-DwiT4li9.js`,
React + Vite + Tailwind + framer-motion + react-bits-style canvas/WebGL
components, Supabase-hosted public assets).

**Authorization:** operator-supplied account (`sepnetflix2023@outlook.com`).
No write-path probes were performed against reference data beyond the
operator-authorized contact-form stub (client-side only, no persistence
observed) and one throwaway signup attempt that the platform rejected.

---

## 1. Route inventory (route matrix)

| Route | Access | Purpose | Main actions | States checked | Evidence | Confidence |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | Public | Landing / marketing + inline generator | nav links, generate, copy, contact submit | default, generating, logged-in | a11y snapshot + DOM dump + network log | Verified |
| `/Home` | Public | Identical landing (same component) | same as `/` | default | DOM dump byte-identical structure | Verified |
| `/Tool` | Public | Generator-focused page | generate, copy | default, disabled button | a11y snapshot + DOM dump | Verified |
| `/Pricing` | Public | Pricing cards | upgrade link (Gumroad) | default | a11y snapshot + DOM dump | Verified |
| `/Contact` | Public | Contact form | submit (client stub) | default, sent | form submit + network log | Verified |
| `/login` | Public | Auth: signin / forgot / signup views | email+password, Google, reset, signup | all 3 views + error state | snapshots + live login | Verified |
| `/Dashboard` | Public | **404 page** | "Go Home" button | default | live navigation | Verified |
| any other | Public | 404 page | "Go Home" | default | `/Dashboard` probe | Verified |

Platform chrome (the "Edit with Base44" floating badge, app-log/analytics
beacons) is builder tooling, not app surface — excluded from the clone.

## 2. Authentication (observed)

- Login form: email + password → `POST /api/apps/{id}/auth/login` → 200 →
  redirect to `/Home`. Session token persisted to `localStorage`
  (`base44_access_token`, `token`). **Verified.**
- `GET /api/apps/{id}/entities/User/me` returns 401 logged-out, 200
  logged-in. **Verified.**
- Signup: email + password + confirm → `POST /api/apps/{id}/auth/register`;
  platform rejects undeliverable mailboxes ("This email address can't receive
  mail") → email-verification flow implied. **Verified** (rejection observed;
  success path not exercised — no throwaway deliverable mailbox available).
- Forgot password: in-card view swap → "Send reset link" (not exercised —
  would send real email). **Reasoned** (view observed, submit not exercised).
- "Continue with Google": platform OAuth button (not exercised). **Verified**
  (presence), flow **Unknown — needs operator Google account**.
- The app has **no protected routes**: every page is public; login only
  affects the `/entities/User/me` call. **Verified.**

## 3. Page-by-page structure (from DOM dumps, `/tmp/ref-html/*.html`)

### 3.1 Shared chrome

- **Nav** (all pages): logo link ("ViralPost AI" — teal-gradient rounded
  square icon + wordmark), links `Home → /Home`, `Tool → /Tool`,
  `Pricing → /Pricing`, `Contact → /Contact` (active link teal+underline),
  amber pill "Upgrade to Pro" → `https://templixco.gumroad.com/l/znzbnd`
  (external, `target=_blank rel="noopener noreferrer"`). Transparent bar over
  the hero (dark) and light pages. **Verified.**
- **Mobile nav (390×844)**: logo + hamburger button → dropdown panel with
  the 4 links + "Upgrade to Pro – $19" pill. Opens/closes on tap. **Verified**
  (live walk + capture `/tmp/ref-mobile-menu.png`).
- **Footer**: logo + one-liner ("Smart AI tools for creators, influencers,
  and businesses. Generate viral-ready social media posts in seconds."),
  5 social icon links (Instagram/Twitter/LinkedIn/YouTube/Facebook — all
  `href="#"` dead stubs), "Product" column (Home/Tool/Pricing), "Get Started"
  → "Upgrade – $19" (Gumroad). **Verified.**

### 3.2 Landing (`/`, `/Home`) — 10 sections

1. **Hero** (`section#home.relative.min-h-screen.overflow-hidden.bg-slate-900.flex.items-center`):
   - Background: full-bleed WebGL canvas (react-bits-style **Iridescence**,
     props `hue:174, power:1.5, focus:28, distortion:1.2`) at `opacity-80`,
     under two gradient overlays (`from-slate-900/95 via-slate-900/70
     to-slate-900/20` and `from-slate-900/80 via-transparent
     to-slate-900/40`). **Verified** (bundle: `function lj({hue:t=174,
     power:e=1.5, focus:n=28, distortion:i=1.2})` + `getContext` WebGL).
   - Badge pill: `inline-flex items-center gap-2 px-4 py-1.5 bg-teal-500/20
     border border-teal-400/30 rounded-full text-xs font-semibold
     text-teal-300 mb-6` + lucide Zap — "AI-Powered Social Media Content".
   - **Particle-text canvas** (react-bits Particles-style): cycles
     `["Go Viral!", "Post Smarter.", "Grow Faster.", "ViralPost AI"]`,
     font `Inter 54px 800`, white, `spread:5, density:5`, animation
     `vaporizeDuration:2, fadeInDuration:1, waitDuration:1`, direction
     `left-to-right`, in a 72px-tall container; sr-only real `<h1>` carries
     "Go Viral! Post Smarter. Grow Faster. ViralPost AI" for a11y/SEO.
     **Verified** (bundle + DOM + canvas rects; mid-vaporize state captured).
   - H2: `text-2xl sm:text-3xl font-bold text-white/90 leading-snug mb-5`
     "Create Viral Social Media Posts **with AI**" (teal-400 span).
   - P: `text-slate-300 text-lg leading-relaxed mb-8 max-w-lg` (the
     tagline). CTA row: "Try the Tool" → `px-8 py-3.5
     bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold
     rounded-full hover:shadow-xl hover:shadow-teal-500/30 hover:-translate-y-0.5`
     + arrow-right icon, links `/Tool`; "Upgrade to Pro – $19" → amber
     outline pill (`bg-amber-400/10 border-2 border-amber-400/50
     text-amber-300 …`) → Gumroad. **Verified.**
   - "WORKS WITH" pills (`bg-white/5 border-white/10 … text-slate-400`).
   - Right column: teal/amber blur blobs + portrait image
     (`rounded-3xl shadow-2xl shadow-teal-900/50`, float animation) + two
     floating stat cards (`bg-white/10 backdrop-blur-md border-white/20
     rounded-2xl`): "Posts Generated 500K+" (teal label) and "Active Users
     10K+" (amber label). Bottom fade `h-24 from-slate-50`.
2. **Tool section** (`#tool`, `py-24 px-6 bg-gradient-to-b from-slate-50
   to-white`, container `max-w-3xl`): H2 `text-3xl sm:text-4xl font-bold
   text-slate-900` + sub; **generator card** `bg-white rounded-3xl border
   border-slate-200 shadow-xl shadow-teal-100/50 p-6 sm:p-8` — counter row
   ("N free generations remaining", `text-xs font-medium text-slate-400`)
   + 3 progress dots (`h-2 w-8 rounded-full transition-colors`, unused =
   `bg-slate-100`); textarea (`rows=3`, `w-full px-5 py-4 bg-slate-50
   border-slate-200 rounded-2xl text-sm … focus:ring-teal-500/20
   focus:border-teal-400 resize-none`); Generate button (`mt-4 w-full py-3.5
   bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold
   rounded-2xl … disabled:opacity-50` + wand-sparkles icon; spinner state
   "Generating…"). **Verified.**
3. **PT monetization section** (`py-20 bg-gradient-to-b from-slate-900
   via-teal-950 to-slate-900` + blur blobs): gift badge "Acesso Gratuito —
   Sem Compromisso", H2 with teal→amber gradient span, 4 benefit rows
   (2-col grid, teal icon chips), CTAs "Acessar Grátis Agora" (teal
   gradient) + "Apoiar com Qualquer Valor & Ganhar o Pro" (amber outline) →
   Gumroad, trust line "Pagamento 100% seguro via Gumroad". **Verified.**
4. **Features**: label "Why ViralPost AI?" + H2 "Everything You Need to Go
   Viral" + 6 cards — Instant Generation, Platform Optimized, Smart
   Hashtags, Viral Formulas, Copy & Post, Any Niche (each with icon, title,
   one-line description). **Verified.**
5. **How It Works**: label "Simple Process" + H2 + 3 numbered steps —
   Describe Your Idea, AI Generates Your Post, Copy & Post. **Verified.**
6. **Stats**: 10K+ Active Users, 500K+ Posts Generated, 4.9★ Average
   Rating, 3 sec Generation Speed (4-col grid). **Verified.**
7. **Testimonials**: "Loved by Creators" — 3 cards, 5-star rows, quotes,
   avatar letter + name + handle: Sofia M. @sofialifestyle, Marcus T.
   @marcusbizcoach, Luna R. @lunatiktok. **Verified.**
8. **Pricing**: H2 "Simple Pricing" / "No subscriptions. Pay once, create
   forever." — Free ($0/forever): 3 posts per day, Basic post generation,
   Standard hashtags, footer chip "Current Plan"; Pro ($19/one-time, "MOST
   POPULAR" ribbon): Unlimited posts, High-engagement writing style,
   Advanced hashtag suggestions, Priority generation, CTA "Upgrade to Pro –
   $19" → Gumroad. **Verified.**
9. **CTA banner**: "Start Creating Viral Content Today" + "Get Unlimited
   Access" → Gumroad. **Verified.**
10. **Contact**: H2 "Contact" + sub + form card (`bg-white rounded-3xl …
    p-8`): Name/Email/Message + "Send Message" (send icon → check icon
    "Message Sent!" for ~2s, form clears). **Verified.**

### 3.3 `/Tool` page

Nav + page badge "Free Tool" + H1 "AI Post Generator" + sub "Describe your
idea. Let AI do the rest. Viral-ready in seconds." + the same generator
card + CTA banner + footer. **Verified.**

### 3.4 `/Pricing` page

Nav + badge "Pricing" + H1 "Simple, Transparent Pricing" + sub "No
subscriptions. Pay once, create unlimited viral posts forever." + pricing
cards + CTA + footer. **Verified.**

### 3.5 `/Contact` page

Nav + badge "Get in Touch" + H1 "Contact Us" + sub + contact form +
footer. **Verified.**

### 3.6 `/login`

`main.min-h-screen.flex.items-center.justify-center
.bg-gradient-to-br.from-slate-50.to-slate-100.p-4`; card `max-w-md`,
`bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl` with `h-1` gradient
hairline; logo avatar (rounded-full `ring-4 ring-white/50`, Supabase-hosted
PNG); H1 "Welcome to ViralPost AI" + "Sign in to continue"; "Continue with
Google" outline button; "OR" divider; email+password inputs (mail/lock
icons, `rounded-xl bg-slate-50/50`); "Sign in" primary; "Forgot password?"
/ "Need an account? Sign up" ghosts. Views: **reset** ("Reset your
password", "Send reset link", "Back to sign in"), **signup** ("Create your
account", Email/Password/Confirm, "Create account"). **Verified.**

### 3.7 404

H1 "404", H2 "Page Not Found", button "Go Home". **Verified.**

## 4. Generator behavior (the core workflow)

From the bundle (deobfuscated by hand — this is the app's own logic, read
as inert data):

- **Free-quota contract**: `const pl = 3; const S1 =
  "viralpost_generations";` — `localStorage["viralpost_generations"] =
  {"date": <toDateString>, "count": n}`; `getUsedToday()` returns 0 when
  the stored date ≠ today (daily reset); `increment()` writes
  `{date: today, count: used + 1}`. Counter is client-side only; the limit
  UI swaps the whole card body for a "You reached the free limit" state
  with "Unlock Unlimited Posts – $19" → Gumroad. **Verified.**
- **LLM call**: `InvokeLLM({ prompt })` with the exact prompt:

  ```
  You are ViralPost AI, an expert social media copywriter. Generate a single viral social media post based on this idea: "${t}"
  Rules:
  - Write an attention-grabbing hook as the first line
  - Use short paragraphs (1-2 sentences each)
  - Use an emotional, motivational, or relatable tone
  - Add line breaks between paragraphs for readability
  - End with 5-8 relevant hashtags
  - Keep it under 200 words
  - Do NOT include labels like "Hook:" — just the raw post text
  - Make it ready to copy and paste directly to social media
  ```

  **Verified** (bundle string extraction).
- **Result UI**: motion fade-in `mt-6` card `bg-gradient-to-br
  from-teal-50/50 to-slate-50 border border-teal-100 rounded-2xl p-6`,
  header "GENERATED POST" (`text-xs font-semibold text-teal-600 uppercase
  tracking-wider`) + Copy button (`Copy` ⇄ `Copied!` with check icon,
  `navigator.clipboard.writeText` + 2s reset), body
  `text-slate-700 leading-relaxed whitespace-pre-line text-sm`.
  **Verified** (bundle JSX extraction; live render not observable — see
  §5).
- **Button states**: disabled while `!text.trim() || generating`;
  generating label "Generating…" with `animate-spin` loader icon.
  **Verified.**

## 5. Reference defects observed (clone superset opportunities)

| # | Reference behavior | Evidence | Clone decision |
| :--- | :--- | :--- | :--- |
| D-1 | **Generation hangs forever**: `InvokeLLM` returns HTTP 402 (platform AI quota exhausted); button stuck at "Generating…", no error UI, no recovery | network log ×3 (anon + logged-in) | Working generator + explicit error state + retry |
| D-2 | Contact form is a **client-side stub** — no POST, no persistence | network log (zero requests on submit) + bundle handler (`preventDefault; setSent; clear`) | Persist to DB via API + same "Message Sent!" UX |
| D-3 | Footer social links are `href="#"` dead stubs | DOM dump | Link to the real platform homepages (documented deviation) |
| D-4 | No SEO per-route canonical/OG on inner pages beyond title tag. **[Session-8 re-verification (2026-11-09, curl head census on /, /Tool, /Pricing, /Contact, /login): SUPERSEDED — the reference NOW ships the full per-route OG/Twitter family — og:title mirrors the title scheme, og:description is the PLAIN 170-char paragraph, og:url absolute, canonical on every route, the twitter family mirrors, one static og:image (the platform's 1200×630 render) + the PWA metas. Whether the app updated intra-day or the morning DOM probe over-generalized is undetermined; live truth governs. The clone's prefixed OG description (a CRM-family convention adopted under this row) was retired to match (session 8, F8-1); the clone's per-route canonical and its own og-image stand-in remain the documented expressions.]** | DOM metadata probe | Per-route metadata at parity (plain description, title-mirroring OG, per-route canonical) + sitemap + robots + manifest |
| D-5 | Google OAuth button cannot work off-platform | platform-bound OAuth | Visual parity; graceful "not configured" toast when unset |
| D-6 | `localStorage` token auth (XSS-exfiltratable) | localStorage inspection | httpOnly signed-cookie session (the repo's standing auth seam) |

## 6. Visual system (computed-style ground truth)

- **Body font**: `ui-sans-serif, system-ui, sans-serif, …` (Tailwind stock
  default stack; **zero webfonts** — `document.fonts` empty). The particle
  canvas config names "Inter" but resolves to the same system stack.
  **Verified.**
- **Palette**: dark hero `slate-900` (#0f172a); primary gradient
  `teal-500 → teal-600` (buttons) and `teal-500 → teal-700` (generate);
  amber accents `amber-300/400`; light sections `slate-50 → white`;
  borders `slate-200`; input bg `slate-50`; success tint `teal-50/50 →
  slate-50`. **Verified** (computed styles + VLM screenshot review).
- **Radii**: cards `rounded-3xl` (24px), inputs/inner `rounded-2xl`/`xl`,
  buttons `rounded-full`. Shadows: `shadow-xl shadow-teal-100/50` (cards),
  `shadow-2xl shadow-teal-900/50` (hero image). **Verified.**
- **Motion**: framer-motion — hero entrance `x:-40 → 0` fade (0.8s);
  `whileInView once` `y:20 → 0` reveals (0.1s stagger) on every section;
  hero image float loop; copy-check swap. **Verified** (bundle `Ve`
  motion calls).
- **Metadata**: title "ViralPost AI" (home/login), "Tool \| ViralPost AI",
  "Pricing \| ViralPost AI", "Contact \| ViralPost AI"; description = "An
  AI-powered social media generator that helps creators, influencers, and
  businesses draft high-engagement posts for Instagram, TikTok, Twitter,
  and LinkedIn in seconds."; canonical on home; viewport
  `width=device-width, initial-scale=1.0`. **Verified.**
- **Assets**: logo PNG (192×192, teal gradient mark) + hero portrait PNG
  (1024×1024, woman in gold jacket on teal backdrop) hosted on the
  platform's Supabase — **not licensed for copying**; the clone ships
  independently created equivalents (SVG logo mark + generated portrait).

## 7. Unknowns (named blockers)

- Google OAuth success path — needs an operator Google account bound to
  the platform. **Unknown.**
- Successful signup → verification-code flow (platform rejects
  undeliverable probe mailboxes; no throwaway deliverable mailbox was
  available). **Unknown** — the clone implements the standard
  email-verification shape the platform family uses.
- The exact copy of the pricing FAQ/testimonial imagery beyond text
  (avatars are letter chips — replicated trivially). N/A.
