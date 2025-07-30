
import { TutorialLayout } from '@/components/layout/tutorial-layout';
import type { PropsWithChildren } from 'react';
import { allTutorialPosts } from 'contentlayer/generated';
import { MOCK_PROGRAMMING_LANGUAGES } from '@/lib/data';
import { notFound } from 'next/navigation';
import { LanguageScroller } from '@/components/layout/language-scroller';

export default function SqlTutorialsPageLayout({ children }: PropsWithChildren) {
  const sqlTutorials = allTutorialPosts
    .filter(p => p.language === 'sql')
    .sort((a, b) => a.order - b.order);

  const sqlLanguage = MOCK_PROGRAMMING_LANGUAGES.find(lang => lang.slug === 'sql');
  
  if (!sqlLanguage) {
      notFound();
  }

  return (
    <div>
        <LanguageScroller languages={MOCK_PROGRAMMING_LANGUAGES} activeLanguage="sql" />
        <TutorialLayout language={sqlLanguage} tutorials={sqlTutorials}>
            {children}
        </TutorialLayout>
    </div>
  );
}
