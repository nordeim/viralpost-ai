import { afterEach, describe, expect, it } from "vitest";
import { E2E_PORT_DEFAULT, e2ePort } from "./e2e/e2e-port";

// Session-70 (S70-5d, AUDIT-3 I-6 — the registered lift landed):
// the E2E_PORT NaN guard. The registered face (PAD §11, session-66
// AUDIT-3 I-6): a non-numeric E2E_PORT yielded `http://localhost:NaN`
// and failed at webServer boot after the 60s timeout with an opaque
// URL — an operator typo cost a minute and named nothing. The cure:
// e2ePort() validates its env face at the single source (the
// canonical integer 1..65535, whitespace-trimmed) and throws naming
// the knob and the received value; playwright.config.ts imports this
// seam, so the config fails to load LOUDLY at parse time instead of
// timing out at boot. The canonical-form check (String(n) === raw)
// also rejects zero-padded spellings ("03100") — Number("03100") is
// 3100 but the URL form localhost:03100 is not a canonical port
// spelling, and the loud throw beats the silent oddity.
//
// The seam reads process.env at CALL time (the module stays
// side-effect-free for importers that never call it — the config's
// top-level Number(e2ePort()) is the one live consumer), so these
// pins drive the env directly and restore it in a finally — the
// suite-isolation doctrine (a leaked env face would send the NEXT
// suite's e2e boot at a dead port).

const ORIGINAL_E2E_PORT = process.env.E2E_PORT;

function withPort<T>(value: string | undefined, fn: () => T): T {
  if (value === undefined) delete process.env.E2E_PORT;
  else process.env.E2E_PORT = value;
  try {
    return fn();
  } finally {
    if (ORIGINAL_E2E_PORT === undefined) delete process.env.E2E_PORT;
    else process.env.E2E_PORT = ORIGINAL_E2E_PORT;
  }
}

afterEach(() => {
  if (ORIGINAL_E2E_PORT === undefined) delete process.env.E2E_PORT;
  else process.env.E2E_PORT = ORIGINAL_E2E_PORT;
});

describe("session-70 (S70-5d): the e2e-port NaN guard (a malformed E2E_PORT throws naming the knob)", () => {
  it("the malformed faces throw naming the knob and the received value — NaN, range, float, empty, padded, garbage", () => {
    const malformed = ["nan", "abc", "31.5", "0", "-1", "70000", "65536", "", "03100", "31 00"];
    for (const face of malformed) {
      withPort(face, () => {
        expect(() => e2ePort(), `E2E_PORT=${JSON.stringify(face)}`).toThrow(/E2E_PORT/);
      });
    }
    // The throw names the received value (the operator sees what they
    // typed, not just that something failed).
    withPort("nan", () => {
      expect(() => e2ePort()).toThrow('"nan"');
    });
    withPort("70000", () => {
      expect(() => e2ePort()).toThrow("70000");
    });
  });

  it("the healthy faces return verbatim — a set canonical port, the trimmed spelling, and the untouched default", () => {
    withPort("3200", () => {
      expect(e2ePort()).toBe("3200");
    });
    // Surrounding whitespace is trimmed (the friendly face; the
    // canonical integer form is still required after the trim).
    withPort(" 3200 ", () => {
      expect(e2ePort()).toBe("3200");
    });
    // The boundary ports are legal.
    withPort("1", () => {
      expect(e2ePort()).toBe("1");
    });
    withPort("65535", () => {
      expect(e2ePort()).toBe("65535");
    });
    // Unset → the single-source default (the S68-6 constant-wiring
    // contract: the literal lives exactly once).
    withPort(undefined, () => {
      expect(e2ePort()).toBe(E2E_PORT_DEFAULT);
      expect(E2E_PORT_DEFAULT).toBe("3100");
    });
  });
});
