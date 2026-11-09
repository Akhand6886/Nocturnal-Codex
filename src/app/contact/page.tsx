
import { ContactForm } from "@/components/forms/contact-form";
import { Mail } from "lucide-react";
import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the team at Nocturnal Codex. Have questions, feedback, or a brilliant idea? Reach out to us.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Nocturnal Codex",
    description: "Get in touch with the team at Nocturnal Codex.",
    url: `${siteUrl}/contact`,
  },
};

export default function ContactPage() {
  const contactPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Nocturnal Codex",
    "description": "Get in touch with the team at Nocturnal Codex. Have questions, feedback, or a brilliant idea? Reach out to us.",
    "url": `${siteUrl}/contact`,
    "publisher": {
        "@type": "Organization",
        "name": "Nocturnal Codex",
        "logo": {
            "@type": "ImageObject",
            "url": `${siteUrl}/images/logo.png`
        }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-8 border-b border-[#272727]">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-[#E5A93C] uppercase">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E5A93C]" />
            TRANSMISSION INTERFACE // DIRECT DISPATCH
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.15]">
            Contact the Codex
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Have questions, feedback, or a theoretical correction to submit? Transmit your signal below or reach out via direct electronic mail.
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <section className="max-w-2xl mx-auto space-y-6">
          <div className="p-4 rounded-lg bg-[#181818] border border-[#272727] text-xs font-mono text-muted-foreground text-center">
            Direct telemetry endpoint: <a href="mailto:contact@nocturnalcodex.dev" className="text-[#E5A93C] hover:underline">contact@nocturnalcodex.dev</a>
          </div>
          <ContactForm />
        </section>
      </div>
    </div>
  );
}
