import { LoginCard } from "@/components/layout/login-card";
import { LOGIN_LAYOUT } from "@/lib/page-layout";
import { pageMetadata } from "@/lib/site";

// The reference's login page ships the BARE app title "ViralPost AI"
// (document.title probe) — the metadata is therefore ABSOLUTE (a relative
// string would ride the root layout's "%s | ViralPost AI" template and
// SSR the doubled form). The UNPREFIXED metadata family applies here too
// — og:title "ViralPost AI", the plain description, og:url/twitter:url +
// canonical at origin/login — built through the pageMetadata() factory
// (page: null = the unprefixed family; the factory keeps the ABSOLUTE
// title).
export const metadata = pageMetadata({ page: null, route: "/login" });

export const dynamic = "force-dynamic";

// Session-23 (S23-P2): NO authenticated redirect here. The reference
// serves the login card to AUTHENTICATED visitors too (live-verified:
// its /login renders the card with the session cookie present, and an
// authed wrong-password attempt draws the error banner on the card) —
// our `if (user) redirect("/")` was an invented scaffold pattern, never
// a reference behavior. The page stays force-dynamic (the reference
// serves /login dynamically; the s19 metadata family is
// runtime-stable either way).
export default function LoginPage() {
  return (
    <main className={LOGIN_LAYOUT.page}>
      <LoginCard />
    </main>
  );
}
