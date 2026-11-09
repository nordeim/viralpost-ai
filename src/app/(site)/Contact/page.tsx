import type { Metadata } from "next";

import { ContactForm } from "@/components/marketing/contact-form";
import { pageMetadata } from "@/lib/site";

// /Contact — the reference's contact page: teal-badged dark header, the
// contact card. (No closing CTA on this page — the reference goes straight
// to the footer.)
export const metadata: Metadata = pageMetadata({ page: "Contact", route: "/Contact" });

export default function ContactPage() {
  return (
    <>
      <div className="pt-16 bg-gradient-to-b from-slate-900 to-teal-900 pb-16">
        <div className="max-w-3xl mx-auto text-center pt-16 px-6">
          <span className="inline-block px-4 py-1.5 bg-teal-400/10 text-teal-400 text-xs font-semibold rounded-full border border-teal-400/20 mb-4">
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-teal-200/60 text-lg">
            Have questions or partnership ideas? We&apos;d love to hear from you.
          </p>
        </div>
      </div>
      <section id="contact" className="py-24 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Contact</h2>
            <p className="mt-4 text-slate-500">
              Have questions or partnership ideas? Reach out and let&apos;s build
              something amazing.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
