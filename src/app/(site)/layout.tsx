import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

// The public site chrome — navbar over the page, footer below. No session
// resolution: every page in this group is public (the reference serves its
// marketing surfaces to guests and logged-in visitors alike).
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
