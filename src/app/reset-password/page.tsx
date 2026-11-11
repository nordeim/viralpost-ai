import { Suspense } from "react";

import { ResetPasswordScreen } from "@/components/layout/reset-password-screen";
import { LOGIN_LAYOUT } from "@/lib/page-layout";
import { pageMetadata } from "@/lib/site";

// The digma family's session-163 (the S46/RA-66 port — donor-ledger numbers): the reset-password landing
// page — PUBLIC and session-agnostic (the reference renders it while
// logged in; no redirect). The two card states key on the ?token=
// query param inside the client component. Session-22 (S22-21): the
// Suspense boundary is DEFENSIVE weight on this force-dynamic route —
// useSearchParams resolves during SSR here, so the boundary never
// engages (the family's /login and /signup ship no boundary for exactly
// this reason); it stays as harmless insurance against a future static
// render, with no fallback needed.
export const metadata = pageMetadata({ page: "Reset password", route: "/reset-password" });

export const dynamic = "force-dynamic";

export default function ResetPasswordPage() {
  return (
    <main className={LOGIN_LAYOUT.page}>
      <Suspense>
        <ResetPasswordScreen />
      </Suspense>
    </main>
  );
}
