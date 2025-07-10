
import { TutorialLayout } from '@/components/layout/tutorial-layout';
import type { PropsWithChildren } from 'react';
import { allTutorialPosts } from 'contentlayer/generated';
import { MOCK_PROGRAMMING_LANGUAGES } from '@/lib/data';
import { notFound } from 'next/navigation';

export default function PythonTutorialsPageLayout({ children }: PropsWithChildren) {
  const pythonTutorials = allTutorialPosts
    .filter(p => p.language === 'python')
    .sort((a, b) => a.order - b.order);

  const pythonLanguage = MOCK_PROGRAMMING_LANGUAGES.find(lang => lang.slug === 'python');
  
  if (!pythonLanguage) {
      notFound();
  }

  return (
    <TutorialLayout language={pythonLanguage} tutorials={pythonTutorials}>
      {children}
    </TutorialLayout>
  );
}
