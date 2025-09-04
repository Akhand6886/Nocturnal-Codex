// src/app/tutorial/[language]/page.tsx
import { allTutorialPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { TutorialCard } from '@/components/content/tutorial-card';
import { Code2 } from 'lucide-react';
import type { Metadata } from 'next';
import { SimpleIcon } from '@/components/common/simple-icon';
import { allLanguagePosts } from 'contentlayer/generated';

export const revalidate = 60;

export async function generateStaticParams() {
  const languages = allLanguagePosts || [];
  return languages.map((lang) => ({
    language: lang.slug,
  }));
}

interface LanguageTutorialsPageProps {
  params: { language: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: LanguageTutorialsPageProps): Promise<Metadata> {
    const language = allLanguagePosts.find(p => p.slug === params.language);
    if (!language) {
        return { title: 'Language Not Found' };
    }
    return {
        title: `${language.name} Tutorials | Nocturnal Codex`,
        description: `Browse all ${language.name} tutorials. ${language.description}`,
    };
}

export default function LanguageTutorialsPage({ params, searchParams }: LanguageTutorialsPageProps) {
  const language = allLanguagePosts.find((p) => p.slug === params.language);

  if (!language) {
    notFound();
  }

  const categoryFilter = typeof searchParams.category === 'string' ? searchParams.category : null;

  const tutorials = allTutorialPosts
    .filter((p) => p.language === language.slug)
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
    .filter(category => !categoryFilter || category === categoryFilter)
    .sort((a, b) => {
        const aNum = parseInt(a.split('.')[0], 10);
        const bNum = parseInt(b.split('.')[0], 10);

        if (!isNaN(aNum) && !isNaN(bNum)) {
            return aNum - bNum;
        }
        return a.localeCompare(b);
    });

  return (
    <div className="container mx-auto px-4 py-10 md:py-12">
      <header className="pb-8 border-b border-border mb-12">
        <div className="flex items-center space-x-4">
            <SimpleIcon iconName={language.iconName || 'code'} className="w-12 h-12 md:w-16 md:h-16 text-primary" />
            <div>
                 <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                    {language.name} Tutorials
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    {language.description}
                </p>
            </div>
        </div>
      </header>

      {sortedCategories.length > 0 ? (
        <div className="space-y-12">
            {sortedCategories.map(category => (
                <section key={category}>
                    <h2 className="text-2xl font-semibold mb-6 pb-2 border-b border-border/70">{category}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {groupedTutorials[category].map((tutorial) => (
                            <TutorialCard key={tutorial.slug} tutorial={tutorial} />
                        ))}
                    </div>
                </section>
            ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-10">No tutorials found for {language.name}. Please check back soon.</p>
      )}
    </div>
  );
}
