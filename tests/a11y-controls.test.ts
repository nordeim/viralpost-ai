// THE NAMED-CONTROL SOURCE-PIN BATTERY — the a11y doctrine's live census
// for ViralPost AI's public surfaces: every interactive control must
// carry an accessible name. The pins read the SOURCE live and assert the
// accessible-name form (the e2e axe battery is the runtime proof; this is
// the source-level regression net).

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = join(import.meta.dirname, "..");
const read = (p: string) => readFileSync(join(root, p), "utf8");

const SURFACE_FILES = [
  "src/components/marketing/navbar.tsx",
  "src/components/marketing/generator-card.tsx",
  "src/components/marketing/contact-form.tsx",
  "src/components/layout/login-card.tsx",
] as const;

describe("named-control source pins (the open surfaces)", () => {
  it("every surface file exists", () => {
    for (const f of SURFACE_FILES) {
      expect(existsSync(join(root, f)), f).toBe(true);
    }
  });

  it("the mobile hamburger carries aria-label + aria-expanded", () => {
    const src = read("src/components/marketing/navbar.tsx");
    expect(src).toContain('aria-label={open ? "Close menu" : "Open menu"}');
    expect(src).toContain("aria-expanded={open}");
  });

  it("session-11 (F11-11): the hamburger controls the panel id (aria-controls), and Escape returns focus to the toggle", () => {
    // The next increment of the menu superset: the toggle references the
    // panel it owns (aria-controls + the panel's id), and closing via
    // Escape restores focus to the toggle instead of leaving it on the
    // now-hidden panel content (where it falls to <body>).
    const src = read("src/components/marketing/navbar.tsx");
    expect(src).toContain('aria-controls="mobile-menu"');
    expect(src).toContain('id="mobile-menu"');
    expect(src).toMatch(/menuButtonRef\.current\?\.focus\(\)/);
  });

  // Session-31 (S31-2): the THIRD close arm's focus return. Escape
  // (F11-11) and the link-click (S25-16) already restore focus to the
  // toggle — the S25-16 rationale ("the close unloads the focused link;
  // without the return, focus falls to <body> and post-navigation Tab
  // resumes at the document top — WCAG 2.4.3") applies verbatim to the
  // history-navigation close (F10-10, browser back/forward): the
  // adjust-during-render close hid the panel with no focus return. The
  // cure records the pre-close open state as STATE (the react-hooks/refs
  // rule bans render-phase ref writes) and the pathname-keyed layout
  // effect returns focus to the toggle.
  it("session-31 (S31-2): the history-close arm returns focus to the toggle (the third close arm's WCAG 2.4.3 completion)", () => {
    const src = read("src/components/marketing/navbar.tsx");
    // The adjust-during-render close records the pre-close open state
    // (the link-click path closes first — its own focus return already
    // ran — so the state stays false there).
    expect(src).toMatch(/setMenuWasOpen\(open\);/);
    // The pathname-keyed layout effect returns focus to the toggle (a
    // DOM-focus effect — never the banned setState-in-effect form).
    expect(src).toMatch(
      /useLayoutEffect\(\(\) => \{\s*if \(menuWasOpen\) \{\s*menuButtonRef\.current\?\.focus\(\);/,
    );
  });

  it("the generator textarea carries a wired label", () => {
    const src = read("src/components/marketing/generator-card.tsx");
    expect(src).toMatch(/<label htmlFor="post-idea"/);
    expect(src).toMatch(/<textarea[^>]*id="post-idea"/);
  });

  it("the contact form fields carry wired labels", () => {
    const src = read("src/components/marketing/contact-form.tsx");
    for (const id of ["contact-name", "contact-email", "contact-message"]) {
      expect(src).toMatch(new RegExp(`<label[^>]*htmlFor="${id}"`));
      expect(src).toMatch(new RegExp(`id="${id}"`));
    }
  });

  // Session-24 (S24-3): a successful submit's only indication was the
  // button label swap — button label changes are NOT re-announced by AT
  // (even focused), so screen-reader users got zero feedback (WCAG 2.2
  // AA 4.1.3, Status Messages). The house's polite-live-region doctrine
  // (toast.tsx S19-8's aria-live viewport, InfoCallout S14-5's
  // role="status") gains its contact-surface member: a visually-hidden
  // status node, present in the DOM before the change (AT catches the
  // mutation), its content keyed on the sent state. The reference's
  // visible surface (the label swap) stays byte-identical.
  it("session-24 (S24-3): the contact form's success swap is ANNOUNCED (a polite status region, WCAG 4.1.3)", () => {
    const src = read("src/components/marketing/contact-form.tsx");
    expect(src).toMatch(/role="status"/);
    expect(src).toMatch(/aria-live="polite"|className="sr-only"/);
    // The region renders BEFORE the state flips (always in the tree, so
    // the mutation — not the insertion — is what AT announces).
    expect(src).not.toMatch(/\{sent &&[^}]*role="status"/);
  });

  // Session-50 (S50-11, AUDIT-2 I4): the contact submit joins the
  // pending-face family (S22-6's four in-card submits + the S49-8
  // resend — the login family's consistency doctrine, one surface
  // over). The form already carried the logic guard + the disabled
  // face (disabled={sending}), but the label stayed "Send Message"
  // through the whole in-flight window — the S22-6 genus exactly: the
  // disabled utilities without the visible relabel, the user getting
  // zero submit feedback until the response landed. The reference's
  // contact form is a stub (docs/reference-investigation.md §5 D-2 —
  // no parity face constrains it); the family's consistency owns the
  // label.
  it("session-50 (S50-11): the contact submit relabels Sending… in flight (the pending-face family's sixth member)", () => {
    const src = read("src/components/marketing/contact-form.tsx");
    // The three-face label: sent → sending → idle, one expression —
    // the S49-8 pin form ('{resending ? "Please wait…" : "Resend"}').
    expect(src).toContain('{sent ? "Message Sent!" : sending ? "Sending…" : "Send Message"}');
  });

  // Session-25 (S25-2): the S24-3 genus, one file over — the generator
  // card (the app's core surface) announced NONE of its async success
  // states: the result card mounts silently, the Copy confirmation is a
  // button-label swap (the exact form the S24-3 comment calls out as not
  // re-announced), the quota text mutates unannounced, and the paywall
  // swap replaces the whole card. Two sr-only status nodes now ride the
  // card ABOVE the limit branch (present in the DOM before every flip —
  // AT catches the mutation, not the insertion): (a) the generation +
  // limit text, (b) the copy confirmation (clears to empty on the 2s
  // reset; empty text is not announced). The reference's visible surface
  // stays byte-identical.
  it("session-25 (S25-2): the generator card's async success states are ANNOUNCED (polite status regions, WCAG 4.1.3)", () => {
    const src = read("src/components/marketing/generator-card.tsx");
    expect((src.match(/role="status"/g) ?? []).length).toBe(2);
    expect(src).toMatch(/Post generated/);
    expect(src).toMatch(/Daily free limit reached/);
    expect(src).toMatch(/Copied to clipboard/);
    // Both nodes render OUTSIDE the limit conditional (before every
    // flip, not inside the swapped branch).
    expect(src).not.toMatch(/\{limitReached &&[^}]*role="status"/);
  });

  // Session-25 (S25-3): the auth input constants carried
  // focus:ring-slate-400 (#94a3b8 ≈2.57:1 on the white card — under the
  // 1.4.11 3:1 floor) while the same constants' submit buttons carried
  // the S14-6 ring-ring family (≈14:1). The S24-4 in-place upgrade form:
  // slate-600 (#334155 ≈7.5:1) — deterministic (no focus:/focus-visible:
  // cascade fragility), the resting classes untouched, the reference's
  // transient focus shade is parity-immaterial (never in a byte-census
  // family).
  it("session-25 (S25-3): the auth input focus rings clear the 3:1 floor (slate-600 — the sub-3:1 form banned)", () => {
    for (const f of ["src/lib/page-layout.ts", "src/lib/login-reset.ts"]) {
      const src = read(f);
      // The ban targets CLASS-STRING literals only — the DOM-record
      // comments legitimately spell the reference's own
      // focus:ring-slate-400 (the captured classes our superset
      // deliberately upgrades; see login-reset's input docblock).
      expect(src, f).not.toMatch(/"[^"\n]*focus:ring-slate-400/);
      expect(src, f).toContain("focus:ring-slate-600");
    }
  });

  // Session-25 (S25-15): the S19-10 genus on the generator — the
  // free-limit paywall swap unmounts the focused control (textarea /
  // Generate button) and focus fell to <body>. The paywall heading now
  // carries the focus target (tabIndex={-1} + data-view-focus); a
  // prev-limit ref guards the transition; and a generatedThisMount ref
  // keeps the MOUNT-SETTLE path silent (a returning limited-out user's
  // used counter settles 0→3 after hydration — that is the initial
  // view, not a swap; only an in-session swap — a completed 3rd
  // generation — lands focus).
  it("session-25 (S25-15): the paywall swap lands focus on its heading, mount-settle silent (the S19-10 genus)", () => {
    const src = read("src/components/marketing/generator-card.tsx");
    expect(src).toMatch(/data-view-focus/);
    expect(src).toMatch(/paywallHeadRef\.current\?\.focus\(\)/);
    expect(src).toMatch(/generatedThisMountRef\.current/);
  });

  // Session-25 (S25-16): the mobile menu's link-click path closed the
  // panel via onClick={() => setOpen(false)} — the panel becomes
  // display:none, unloading the focused link; focus fell to <body> and
  // the soft navigation did not relocate it (post-navigation Tab
  // resumed at the document top — WCAG 2.4.3). The Escape path's
  // focus-return counterpart now rides the click path too.
  it("session-25 (S25-16): the mobile menu's link-click path returns focus to the toggle (the Escape path's counterpart)", () => {
    const src = read("src/components/marketing/navbar.tsx");
    // Three focus-return call sites since session-31: the Escape close
    // (F11-11) + the link click (S25-16) + the history-navigation close's
    // pathname-keyed layout effect (S31-2 — the mechanism pinned by its
    // own arm above; this count is the family census face).
    expect((src.match(/menuButtonRef\.current\?\.focus\(\)/g) ?? []).length).toBe(3);
    expect(src).toMatch(/menuButtonRef\.current\?\.focus\(\);\s*setOpen\(false\);/);
  });

  // Session-26 (S26-1): the mobile-menu panel shipped `max-h-96` (384px)
  // + `overflow-hidden` with no scroll path — the LIVE reference's open
  // panel computes max-height:none (its class family carries no
  // max-h/opacity/transition anywhere; live-censused both sides this
  // round). The cap was invisible at 100% text size (≈264px content) but
  // Safari/Chrome text-size scaling grows the rem-based links past 384px
  // at ≈145%+, clipping the Contact link + Upgrade pill unreachable
  // (WCAG 1.4.4 reflow family — the axe battery cannot see zoom). The
  // panel's class family is re-anchored to the reference's own: the bare
  // base + the S22-5 superset arm + the `hidden` attribute (the
  // open/close mechanics — the reference unmounts its closed panel;
  // behaviorally equivalent). Mutation battery: re-plant max-h-96 → RED.
  it("session-26 (S26-1): the mobile-menu panel carries NO height cap (the reference computes max-height:none — the max-h form banned)", () => {
    const src = read("src/components/marketing/navbar.tsx");
    // The ban targets the class-string literal context — the comment
    // history legitimately spells the retired forms.
    expect(src).not.toMatch(/"[^"\n]*max-h-(96|0)/);
    expect(src).not.toMatch(/open \? "max-h-96 opacity-100" : "max-h-0 opacity-0"/);
    // The bare panel base (the reference's own family, minus its dead
    // /98 class — the S22-5 transparent-render replication) + the
    // open/close mechanics unchanged.
    expect(src).toContain('"md:hidden border-b border-white/10 overflow-hidden"');
    expect(src).toContain('hidden={!open}');
  });

  // Session-26 (S26-3): the bar's dark arm keyed on `scrolled || open` —
  // but the live reference's bar stays bg-transparent with the menu OPEN
  // at scrollY=0 (live-censused this round; the `|| open` half shipped
  // from session 1, never side-by-side censused until now). Two defects
  // in one arm: a mobile parity drift (our bar darkens the moment the
  // menu opens over the hero) and a desktop artifact (a mobile→desktop
  // breakpoint cross with the menu open keeps `open` true, painting the
  // unscrolled desktop page in the scrolled arm — the panel/toggle are
  // md:hidden but the bar is not). The arm now keys on `scrolled` alone
  // — the reference's own key. Mutation battery: re-plant `|| open` → RED.
  it("session-26 (S26-3): the bar's dark arm keys on scrolled alone (the reference stays transparent with the menu open — the open-arm banned)", () => {
    const src = read("src/components/marketing/navbar.tsx");
    expect(src).not.toContain("scrolled || open");
    expect(src).toMatch(/scrolled\s*\?\s*"bg-slate-900\/95 backdrop-blur-xl border-b border-white/);
  });

  // Session-26 (S26-2): the S24-3/S25-2 genus, the busy window — node A
  // rendered "" while the fetch was in flight (post cleared, limit false)
  // and the button's "Generating…" label swap is exactly the
  // not-re-announced form the S24-3 comment calls out. AT users got zero
  // feedback between clicking Generate and the result/error. Node A now
  // carries the generating arm ("Generating your post…"); the S25-2 pin
  // owns the success/limit arms, this pin owns the busy arm — one face
  // per pin. Mutation battery: drop the arm → RED.
  it("session-26 (S26-2): the generator's busy window is ANNOUNCED (node A's generating arm, WCAG 4.1.3)", () => {
    const src = read("src/components/marketing/generator-card.tsx");
    expect(src).toMatch(/generating\s*\?\s*"Generating your post…"\s*:\s*post/);
    // The arm rides node A (the FIRST status region — before node B's
    // copy-confirmation text), never a third live region.
    expect((src.match(/role="status"/g) ?? []).length).toBe(2);
  });

  // Session-27 (S27-1): the two highest-traffic submit buttons — Generate
  // Post and Send Message — carried NO focus/focus-visible arm (UA-default
  // outline only) while every sibling control one element away carries the
  // house family (the textarea S23-21, the Copy button S21-20, the
  // hamburger S15-8, the auth submits S14-6). The session-25 accepted
  // register scopes the UA-default-focus acceptance to reference-owned LINK
  // families (byte-parity pins); these buttons' pins are toContain
  // substrings that survive appended arms. Both buttons co-pinned here (the
  // S25-3 family form — one genus, one pin, one RED per mutation).
  // Mutation battery: drop the arm from either button → this pin REDs.
  it("session-27 (S27-1): the core submit buttons carry the house keyboard focus ring (teal-600 — the S21-20 family, the sibling controls' own)", () => {
    const FAMILY = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600";
    const gen = read("src/components/marketing/generator-card.tsx");
    const contact = read("src/components/marketing/contact-form.tsx");
    // The Generate Post button's class string carries the family.
    expect(gen).toContain(`mt-4 w-full py-3.5 bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-teal-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${FAMILY}`);
    // The Send Message button's class string carries the family.
    expect(contact).toContain(`mt-6 w-full py-3.5 bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-teal-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${FAMILY}`);
  });

  it("icon-only controls are aria-hidden or labeled (no nameless glyphs)", () => {
    // The marketing icons ride aria-hidden="true" inside named parents;
    // the hamburger is the only icon-only BUTTON and it is labeled.
    const nav = read("src/components/marketing/navbar.tsx");
    expect(nav).toMatch(/aria-label=\{open \? "Close menu" : "Open menu"\}/);
  });

  it("the login card's icon-only code inputs carry their per-digit labels", () => {
    const src = read("src/components/layout/login-card.tsx");
    // The six single-digit verify inputs are the nameless-input genus —
    // the login-reset view machine's own doctrine pins the label form.
    expect(src).toMatch(/aria-label=\{`Digit \$\{idx \+ 1\}`\}|aria-label=.Digit/);
  });

  it("decorative canvases are aria-hidden", () => {
    const particle = read("src/components/effects/particle-text.tsx");
    expect(particle).toContain('aria-hidden="true"');
    const iridescence = read("src/components/effects/iridescence.tsx");
    expect(iridescence).toContain('aria-hidden="true"');
  });

  // Session-19 (S19-10): the login card's in-place view swaps (Forgot
  // password? / Need an account? / the Back buttons) unmount the focused
  // control — focus fell to <body> and the next Tab started at the
  // document top (WCAG 2.4.3). The swap now lands focus on the incoming
  // view's heading (tabIndex={-1} + data-view-focus); verify keeps its
  // code-box focus (the platform-family behavior).
  it("session-19 (S19-10): a view swap lands focus on the incoming view's heading (the navbar's focus-return genus, completed)", () => {
    const src = read("src/components/layout/login-card.tsx");
    expect(src).toContain("data-view-focus");
    expect(src).toContain('cardRef.current?.querySelector<HTMLElement>("[data-view-focus]")?.focus()');
    // The per-view headings carry the focus target; the count: signin h1
    // + signup h2 + reset h2 + sent h2 (verify keeps the code-box arm).
    // Counted in the JSX attribute form — the querySelector and this
    // comment also spell the string.
    expect((src.match(/data-view-focus>/g) ?? []).length).toBe(4);
    expect(src).toMatch(/view === "verify"\) \{\s*codeRefs\.current\[0\]\?\.focus\(\);\s*return;/);
  });

  // Session-21 (S21-6): the S19-10 genus, missed on the reset screen —
  // its success swap unmounts the focused submit button and rendered
  // the confirmation card with no focus management (focus fell to
  // <body>). The done h1 now carries the focus target; a prev-state
  // ref guard keeps the initial mount from stealing focus (the
  // login-card doctrine).
  it("session-21 (S21-6): the reset screen's success swap lands focus on the confirmation heading", () => {
    const src = read("src/components/layout/reset-password-screen.tsx");
    expect(src).toContain('<h1 className={LOGIN_LAYOUT.title} tabIndex={-1} data-view-focus>Password reset</h1>');
    expect(src).toContain('screenRef.current?.querySelector<HTMLElement>("[data-view-focus]")?.focus()');
    expect(src).toMatch(/prevDoneRef\.current === done\) return;/);
  });

  // Session-28 (S28-5): the validation-family consistency arm — the
  // signup view's two password inputs and the reset screen's two carry
  // the native minLength={8} affordance alongside the server-side
  // schema bound (the hint text "Must be at least 8 characters" is
  // rendered on both surfaces; the signup pair already had the
  // attribute, the reset pair lacked it — a sub-8-char password got a
  // network round-trip + banner here but the inline browser affordance
  // there). All four co-pinned in one it (the S25-3 family form —
  // the faces are the same contract, one pin owns them).
  it("S28-5: every password input carries minLength={8} (the signup pair + the reset pair — one family)", () => {
    const signup = read("src/components/layout/login-card.tsx");
    const reset = read("src/components/layout/reset-password-screen.tsx");
    expect((signup.match(/minLength=\{8\}/g) ?? []).length, "the signup view's two password inputs").toBe(2);
    expect((reset.match(/minLength=\{8\}/g) ?? []).length, "the reset screen's two password inputs").toBe(2);
  });

  it("the hero portrait img carries its alt text", () => {
    const hero = read("src/components/marketing/hero.tsx");
    expect(hero).toContain('alt="ViralPost AI user"');
  });

  it("the footer social chips carry aria-labels", () => {
    const footer = read("src/components/marketing/footer.tsx");
    expect(footer).toMatch(/aria-label=\{s\.label\}/);
  });

  it("nav links expose the active route (aria-current)", () => {
    const nav = read("src/components/marketing/navbar.tsx");
    expect(nav).toContain('aria-current={active === r.id ? "page" : undefined}');
  });

  it("session-15 (S15-4): the signin view's decorative input icons carry aria-hidden (the sibling views' own pattern)", () => {
    // The reset/signup/verify views' Mail/Lock icons all carry
    // aria-hidden="true" (their LOGIN_*_LAYOUT.inputIcon rides); the
    // signin view's two were the file's only stragglers — empty lucide
    // svgs are ignored by AT today, but a future title-bearing icon
    // would be announced on the signin view only.
    const src = read("src/components/layout/login-card.tsx");
    expect(src).toContain('<Mail className={LOGIN_LAYOUT.inputIcon} aria-hidden="true" />');
    expect(src).toContain('<Lock className={LOGIN_LAYOUT.inputIcon} aria-hidden="true" />');
  });

  it("session-15 (S15-8): the mobile hamburger carries the house keyboard focus ring (slate-300 — the toggle's own ink, reads on the dark navbar)", () => {
    // The S14-6 toast-dismiss precedent applied to the only mobile-nav
    // control. The house ring-ring token (#0f172a) is invisible on the
    // dark slate navbar — slate-300 is the toggle's OWN ink (the
    // reference's own class on this very button: text-slate-300), so the
    // ring is guaranteed to read on slate-950 while staying in the
    // reference's palette vocabulary. Visible only on keyboard focus —
    // the visual-parity walk is untouched.
    const src = read("src/components/marketing/navbar.tsx");
    expect(src).toContain(
      'className="md:hidden p-2 text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"',
    );
  });
});

describe("session-22 (S22-11): the skip-to-content link (WCAG 2.4.1 bypass blocks)", () => {
  // The marketing chrome mounts a fixed navbar before <main> — a keyboard
  // user tabs through 6 nav controls before reaching content. The
  // reference ships no skip link (parity-neutral: sr-only until focused,
  // so the visual surface is untouched); this is the a11y-superset genus
  // the hamburger's aria attributes established.
  it("the (site) layout ships the sr-only skip link + the main anchor", () => {
    const src = read("src/app/(site)/layout.tsx");
    expect(src).toContain('href="#main-content"');
    expect(src).toMatch(/className="[^"]*sr-only focus:not-sr-only/);
    // Session-25 (S25-18d): the redundant `<main id="main-content"
    // tabIndex={-1}>` assertion that lived here was dropped — its own
    // comment said the S23-3 pin below owns the face (the exactly-one-
    // pin doctrine, same-file edition).
  });

  // Session-23 (S23-3): the anchor alone is not enough — WebKit does not
  // move sequential focus to non-focusable fragment targets (the link
  // scrolls, the next Tab resumes at the document top, the bypass
  // defeats itself). tabIndex={-1} makes the target programmatically
  // focusable in every engine (the login-card data-view-focus genus:
  // every focus-target surface carries it).
  it("session-23 (S23-3): the skip-link target is programmatically focusable (tabIndex={-1} on the main)", () => {
    const src = read("src/app/(site)/layout.tsx");
    expect(src).toContain('<main id="main-content" tabIndex={-1}>');
  });
});
