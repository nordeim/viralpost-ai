import { Suspense } from "react";

import { ResetPasswordScreen } from "@/components/layout/reset-password-screen";
import { LOGIN_LAYOUT } from "@/lib/page-layout";
import { pageMetadata } from "@/lib/site";

// The digma family's session-163 (the S46/RA-66 port — donor-ledger numbers): the reset-password landing
// page — PUBLIC and session-agnostic (the reference renders it while
// logged in; no redirect). The two card states key on the ?token=
// query param inside the client component (a search-params read —
// hence the Suspense boundary; the stream renders the fallback until
// the client mounts, matching the family's route structure).
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
