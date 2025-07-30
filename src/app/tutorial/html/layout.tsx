
import { TutorialLayout } from '@/components/layout/tutorial-layout';
import type { PropsWithChildren } from 'react';
import { allTutorialPosts } from 'contentlayer/generated';
import { MOCK_PROGRAMMING_LANGUAGES } from '@/lib/data';
import { notFound } from 'next/navigation';
import { LanguageScroller } from '@/components/layout/language-scroller';

export default function HtmlTutorialsPageLayout({ children }: PropsWithChildren) {
  const htmlTutorials = allTutorialPosts
    .filter(p => p.language === 'html')
    .sort((a, b) => a.order - b.order);

  const htmlLanguage = MOCK_PROGRAMMING_LANGUAGES.find(lang => lang.slug === 'html');
  
  if (!htmlLanguage) {
      notFound();
  }

  return (
    <div>
        <LanguageScroller languages={MOCK_PROGRAMMING_LANGUAGES} activeLanguage="html" />
        <TutorialLayout language={htmlLanguage} tutorials={htmlTutorials}>
            {children}
        </TutorialLayout>
    </div>
  );
}
