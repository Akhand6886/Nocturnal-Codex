import { Code2 } from 'lucide-react';
import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { SimpleIcon } from '@/components/common/simple-icon';
import { getAllLanguages, type Language } from '@/lib/languages';

export const metadata: Metadata = {
  title: 'Programming Languages',
  description: 'Explore various programming languages, their history, and use cases.',
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
          A collection of essential programming languages for modern development.
        </p>
      </header>

      {allLanguages.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-10">
          {allLanguages.map((lang: Language) => (
            <Link href={`/languages/${lang.slug}`} key={lang.id} className="group block">
              <Card className="h-full overflow-hidden shadow-md hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-card border border-border/50 hover:border-primary/60 rounded-lg">
                <CardContent className="p-6 flex flex-col items-center text-center">
                    <SimpleIcon iconName={lang.iconName || 'code'} className="w-12 h-12 mb-4 text-primary" />
                    <h3 className="text-base font-semibold group-hover:text-primary">{lang.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-10">
            No languages found.
        </p>
      )}
    </div>
  );
}
