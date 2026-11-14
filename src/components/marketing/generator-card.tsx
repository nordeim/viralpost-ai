"use client";

// The generator card — the app's core surface, class-for-class the
// reference's (bundle-extracted JSX): the daily counter + teal fill dots,
// the textarea, the gradient Generate button (spinner state), the
// generated-post result card with the Copy round-trip, and the free-limit
// paywall swap.
//
// SUPERSET (docs/reference-investigation.md §5 D-1): the reference's
// platform LLM was observed returning HTTP 402 with the button hanging at
// "Generating…" forever. Ours calls our own /api/generate, surfaces an
// explicit error state with a retry affordance, and always settles.

import * as React from "react";
import { Check, Copy, Infinity as InfinityIcon, Loader2, WandSparkles } from "lucide-react";

import { toast } from "@/components/ui/toast";
// Session-25 (S25-14): FREE_LIMIT imports from the quota module now —
// generator.ts carries node crypto (ideaSeed) and must stay
// server-side (pinned: landing-page's client-boundary test).
import {
  FREE_LIMIT,
  getUsedTodayLive,
  incrementLive,
  subscribeUsage,
} from "@/lib/generation-counter";
import { GUMROAD_URL } from "./nav-config";
import { Reveal } from "@/components/effects/reveal";

interface GenerateResponse {
  ok: boolean;
  data?: { text: string };
  error?: { code: string; message: string };
}

export function GeneratorCard() {
  const [idea, setIdea] = React.useState("");
  const [post, setPost] = React.useState("");
  const [generating, setGenerating] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  // Hydration-safe live read of the daily counter (the server snapshot is
  // 0-used — the reference's own SSR-less card always paints the full
  // quota first, then settles client-side).
  const used = React.useSyncExternalStore(
    subscribeUsage,
    getUsedTodayLive,
    () => 0,
  );

  // Session-17 (S17-6): the copy-reset timer is ref-tracked with an
  // unmount clear — the toast's own idiom (toast.tsx) mirrored. A
  // setState after unmount is a React 19 no-op, but the tracked timer
  // is the family's hygiene; the clear-before-re-arm also gives a
  // rapid re-copy its full 2s window (the toast's timer-reset shape).
  const resetTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  // Session-51 (S51-2, AUDIT-2 L1): the mounted flag joins the tracked
  // timer — an unmount never moves the epoch (only a regeneration
  // does), so a clipboard promise landing after the cleanup ran passed
  // the epoch-only gate, called the no-op setState, and armed a fresh
  // 2s timer on the dead ref that nothing would ever clear (the S17-6
  // hygiene's async edge, the unmount-mid-await face). The cleanup
  // flips it beside the timer clear; the copy continuation's gate
  // checks it beside the epoch.
  const mounted = React.useRef(true);
  React.useEffect(() => () => {
    mounted.current = false;
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);
  // Session-50 (S50-4, AUDIT-2 L1): the copy-epoch guard's counter —
  // bumped beside the S49-2 reset so a pending copy()'s continuation
  // (a slow clipboard promise) can detect that a regeneration started
  // meanwhile and return before re-arming the stale state.
  const genEpoch = React.useRef(0);

  const limitReached = used >= FREE_LIMIT;

  // Session-25 (S25-15): the paywall swap's focus landing (the S19-10
  // login-card idiom — the swap unmounts the focused textarea/button
  // and focus used to fall to <body>). The prev-limit ref guards the
  // transition edge; generatedThisMountRef keeps the MOUNT-SETTLE path
  // silent — a returning limited-out user's counter settles 0→3 after
  // hydration, and that is the initial view, not a swap. Only an
  // in-session swap — a completed 3rd generation — lands focus.
  const prevLimitRef = React.useRef(false);
  const generatedThisMountRef = React.useRef(false);
  const paywallHeadRef = React.useRef<HTMLParagraphElement>(null);
  React.useEffect(() => {
    if (limitReached && !prevLimitRef.current && generatedThisMountRef.current) {
      paywallHeadRef.current?.focus();
    }
    prevLimitRef.current = limitReached;
  }, [limitReached]);


  const generate = async () => {
    if (!idea.trim() || generating || limitReached) return;
    setGenerating(true);
    // Session-49 (S49-2): clear the stale Copied! face + its armed timer
    // BEFORE the new post lands — a regeneration inside the 2s window
    // otherwise mounted the new post's button already reading "Copied!"
    // (the S17-6 unmount-hygiene idiom applied to the regeneration edge).
    if (resetTimer.current) clearTimeout(resetTimer.current);
    genEpoch.current += 1;
    setCopied(false);
    setPost("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });
      // Session-29 (S29-3): the family's graceful-degradation parse —
      // a non-JSON error body (a proxy/CDN 502 HTML page) must reach the
      // !res.ok arm below and render the server's own failure face,
      // not throw into the catch block's network-error toast (the
      // login-card/reset-password/contact-form idiom).
      const body = (await res.json().catch(() => null)) as GenerateResponse | null;
      if (!res.ok || !body?.ok || !body.data) {
        // The explicit error state the reference lacks (D-1): settle the
        // button, tell the user, keep their idea for a retry.
        toast.error(
          body?.error?.message ?? "Generation failed. Please try again.",
        );
        return;
      }
      setPost(body.data.text);
      generatedThisMountRef.current = true;
      incrementLive();
    } catch {
      toast.error("Network error — check your connection and try again.");
    } finally {
      setGenerating(false);
    }
  };

  const copy = async () => {
    if (!post) return;
    // Session-50 (S50-4): capture the epoch BEFORE the clipboard await —
    // a slow writeText whose continuation lands after a regeneration
    // (the S49-2 reset + epoch bump already ran) must not flip the
    // copied flag or arm a fresh 2s timer on the new, never-copied post
    // (the async sibling of the S49-2 synchronous edge).
    // Session-51 (S51-2, AUDIT-2 L1): the gate also checks the mount —
    // an unmount never moves the epoch, so the continuation landing
    // after the unmount cleanup ran re-armed the stale state on the
    // dead ref anyway (the unmount-mid-await face). Epoch ∪ mounted.
    const epochAtCopy = genEpoch.current;
    try {
      await navigator.clipboard.writeText(post);
      if (!mounted.current || epochAtCopy !== genEpoch.current) return;
      setCopied(true);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't access the clipboard.");
    }
  };

  return (
    <>
      {/* Session-25 (S25-2): the S24-3 status-announcement genus, one
          file over. The card's async SUCCESS flips were visual-only —
          the result mounts silently, the Copy confirmation is a label
          swap, the quota text mutates unannounced, the paywall replaces
          the card. Two sr-only polite regions ride the card OUTSIDE the
          limit branch (present in the DOM before every flip — AT
          announces the mutation, not the insertion): node A carries the
          generation/limit text, node B the copy confirmation (clears to
          empty on the 2s reset — empty text is not announced). The
          reference's visible surface stays byte-identical.
          Session-26 (S26-2): node A gains the BUSY arm — the pending
          window previously rendered "" (post cleared, limit false) and
          the button's "Generating…" label swap is the exact
          not-re-announced form the S24-3 comment calls out. AT users
          now hear "Generating your post…" between click and settle. */}
      <p className="sr-only" role="status" aria-live="polite">
        {limitReached
          ? "Daily free limit reached — upgrade to keep generating."
          : generating
            ? "Generating your post…"
            : post
              ? `Post generated — ${FREE_LIMIT - used} free generation${FREE_LIMIT - used !== 1 ? "s" : ""} remaining today.`
              : ""}
      </p>
      <p className="sr-only" role="status" aria-live="polite">
        {copied ? "Copied to clipboard." : ""}
      </p>
      {limitReached ? (
        <Reveal className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-teal-100/50 p-6 sm:p-8">
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-teal-50 mb-4">
              <InfinityIcon className="h-6 w-6 text-teal-600" aria-hidden="true" />
            </div>
            {/* S25-15: the swap's focus target (the login-card
                data-view-focus genus — programmatically focusable in
                every engine). */}
            <p
              ref={paywallHeadRef}
              tabIndex={-1}
              data-view-focus
              className="text-slate-700 font-semibold text-lg mb-2"
            >
              You reached the free limit
            </p>
            <p className="text-slate-500 text-sm mb-6">
              Upgrade to generate unlimited viral social media posts.
            </p>
            <a
              href={GUMROAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-teal-200 transition-all hover:-translate-y-0.5"
            >
              Unlock Unlimited Posts – $19
            </a>
          </div>
        </Reveal>
      ) : (
        <Reveal delay={100} className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-teal-100/50 p-6 sm:p-8">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium text-slate-400">
          {FREE_LIMIT - used} free generation{FREE_LIMIT - used !== 1 ? "s" : ""} remaining
        </span>
        <div className="flex gap-1" aria-hidden="true">
          {Array.from({ length: FREE_LIMIT }).map((_, i) => (
            <div
              key={i}
              className={`h-2 w-8 rounded-full transition-colors ${i < used ? "bg-teal-500" : "bg-slate-100"}`}
            />
          ))}
        </div>
      </div>
      <label htmlFor="post-idea" className="sr-only">
        Describe your post idea
      </label>
      <textarea
        id="post-idea"
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="Example: motivational post for entrepreneurs about consistency"
        rows={3}
        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 focus-visible:ring-2 focus-visible:ring-teal-600 transition-all resize-none"
      />
      <button
        type="button"
        onClick={generate}
        disabled={generating || !idea.trim()}
        className="mt-4 w-full py-3.5 bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-teal-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
      >
        {generating ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Generating...
          </>
        ) : (
          <>
            <WandSparkles className="h-4 w-4" aria-hidden="true" />
            Generate Post
          </>
        )}
      </button>
      {post && (
        <div className="mt-6">
          <div className="bg-gradient-to-br from-teal-50/50 to-slate-50 border border-teal-100 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider">
                Generated Post
              </span>
              <button
                type="button"
                onClick={copy}
                // Session-21 (S21-20): the house focus-visible family (the
                // S14-6 toast-dismiss / S15-8 hamburger arm) — keyboard-only
                // visibility, the reference's base classes untouched.
                // Session-24 (S24-4): the ring joins the S23-3 AA family —
                // teal-500 computed ≈2.49:1 on the near-white card, under
                // the 1.4.11 3:1 floor; teal-600 (≈3.74:1 on the card's
                // bg-white — session-41, S41-7: the S24-4 cite said
                // ≈3.05:1, a mismeasurement; 3.58:1 on slate-50) clears
                // it and matches the textarea one block above.
                className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-teal-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line text-sm">
              {post}
            </p>
          </div>
        </div>
      )}
        </Reveal>
      )}
    </>
  );
}
