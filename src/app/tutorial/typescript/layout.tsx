
import { TutorialLayout } from '@/components/layout/tutorial-layout';
import type { PropsWithChildren } from 'react';
import { allTutorialPosts } from 'contentlayer/generated';
import { MOCK_PROGRAMMING_LANGUAGES } from '@/lib/data';
import { notFound } from 'next/navigation';
import { LanguageScroller } from '@/components/layout/language-scroller';

export default function TypescriptTutorialsPageLayout({ children }: PropsWithChildren) {
  const typescriptTutorials = allTutorialPosts
    .filter(p => p.language === 'typescript')
    .sort((a, b) => a.order - b.order);

  const typescriptLanguage = MOCK_PROGRAMMING_LANGUAGES.find(lang => lang.slug === 'typescript');
  
  if (!typescriptLanguage) {
      notFound();
  }

  return (
    <div>
        <LanguageScroller languages={MOCK_PROGRAMMING_LANGUAGES} activeLanguage="typescript" />
        <TutorialLayout language={typescriptLanguage} tutorials={typescriptTutorials}>
            {children}
        </TutorialLayout>
    </div>
  );
}
