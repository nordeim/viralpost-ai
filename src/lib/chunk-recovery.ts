// The stale-chunk self-heal (session-170, WP-2 — the scandihaven port:
// its packages/config/src/chunk-recovery.ts, the same construction in
// the house pure-seam form).
//
// WHY THIS EXISTS: `bun run build` emits content-hashed chunk filenames.
// Every redeploy invalidates them — a browser tab left open across the
// deploy holds the OLD HTML/JS graph, and its next soft navigation
// throws a ChunkLoadError-family error into the nearest error boundary
// (src/app/error.tsx). The user is stranded on the boundary even though
// a single reload would fetch the new graph. The cure — reload ONCE per
// cooldown window, from inside the boundary, before the user ever reads
// the error card. A crash mid-reload cannot loop: the cooldown flag is
// written BEFORE window.location.reload() fires.
//
// THE INJECTABLE FORM (the house doctrine): shouldHardReload takes the
// clock as an argument and reloadOnStaleChunk takes storage/now/reload
// dependencies — the seam is pure, node-testable (tests/
// chunk-recovery.test.ts), and never touches globals it was not handed.
// Storage access is guarded: an unavailable sessionStorage (Safari
// private mode, disabled storage, OR simply not handed in deps — the
// session-22 S22-4 cure) DISABLES the reload — the recovery path must
// never throw, and a cooldown it cannot read is a loop guard it does
// not have.

/** The sessionStorage flag key (the app-namespaced form). */
export const CHUNK_RELOAD_FLAG = "viralpost:chunk-reload-at";

/** One reload per 10 s — enough to heal, too slow to loop. */
export const CHUNK_RELOAD_COOLDOWN_MS = 10_000;

/**
 * The bundler message family that means "the browser is holding a stale
 * chunk graph" — the four forms Turbopack/webpack emit across browsers.
 */
export function isStaleChunkError(message: string): boolean {
  return /ChunkLoadError|Failed to load chunk|Loading chunk|dynamically imported module/i.test(
    message,
  );
}

/**
 * The cooldown decision, pure over the injected clock.
 * `lastReloadAt === null` means "no recorded reload" (first-ever event).
 */
export function shouldHardReload(
  message: string,
  now: number,
  lastReloadAt: number | null,
): boolean {
  if (!isStaleChunkError(message)) return false;
  if (lastReloadAt === null) return true;
  return now - lastReloadAt >= CHUNK_RELOAD_COOLDOWN_MS;
}

/** The structural storage minimum the seam reads (a full Storage is
 *  accepted; tests hand doubles that implement just these two). */
export type ChunkStorage = Pick<Storage, "getItem" | "setItem">;

/** The injectable dependencies (tests hand doubles; the boundary hands the globals). */
export interface ReloadDeps {
  storage?: ChunkStorage | null;
  now?: () => number;
  reload?: () => void;
}

/**
 * The boundary's useEffect body: reload a stale-chunk error once per
 * cooldown window. Returns whether the reload fired (the boundary can
 * log the decision). Never throws — every storage access is guarded.
 */
export function reloadOnStaleChunk(error: Error, deps: ReloadDeps = {}): boolean {
  const storage = deps.storage ?? null;
  const now = deps.now ?? Date.now;
  const reload = deps.reload ?? (() => window.location.reload());

  // A non-chunk error is a REAL bug — the boundary card is the honest
  // surface for it; no storage is touched.
  if (!isStaleChunkError(error.message)) return false;

  // Session-22 (S22-4): ABSENT storage disables the reload too. The
  // original optional-chained read silently yielded null for a missing
  // storage (no throw — the catch arm below never fired), so every
  // stale-chunk error reloaded immediately: the cooldown and the
  // crash-mid-reload loop guard were inert whenever a caller forgot to
  // hand the storage. Fail safe instead: no readable record, no reload.
  if (!storage) return false;

  // Read the last-reload record (a corrupt value is treated as absent —
  // the first-reload path, never a crash).
  let lastReloadAt: number | null = null;
  try {
    // Session-23 (S23-5): the bare reads — the !storage guard above owns
    // the null face; the vestigial ?. contradicted it two statements in.
    const raw = storage.getItem(CHUNK_RELOAD_FLAG);
    if (raw !== null) {
      const parsed = Number(raw);
      lastReloadAt = Number.isFinite(parsed) ? parsed : null;
    }
  } catch {
    return false; // unavailable storage disables the reload
  }

  let current: number;
  try {
    current = now();
  } catch {
    return false;
  }
  if (!shouldHardReload(error.message, current, lastReloadAt)) return false;

  // Write the flag BEFORE the reload — the crash-mid-reload loop guard.
  try {
    storage.setItem(CHUNK_RELOAD_FLAG, String(current));
  } catch {
    // proceed anyway: a missing record only means a possible extra reload
  }
  try {
    reload();
  } catch {
    return false; // a broken reload hook must not take the card down
  }
  return true;
}
