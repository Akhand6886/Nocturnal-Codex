
import type { PropsWithChildren } from 'react';
import { MOCK_PROGRAMMING_LANGUAGES, type ProgrammingLanguage } from "@/lib/data";
import { LanguagePageLayout } from '@/components/layout/language-page-layout';
import { notFound } from 'next/navigation';

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

  return <LanguagePageLayout language={language}>{children}</LanguagePageLayout>;
}

// Optional: Add generateMetadata here if you want layout-level metadata
// export async function generateMetadata({ params }: { params: { languageSlug: string }}) {
//   const language = await getLanguage(params.languageSlug);
//   if (!language) return { title: "Language Not Found" };
//   return {
//     title: `${language.name} Overview`,
//     description: `Learn about ${language.name}, its features, and resources.`,
//   };
// }
