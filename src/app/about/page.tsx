import { ContactForm } from "@/components/forms/contact-form";
import { User, Target, Mail, Terminal } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <header className="pb-6 border-b border-border text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-4">
          About Nocturnal Codex
        </h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          Unveiling the philosophy and the minds behind this digital haven for intellects.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <User className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold text-foreground">The Custodian(s)</h2>
              <p className="text-muted-foreground mt-1">
                Known only as "The Nocturnist" (or perhaps a collective thereof), the architect of this space prefers the quiet hum of servers to the spotlight. Driven by a passion for the elegant and the profound in computation and theory.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Target className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Purpose of the Site</h2>
              <p className="text-muted-foreground mt-1">
                Nocturnal Codex aims to be a curated, high-signal repository of knowledge. A place free from digital noise, dedicated to the focused exploration of computer science, mathematics, and related theoretical domains. We champion clarity, depth, and the hacker spirit of relentless inquiry.
              </p>
            </div>
          </div>
           <div className="flex items-start space-x-4">
            <Terminal className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Our Ethos</h2>
              <p className="text-muted-foreground mt-1">
                <strong className="text-foreground/90">Seek Truth:</strong> Uncover the fundamental principles.<br />
                <strong className="text-foreground/90">Share Knowledge:</strong> Curate and disseminate wisdom.<br />
                <strong className="text-foreground/90">Stay Curious:</strong> The unknown is an invitation.
              </p>
            </div>
          </div>
        </div>
        <div className="relative h-80 md:h-[450px] w-full rounded-lg overflow-hidden shadow-2xl">
            <Image 
              src="https://placehold.co/600x450.png" 
              alt="Abstract representation of knowledge" 
              layout="fill" 
              objectFit="cover"
              data-ai-hint="abstract library"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        </div>
      </section>

      <section className="pt-8 border-t border-border">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center text-foreground">
            <Mail className="mr-3 h-8 w-8 text-primary" />
            Get In Touch
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Have a question, a correction, or a profound theory to share? Use the form below. Responses are not guaranteed but all coherent signals are processed.
            Alternatively, reach out via <a href="mailto:contact@nocturnalcortex.dev" className="text-primary hover:underline">contact@nocturnalcortex.dev</a>.
          </p>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

export const metadata = {
  title: "About | Nocturnal Codex",
  description: "Learn about the mission and creators of Nocturnal Codex.",
};
