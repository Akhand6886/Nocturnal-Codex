import { Code2 } from 'lucide-react';
import type { Metadata } from 'next';
import { getAllLanguages } from '@/lib/languages';
import { LanguagesClientPage } from '@/components/content/languages-client-page';

export const metadata: Metadata = {
  title: 'Programming Languages',
  description: 'Explore various programming languages, their history, paradigms, and use cases.',
};

export default function LanguagesPage() {
  const allLanguages = getAllLanguages();

  return (
    <div className="container mx-auto px-4 py-10 md:py-12">
      <header className="pb-6 border-b border-border">
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center text-foreground">
          <Code2 className="mr-4 h-10 w-10 text-primary" />
          Programming Languages
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          A collection of essential programming languages for modern development. Filter by category to explore.
        </p>
      </header>

      <LanguagesClientPage allLanguages={allLanguages} />
    </div>
  );
}
