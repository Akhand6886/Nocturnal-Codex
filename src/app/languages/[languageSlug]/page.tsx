// src/app/languages/[languageSlug]/page.tsx
import { allLanguagePosts, allTutorialPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SimpleIcon } from '@/components/common/simple-icon';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export const revalidate = 60;

export async function generateStaticParams() {
  const languages = allLanguagePosts || [];
  return languages.map((lang) => ({
    languageSlug: lang.slug,
  }));
}

interface LanguagePageProps {
  params: { languageSlug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: LanguagePageProps): Promise<Metadata> {
    const language = allLanguagePosts.find(p => p.slug === params.languageSlug);
    if (!language) {
        return { title: 'Language Not Found' };
    }
    return {
        title: `${language.name} Tutorials | Nocturnal Codex`,
        description: `Learn about the ${language.name} programming language. ${language.description}`,
    };
}

// Helper to remove leading numbers (e.g., "1. ") from category titles for display
const formatCategoryTitle = (title: string) => {
    return title.replace(/^\d+\.\s*/, '');
};

export default function LanguagePage({ params, searchParams }: LanguagePageProps) {
  const language = allLanguagePosts.find((p) => p.slug === params.languageSlug);

  if (!language) {
    notFound();
  }
  
  const categoryFilter = typeof searchParams.category === 'string' ? searchParams.category : null;

  const tutorials = allTutorialPosts
    .filter((p) => p.language === language.slug && (!categoryFilter || p.tags?.includes(categoryFilter)))
    .sort((a, b) => a.order - b.order);

  const groupedTutorials = tutorials.reduce((acc, tutorial) => {
    const category = tutorial.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tutorial);
    return acc;
  }, {} as Record<string, typeof tutorials>);

  const sortedCategories = Object.keys(groupedTutorials)
    .sort((a, b) => {
        const getOrder = (str: string) => {
            const match = str.match(/^(\d+)\./);
            return match ? parseInt(match[1], 10) : Infinity;
        };
        const orderA = getOrder(a);
        const orderB = getOrder(b);

        if (orderA !== Infinity && orderB !== Infinity) {
            return orderA - orderB;
        }
        return a.localeCompare(b);
    });

  // Default layout for other languages
  return (
    <div className="container mx-auto px-4 py-10 md:py-12 space-y-12">
      <header className="pb-8 border-b border-border">
        <div className="flex items-center space-x-4">
            <SimpleIcon iconName={language.iconName || 'code'} className="w-12 h-12 md:w-16 md:h-16 text-primary" />
            <div>
                 <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                    {categoryFilter ? `${language.name}: ${decodeURIComponent(categoryFilter)}` : `${language.name} Tutorials`}
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    {language.description}
                </p>
                {categoryFilter && (
                    <Button asChild variant="link" className="p-0 h-auto mt-2">
                        <Link href={`/languages/${language.slug}`}>View All {language.name} Tutorials</Link>
                    </Button>
                )}
            </div>
        </div>
      </header>
        
      {sortedCategories.length > 0 ? (
        <div className="space-y-12">
          {sortedCategories.map(category => (
            <section key={category}>
              <h2 className="text-2xl font-semibold mb-6 pb-2 border-b border-border/70">{formatCategoryTitle(category)}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedTutorials[category].map((tutorial) => (
                    <Link href={tutorial.url} key={tutorial.slug} className="group block h-full">
                        <Card className="h-full flex flex-col justify-between rounded-xl border text-card-foreground shadow-lg bg-card hover:bg-muted/40 transition-colors">
                            <CardHeader>
                                <CardTitle className="text-lg group-hover:text-primary transition-colors">{tutorial.title}</CardTitle>
                            </CardHeader>
                            {tutorial.description && (
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{tutorial.description}</p>
                                </CardContent>
                            )}
                        </Card>
                    </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
         <p className="text-center text-muted-foreground py-10">No tutorials available for {language.name} yet. Check back soon.</p>
      )}
    </div>
  );
}
