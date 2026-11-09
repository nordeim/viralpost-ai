// Shared client-side domain types (API wire shapes).

export type Result<T, E> = { ok: true; data: T } | { ok: false; error: E };

export interface User {
  id: string;
  email: string;
  name: string;
  avatarColor: string;
  photoUrl: string | null;
  role: string;
}

/** POST /api/generate response payload. */
export interface GeneratedPostPayload {
  text: string;
}

/** POST /api/contact response payload. */
export interface ContactSentPayload {
  sent: boolean;
}
