// src/app/languages/[languageSlug]/page.tsx
import { allLanguagePosts, allTutorialPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { TutorialCard } from '@/components/content/tutorial-card';
import { Code2 } from 'lucide-react';
import type { Metadata } from 'next';
import { SimpleIcon } from '@/components/common/simple-icon';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const revalidate = 60;

export async function generateStaticParams() {
  const languages = allLanguagePosts || [];
  return languages.map((lang) => ({
    languageSlug: lang.slug,
  }));
}

interface LanguagePageProps {
  params: { languageSlug: string };
}

export async function generateMetadata({ params }: LanguagePageProps): Promise<Metadata> {
    const language = allLanguagePosts.find(p => p.slug === params.languageSlug);
    if (!language) {
        return { title: 'Language Not Found' };
    }
    return {
        title: `${language.name} Overview | Nocturnal Codex`,
        description: `Learn about the ${language.name} programming language. ${language.description}`,
    };
}

export default function LanguagePage({ params }: LanguagePageProps) {
  const language = allLanguagePosts.find((p) => p.slug === params.languageSlug);

  if (!language) {
    notFound();
  }

  const tutorials = allTutorialPosts
    .filter((p) => p.language === language.slug)
    .sort((a, b) => a.order - b.order)
    .slice(0, 3); // Show a few featured tutorials

  return (
    <div className="container mx-auto px-4 py-10 md:py-12 space-y-12">
      <header className="pb-8 border-b border-border">
        <div className="flex items-center space-x-4">
            <SimpleIcon iconName={language.iconName || 'code'} className="w-12 h-12 md:w-16 md:h-16 text-primary" />
            <div>
                 <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                    {language.name}
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    {language.description}
                </p>
            </div>
        </div>
      </header>

      <section>
          <div className="prose dark:prose-invert max-w-none">
              <p>{language.body.raw}</p>
          </div>
      </section>

      {tutorials.length > 0 && (
          <section>
              <h2 className="text-2xl font-semibold mb-6 pb-2 border-b border-border/70">Featured Tutorials</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tutorials.map((tutorial) => (
                      <TutorialCard key={tutorial.slug} tutorial={tutorial} />
                  ))}
              </div>
              <div className="text-center mt-10">
                <Button asChild variant="default" size="lg">
                  <Link href={`/tutorial/${language.slug}`}>View All {language.name} Tutorials</Link>
                </Button>
              </div>
          </section>
      )}

       {tutorials.length === 0 && (
         <p className="text-center text-muted-foreground py-10">No tutorials available for {language.name} yet. Check back soon.</p>
      )}
    </div>
  );
}
