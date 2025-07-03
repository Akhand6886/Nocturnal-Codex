
import { TutorialLayout } from '@/components/layout/tutorial-layout';
import type { PropsWithChildren } from 'react';
import { allTutorialPosts } from 'contentlayer/generated';

export default function PythonTutorialsPageLayout({ children }: PropsWithChildren) {
  const pythonTutorials = allTutorialPosts
    .filter(p => p.language === 'python')
    .sort((a, b) => a.order - b.order);

  return (
    <TutorialLayout title="Python Tutorials" tutorials={pythonTutorials}>
      {children}
    </TutorialLayout>
  );
}
