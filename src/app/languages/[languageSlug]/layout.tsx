
import type { PropsWithChildren } from 'react';
import { MOCK_PROGRAMMING_LANGUAGES, type ProgrammingLanguage } from "@/lib/data";
import { LanguagePageLayout } from '@/components/layout/language-page-layout';
import { notFound } from 'next/navigation';
import { allTutorialPosts } from 'contentlayer/generated';

interface LanguageSlugLayoutProps extends PropsWithChildren {
  params: { languageSlug: string };
}

async function getLanguage(slug: string): Promise<ProgrammingLanguage | undefined> {
  return MOCK_PROGRAMMING_LANGUAGES.find((lang) => lang.slug === slug);
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

  const hasTutorialSeries = allTutorialPosts.some(p => p.language === language.slug);

  return <LanguagePageLayout language={language} hasTutorialSeries={hasTutorialSeries}>{children}</LanguagePageLayout>;
}
