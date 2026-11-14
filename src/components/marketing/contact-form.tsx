"use client";

// The contact form — class-for-class the reference's, but the submit
// PERSISTS to /api/contact → the ContactMessage table (the reference's
// handler is a pure client stub; docs/reference-investigation.md §5 D-2).
// Same observable UX: "Send Message" ⇄ "Message Sent!" + the form clears.

import * as React from "react";
import { Check, Send } from "lucide-react";

import { toast } from "@/components/ui/toast";

interface ContactState {
  name: string;
  email: string;
  message: string;
}

const EMPTY: ContactState = { name: "", email: "", message: "" };

const FIELD =
  "w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 focus-visible:ring-2 focus-visible:ring-teal-600 transition-all";

export function ContactForm() {
  const [form, setForm] = React.useState<ContactState>(EMPTY);
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  // Session-17 (S17-6): the sent-reset timer is ref-tracked with an
  // unmount clear — the toast's own idiom (toast.tsx) mirrored (a
  // setState after unmount is a React 19 no-op; the tracked timer is
  // the family's hygiene).
  const resetTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  React.useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);


  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const body = (await res.json().catch(() => null)) as
        | { ok: boolean; error?: { message: string } }
        | null;
      if (!res.ok || !body?.ok) {
        toast.error(body?.error?.message ?? "Something went wrong. Please try again.");
        return;
      }
      setSent(true);
      setForm(EMPTY);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setSent(false), 2600);
    } catch {
      toast.error("Network error — check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-teal-100/50 p-8" onSubmit={submit}>
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="contact-name">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            required
            className={FIELD}
            autoComplete="name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
            required
            className={FIELD}
            autoComplete="email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="contact-message">
            Message
          </label>
          <textarea
            id="contact-message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Your message..."
            rows={4}
            required
            className={`${FIELD} resize-none`}
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={sending}
        className="mt-6 w-full py-3.5 bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-teal-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
      >
        {sent ? (
          <Check className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Send className="h-4 w-4" aria-hidden="true" />
        )}
        {/* Session-50 (S50-11): the in-flight relabel joins the S22-6/
            S49-8 pending-face family — the disabled utilities already
            fired (disabled={sending}) but the label gave no in-flight
            feedback until the response landed (the S22-6 genus, one
            surface over). The reference's form is a stub (D-2) — no
            parity face; the family's consistency owns the label. */}
        {sent ? "Message Sent!" : sending ? "Sending…" : "Send Message"}
      </button>
      {/* Session-24 (S24-3): the success swap's AT announcement. A button
          label change is NOT re-announced by screen readers (even when
          focused) — the swap alone left SR users with zero feedback
          (WCAG 2.2 AA 4.1.3). The region renders BEFORE the state flips
          (always in the tree, empty when idle) so AT catches the CONTENT
          mutation rather than an insertion; the toast viewport (S19-8)
          and InfoCallout (S14-5) are the family precedents. The visible
          surface — the reference's own label swap — is untouched. */}
      <p role="status" aria-live="polite" className="sr-only">
        {sent ? "Message sent" : ""}
      </p>
    </form>
  );
}
