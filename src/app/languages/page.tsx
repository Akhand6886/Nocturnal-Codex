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
    <div className="min-h-screen bg-background text-foreground">
      <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-8 border-b border-[#272727]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-[#E5A93C] uppercase">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E5A93C]" />
              LANGUAGE FOLIOS // INDEX 02
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.15]">
              Programming Languages
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Exhaustive technical references spanning systems programming, type theory, runtime mechanics, memory models, and idiomatic idioms.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground border border-[#272727] bg-[#181818] px-4 py-2 rounded-lg">
            <span><strong className="text-foreground">{allLanguages.length}</strong> languages</span>
            <span className="text-[#383838]">|</span>
            <span><strong className="text-foreground">6</strong> paradigms</span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <LanguagesClientPage allLanguages={allLanguages} />
      </div>
    </div>
  );
}
