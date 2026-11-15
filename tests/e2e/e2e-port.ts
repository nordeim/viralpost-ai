// Session-69 (N-69g — a donor-ledger number, the NEO-CRM repo's own
// session; annotated session-68, S68-6 — the donor-marker convention):
// the single source for the e2e port. The "3100"
// default used to live TWICE — playwright.config.ts
// (Number(process.env.E2E_PORT ?? 3100)) and the template-era crm.spec
// 401 probe (process.env.E2E_PORT ?? "3100") — so a default change in
// one place silently sent the probe at a dead port. Both consumers
// imported this module at the time; the probe consumer retired with the
// CRM spec family (session 1 rebuilt the specs), so today only
// playwright.config.ts imports it — the module stays the single source
// of truth for the port literal (the S68-P4 constant-wiring class —
// also a donor-ledger number —: the
// config can never diverge from a probe that returns).

/** The default e2e port — the ONLY place the literal lives. */
export const E2E_PORT_DEFAULT = "3100";

// Session-70 (S70-5d, AUDIT-3 I-6 — the registered lift landed): the
// NaN guard. The registered face (PAD §11, session-66 AUDIT-3 I-6): a
// non-numeric E2E_PORT yielded `http://localhost:NaN` and failed at
// webServer boot after the 60s timeout with an opaque URL — an
// operator typo cost a minute and named nothing. The guard validates
// at the single source: the canonical integer 1..65535 (surrounding
// whitespace trimmed; `String(n) === raw` also rejects zero-padded
// spellings — "03100" is not a canonical port form), throwing a
// message that names the knob AND the received value. The config
// imports this seam at load, so a bad knob fails LOUDLY at parse
// time instead of timing out at boot.
/** The env-resolved port, as a string (the probe's URL-concat form). */
export function e2ePort(): string {
  const raw = (process.env.E2E_PORT ?? E2E_PORT_DEFAULT).trim();
  const n = Number(raw);
  if (raw === "" || !Number.isInteger(n) || n < 1 || n > 65535 || String(n) !== raw) {
    throw new Error(
      `[e2e] E2E_PORT must be a canonical integer between 1 and 65535 (e.g. 3100) — got ${JSON.stringify(process.env.E2E_PORT)}`,
    );
  }
  return raw;
}
