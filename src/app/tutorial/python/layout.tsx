
import { TutorialLayout } from '@/components/layout/tutorial-layout';
import type { PropsWithChildren } from 'react';

export default function PythonTutorialsPageLayout({ children }: PropsWithChildren) {
  return <TutorialLayout>{children}</TutorialLayout>;
}
