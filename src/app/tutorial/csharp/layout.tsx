
import { TutorialLayout } from '@/components/layout/tutorial-layout';
import type { PropsWithChildren } from 'react';
import { allTutorialPosts } from 'contentlayer/generated';
import { MOCK_PROGRAMMING_LANGUAGES } from '@/lib/data';
import { notFound } from 'next/navigation';
import { LanguageScroller } from '@/components/layout/language-scroller';

export default function CsharpTutorialsPageLayout({ children }: PropsWithChildren) {
  const csharpTutorials = allTutorialPosts
    .filter(p => p.language === 'csharp')
    .sort((a, b) => a.order - b.order);

  const csharpLanguage = MOCK_PROGRAMMING_LANGUAGES.find(lang => lang.slug === 'csharp');
  
  if (!csharpLanguage) {
      notFound();
  }

  return (
    <div>
        <LanguageScroller languages={MOCK_PROGRAMMING_LANGUAGES} activeLanguage="csharp" />
        <TutorialLayout language={csharpLanguage} tutorials={csharpTutorials}>
            {children}
        </TutorialLayout>
    </div>
  );
}
