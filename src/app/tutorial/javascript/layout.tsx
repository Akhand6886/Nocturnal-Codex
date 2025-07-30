
import { TutorialLayout } from '@/components/layout/tutorial-layout';
import type { PropsWithChildren } from 'react';
import { allTutorialPosts } from 'contentlayer/generated';
import { MOCK_PROGRAMMING_LANGUAGES } from '@/lib/data';
import { notFound } from 'next/navigation';
import { LanguageScroller } from '@/components/layout/language-scroller';

export default function JavascriptTutorialsPageLayout({ children }: PropsWithChildren) {
  const javascriptTutorials = allTutorialPosts
    .filter(p => p.language === 'javascript')
    .sort((a, b) => a.order - b.order);

  const javascriptLanguage = MOCK_PROGRAMMING_LANGUAGES.find(lang => lang.slug === 'javascript');
  
  if (!javascriptLanguage) {
      notFound();
  }

  return (
    <div>
        <LanguageScroller languages={MOCK_PROGRAMMING_LANGUAGES} activeLanguage="javascript" />
        <TutorialLayout language={javascriptLanguage} tutorials={javascriptTutorials}>
            {children}
        </TutorialLayout>
    </div>
  );
}
