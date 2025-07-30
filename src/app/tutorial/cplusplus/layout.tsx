
import { TutorialLayout } from '@/components/layout/tutorial-layout';
import type { PropsWithChildren } from 'react';
import { allTutorialPosts } from 'contentlayer/generated';
import { MOCK_PROGRAMMING_LANGUAGES } from '@/lib/data';
import { notFound } from 'next/navigation';
import { LanguageScroller } from '@/components/layout/language-scroller';

export default function CplusplusTutorialsPageLayout({ children }: PropsWithChildren) {
  const cplusplusTutorials = allTutorialPosts
    .filter(p => p.language === 'cplusplus')
    .sort((a, b) => a.order - b.order);

  const cplusplusLanguage = MOCK_PROGRAMMING_LANGUAGES.find(lang => lang.slug === 'cplusplus');
  
  if (!cplusplusLanguage) {
      notFound();
  }

  return (
    <div>
        <LanguageScroller languages={MOCK_PROGRAMMING_LANGUAGES} activeLanguage="cplusplus" />
        <TutorialLayout language={cplusplusLanguage} tutorials={cplusplusTutorials}>
            {children}
        </TutorialLayout>
    </div>
  );
}
