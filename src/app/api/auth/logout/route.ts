import { isGuarded, ok, requireSession } from "@/lib/api";
import { clearSessionCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST() {
  // Session-29 (S29-1): the CSRF-logout cure — the family's CSRF defense
  // is the content-type gate (parseBody's unparseable-by-policy form),
  // which blocks cross-site simple-form POSTs on every JSON-parsing
  // route. This route reads no body, so a classic
  // <form method="POST"> could hit it: the response's Set-Cookie (maxAge
  // 0) cleared the victim's session regardless of SameSite=Lax (which
  // gates cookie SENDING, not SETTING). requireSession closes the vector
  // — the Lax cookie never rides a cross-site POST, so the gate answers
  // the envelope's 401 — and the no-op call is honest now (an
  // already-signed-out caller gets 401, not a meaningless 200 plus a
  // cookie clear that changed nothing).
  // Session-18 (S18-3) bareness note, updated: requireSession owns its
  // own try/catch (a DB failure answers the envelope's INTERNAL), and
  // clearSessionCookie still performs no crypto (never calls secret())
  // and no DB work, and cookies() cannot throw inside a route handler —
  // no realistic throw path remains across the boundary.
  const gate = await requireSession();
  if (isGuarded(gate)) return gate.response;
  await clearSessionCookie();
  return ok({ signedOut: true });
}
