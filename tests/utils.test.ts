import { describe, expect, it } from "vitest";
// Session-36 (S36-6b): utils.ts was the only PURE src/lib module with
// zero test references — PAD §8.3's "every seam has a spec" held only
// via the glossary's circular definition ("a pure module in src/lib/
// WITH a spec"). (Session-38, S38-6: the "only module" wording was
// loose — db.ts, the impure Prisma client singleton, also has zero
// test imports; the exemption is documented here. verification-server
// joined the covered set session-37, S37-6e.) The module is vendored
// scaffold (the shadcn cn() = clsx passthrough + tailwind-merge);
// this spec pins the two behaviors the app's class composition
// actually leans on, closing the PAD claim mechanically.
// A1-I2/A3-I2 lineage: found by the session-36 audit.
import { cn } from "@/lib/utils";

describe("utils: the cn() class-composition seam (the vendored shadcn form)", () => {
  it("composes conditional classes (clsx passthrough) and resolves Tailwind conflicts by LAST win (tailwind-merge precedence)", () => {
    // The clsx face: falsy members drop out, truthy ones join.
    expect(cn("px-2", false && "hidden", "text-center")).toBe("px-2 text-center");
    expect(cn(["a", undefined, "b"], { c: true, d: false })).toBe("a b c");
    // The tailwind-merge face: the LATER conflicting utility wins —
    // the whole point of cn() over a bare join (the login-card's
    // per-view class composition depends on it). text-slate-300 vs
    // text-teal-400 are the SAME group (text-color — the later wins);
    // text-sm is a different group (font-size) and coexists.
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-sm text-slate-300", "text-teal-400")).toBe("text-sm text-teal-400");
    expect(cn("text-slate-300", "text-teal-400")).toBe("text-teal-400");
    // Non-conflicting families coexist.
    expect(cn("py-2", "px-4")).toBe("py-2 px-4");
  });
});
