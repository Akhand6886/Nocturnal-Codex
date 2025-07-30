
import { TutorialLayout } from '@/components/layout/tutorial-layout';
import type { PropsWithChildren } from 'react';
import { allTutorialPosts } from 'contentlayer/generated';
import { MOCK_PROGRAMMING_LANGUAGES } from '@/lib/data';
import { notFound } from 'next/navigation';
import { LanguageScroller } from '@/components/layout/language-scroller';

export default function CssTutorialsPageLayout({ children }: PropsWithChildren) {
  const cssTutorials = allTutorialPosts
    .filter(p => p.language === 'css')
    .sort((a, b) => a.order - b.order);

  const cssLanguage = MOCK_PROGRAMMING_LANGUAGES.find(lang => lang.slug === 'css');
  
  if (!cssLanguage) {
      notFound();
  }

  return (
    <div>
        <LanguageScroller languages={MOCK_PROGRAMMING_LANGUAGES} activeLanguage="css" />
        <TutorialLayout language={cssLanguage} tutorials={cssTutorials}>
            {children}
        </TutorialLayout>
    </div>
  );
}
