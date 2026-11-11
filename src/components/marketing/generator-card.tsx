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
import { FREE_LIMIT } from "@/lib/generator";
import {
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
  React.useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);


  const limitReached = used >= FREE_LIMIT;

  const generate = async () => {
    if (!idea.trim() || generating || limitReached) return;
    setGenerating(true);
    setPost("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });
      const body = (await res.json()) as GenerateResponse;
      if (!res.ok || !body.ok || !body.data) {
        // The explicit error state the reference lacks (D-1): settle the
        // button, tell the user, keep their idea for a retry.
        toast.error(
          body.error?.message ?? "Generation failed. Please try again.",
        );
        return;
      }
      setPost(body.data.text);
      incrementLive();
    } catch {
      toast.error("Network error — check your connection and try again.");
    } finally {
      setGenerating(false);
    }
  };

  const copy = async () => {
    if (!post) return;
    try {
      await navigator.clipboard.writeText(post);
      setCopied(true);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't access the clipboard.");
    }
  };

  if (limitReached) {
    return (
      <Reveal className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-teal-100/50 p-6 sm:p-8">
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-teal-50 mb-4">
            <InfinityIcon className="h-6 w-6 text-teal-600" aria-hidden="true" />
          </div>
          <p className="text-slate-700 font-semibold text-lg mb-2">
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
    );
  }

  return (
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
        className="mt-4 w-full py-3.5 bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-teal-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-teal-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
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
  );
}
