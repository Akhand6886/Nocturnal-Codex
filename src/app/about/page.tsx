
import { ContactForm } from "@/components/forms/contact-form";
import { User, Target, Mail, Terminal } from "lucide-react";
import Image from "next/image";
import type { Metadata } from 'next';

export const revalidate = 60; // Revalidate every 60 seconds

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: "About Nocturnal Codex",
  description: "Learn about the mission, philosophy, and the minds behind Nocturnal Codex, a digital haven for intellects.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Nocturnal Codex",
    description: "Learn about the mission and creators of Nocturnal Codex.",
    url: `${siteUrl}/about`,
    // Images will use default from layout.tsx unless a specific one is provided here
  },
  // Twitter metadata will also use defaults or can be specified here
};


export default function AboutPage() {
  const aboutPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Nocturnal Codex",
    "description": "Learn about the mission, philosophy, and the minds behind Nocturnal Codex.",
    "url": `${siteUrl}/about`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />
      <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-8 border-b border-[#272727]">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-[#E5A93C] uppercase">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E5A93C]" />
            MANIFESTO & PROVENANCE // FOLIO 05
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.15]">
            About Nocturnal Codex
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            A quiet sanctuary for computer science theory, systems architecture, and mathematical rigor—engineered without vanity or digital distraction.
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="p-5 rounded-lg bg-[#181818] border border-[#272727] space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#E5A93C] uppercase tracking-wider">
                <User className="h-4 w-4" />
                <span>The Custodian(s)</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Known as &ldquo;The Nocturnist&rdquo;, the custodian works quietly at the intersection of systems architecture, formal methods, and software engineering. Driven by the elegance of sound computational primitives.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-[#181818] border border-[#272727] space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#E5A93C] uppercase tracking-wider">
                <Target className="h-4 w-4" />
                <span>Purpose of the Codex</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                To serve as a curated, high-signal knowledge archive free from promotional noise. Focused on the rigorous exploration of foundational computer science, systems engineering, and mathematics.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-[#181818] border border-[#272727] space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#E5A93C] uppercase tracking-wider">
                <Terminal className="h-4 w-4" />
                <span>Core Axioms</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                <div className="p-2.5 rounded bg-[#121212] border border-[#272727]">
                  <span className="text-[10px] font-mono text-[#E5A93C] block">[01] TRUTH</span>
                  <p className="text-[11px] text-muted-foreground mt-1">First-principles deduction.</p>
                </div>
                <div className="p-2.5 rounded bg-[#121212] border border-[#272727]">
                  <span className="text-[10px] font-mono text-[#E5A93C] block">[02] SIGNAL</span>
                  <p className="text-[11px] text-muted-foreground mt-1">Depth over algorithmic hype.</p>
                </div>
                <div className="p-2.5 rounded bg-[#121212] border border-[#272727]">
                  <span className="text-[10px] font-mono text-[#E5A93C] block">[03] INQUIRY</span>
                  <p className="text-[11px] text-muted-foreground mt-1">Perpetual learning loop.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-80 md:h-[420px] w-full rounded-lg overflow-hidden border border-[#272727] bg-[#141414]">
            <Image 
              src="/images/about-hero.png" 
              alt="Abstract representation of knowledge and code" 
              width={600}
              height={450}
              className="object-cover w-full h-full opacity-85"
            />
          </div>
        </section>

        <section className="pt-10 border-t border-[#272727]">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-widest text-[#E5A93C] uppercase">
                <Mail className="h-3.5 w-3.5" />
                SECURE TRANSMISSION
              </div>
              <h2 className="text-2xl font-semibold text-foreground tracking-tight">
                Establish Direct Contact
              </h2>
              <p className="text-xs text-muted-foreground">
                Corrections, theoretical inquiries, and high-signal contributions are welcomed.
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </div>
    </div>
  );
}
