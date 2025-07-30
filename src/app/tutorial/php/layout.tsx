
import { TutorialLayout } from '@/components/layout/tutorial-layout';
import type { PropsWithChildren } from 'react';
import { allTutorialPosts } from 'contentlayer/generated';
import { MOCK_PROGRAMMING_LANGUAGES } from '@/lib/data';
import { notFound } from 'next/navigation';
import { LanguageScroller } from '@/components/layout/language-scroller';

export default function PhpTutorialsPageLayout({ children }: PropsWithChildren) {
  const phpTutorials = allTutorialPosts
    .filter(p => p.language === 'php')
    .sort((a, b) => a.order - b.order);

  const phpLanguage = MOCK_PROGRAMMING_LANGUAGES.find(lang => lang.slug === 'php');
  
  if (!phpLanguage) {
      notFound();
  }

  return (
    <div>
        <LanguageScroller languages={MOCK_PROGRAMMING_LANGUAGES} activeLanguage="php" />
        <TutorialLayout language={phpLanguage} tutorials={phpTutorials}>
            {children}
        </TutorialLayout>
    </div>
  );
}
