
import { TutorialLayout } from '@/components/layout/tutorial-layout';
import type { PropsWithChildren } from 'react';
import { allTutorialPosts } from 'contentlayer/generated';
import { MOCK_PROGRAMMING_LANGUAGES } from '@/lib/data';
import { notFound } from 'next/navigation';
import { LanguageScroller } from '@/components/layout/language-scroller';

export default function JavaTutorialsPageLayout({ children }: PropsWithChildren) {
  const javaTutorials = allTutorialPosts
    .filter(p => p.language === 'java')
    .sort((a, b) => a.order - b.order);

  const javaLanguage = MOCK_PROGRAMMING_LANGUAGES.find(lang => lang.slug === 'java');
  
  if (!javaLanguage) {
      notFound();
  }

  return (
    <div>
        <LanguageScroller languages={MOCK_PROGRAMMING_LANGUAGES} activeLanguage="java" />
        <TutorialLayout language={javaLanguage} tutorials={javaTutorials}>
            {children}
        </TutorialLayout>
    </div>
  );
}
