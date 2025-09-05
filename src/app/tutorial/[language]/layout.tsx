
// src/app/tutorial/[language]/layout.tsx
import { TutorialSidebar } from '@/components/layout/tutorial-sidebar';
import { allTutorialPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';

export const revalidate = 60;

interface TutorialLanguageLayoutProps {
  children: React.ReactNode;
  params: {
    language: string;
  };
}

export default function TutorialLanguageLayout({ children, params }: TutorialLanguageLayoutProps) {
  const tutorialsForLanguage = allTutorialPosts
    .filter((p) => p.language === params.language)
    .sort((a, b) => a.order - b.order);

  if (tutorialsForLanguage.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto flex items-start gap-12 px-4 py-8">
      <TutorialSidebar tutorials={tutorialsForLanguage} currentLanguage={params.language} />
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
