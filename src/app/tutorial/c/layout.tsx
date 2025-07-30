
import { TutorialLayout } from '@/components/layout/tutorial-layout';
import type { PropsWithChildren } from 'react';
import { allTutorialPosts } from 'contentlayer/generated';
import { MOCK_PROGRAMMING_LANGUAGES } from '@/lib/data';
import { notFound } from 'next/navigation';
import { LanguageScroller } from '@/components/layout/language-scroller';

export default function CTutorialsPageLayout({ children }: PropsWithChildren) {
  const cTutorials = allTutorialPosts
    .filter(p => p.language === 'c')
    .sort((a, b) => a.order - b.order);

  const cLanguage = MOCK_PROGRAMMING_LANGUAGES.find(lang => lang.slug === 'c');
  
  if (!cLanguage) {
      notFound();
  }

  return (
    <div>
        <LanguageScroller languages={MOCK_PROGRAMMING_LANGUAGES} activeLanguage="c" />
        <TutorialLayout language={cLanguage} tutorials={cTutorials}>
            {children}
        </TutorialLayout>
    </div>
  );
}
