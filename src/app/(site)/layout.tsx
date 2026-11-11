import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

// The public site chrome — navbar over the page, footer below. No session
// resolution: every page in this group is public (the reference serves its
// marketing surfaces to guests and logged-in visitors alike).
//
// Session-22 (S22-11): the skip link (WCAG 2.4.1 bypass blocks — jump
// straight past the fixed chrome). The fixed navbar puts 6 tab stops
// before <main>; the skip link is the first focusable element and jumps
// straight to the content anchor. sr-only until focused (the visual
// surface is untouched — the reference ships none, parity-neutral);
// z-[60] sits above the navbar's z-50 so the revealed pill reads over
// the fixed chrome; the dark pill matches the navbar's own surface
// family.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        // fixed (not absolute) so the revealed pill sits in the VIEWPORT
        // regardless of scroll depth; z-[60] sits above the navbar's
        // z-50; the dark pill matches the navbar's own surface family.
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:bg-slate-900 focus:rounded-lg focus:ring-2 focus:ring-teal-400"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
