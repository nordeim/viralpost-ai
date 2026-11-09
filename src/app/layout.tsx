import type { Metadata, Viewport } from "next";
import { Toaster } from "@/components/ui/toast";
import { PWA_META, SITE_DESCRIPTION, siteUrl } from "@/lib/site";
import "./globals.css";

// The document metadata layer — the reference's own head (DOM-verified
// 2026-11-09): title "ViralPost AI" (bare on / and /login; the
// "<Page> | ViralPost AI" template elsewhere), the 141-char description,
// the bare-origin canonical, the OG family, the PWA metas and the
// viewport. The reference ships no theme-color; we keep Next's default
// (no value) for parity. The icons ride the src/app/icon.png and
// apple-icon.png FILE CONVENTIONS (declaring metadata.icons would REPLACE
// the file-convention link[rel=icon] — a gate-caught lesson from the
// template's session-18).

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  manifest: `${siteUrl()}/manifest.json`,
  title: {
    default: "ViralPost AI",
    template: "%s | ViralPost AI",
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: "ViralPost AI",
    description: SITE_DESCRIPTION,
    url: siteUrl(),
    type: "website",
    siteName: "ViralPost AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ViralPost AI",
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  // The Next twitter metadata object has no url field — the twitter:url
  // rides the `other` escape hatch. PWA_META adds the
  // mobile-web-app-capable + apple pair (also without first-class fields).
  // NOTE: page-level metadata REPLACES this map (shallow merge), which is
  // why pageMetadata() re-declares all of it per page.
  other: {
    "twitter:url": siteUrl(),
    ...PWA_META,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-scroll-behavior lets Next suspend the CSS smooth scrolling
    // during route transitions (the globals.css html rule sets it; without
    // the attribute Next warns it can't manage it).
    <html lang="en" data-scroll-behavior="smooth">
      <body className="min-h-screen bg-background font-sans text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
