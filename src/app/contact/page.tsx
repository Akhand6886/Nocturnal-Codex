
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
            "url": `${siteUrl}/images/logo.png` // Replace with your actual logo URL
        }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <div className="space-y-10">
        <header className="pb-6 border-b border-border text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-4 flex items-center justify-center">
            <Mail className="mr-3 h-10 w-10 text-primary" />
            Contact Us
          </h1>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions, feedback, or a brilliant idea to share? We'd love to hear from you. Fill out the form below or reach out via email.
          </p>
        </header>

        <section className="max-w-2xl mx-auto">
          <p className="text-center text-muted-foreground mb-8">
              Alternatively, you can email us directly at <a href="mailto:contact@nocturnalcortex.dev" className="text-primary hover:underline">contact@nocturnalcortex.dev</a>.
          </p>
          <ContactForm />
        </section>
      </div>
    </>
  );
}
