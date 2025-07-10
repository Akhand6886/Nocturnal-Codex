
import type { PropsWithChildren } from 'react';
import { MOCK_PROGRAMMING_LANGUAGES, type ProgrammingLanguage } from "@/lib/data";
import { TutorialLayout } from '@/components/layout/tutorial-layout';
import { notFound } from 'next/navigation';
import { allTutorialPosts } from 'contentlayer/generated';
import type { TutorialPost } from 'contentlayer/generated';

interface LanguageSlugLayoutProps extends PropsWithChildren {
  params: { languageSlug: string };
}

async function getLanguage(slug: string): Promise<ProgrammingLanguage | undefined> {
  return MOCK_PROGRAMMING_LANGUAGES.find((lang) => lang.slug === slug);
}

async function getTutorialsForLanguage(languageSlug: string): Promise<TutorialPost[]> {
    return allTutorialPosts
        .filter(p => p.language === languageSlug)
        .sort((a,b) => a.order - b.order);
}

export async function generateStaticParams() {
  return MOCK_PROGRAMMING_LANGUAGES.map((lang) => ({
    languageSlug: lang.slug,
  }));
}

export default async function LanguageDetailLayout({ children, params }: LanguageSlugLayoutProps) {
  const language = await getLanguage(params.languageSlug);

  if (!language) {
    notFound();
  }
  
  const tutorials = await getTutorialsForLanguage(params.languageSlug);

  return (
    <TutorialLayout 
        language={language} 
        tutorials={tutorials}
    >
        {children}
    </TutorialLayout>
  );
}
