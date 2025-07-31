// src/app/tutorial/[language]/layout.tsx
import { allTutorialPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { TutorialSidebar } from '@/components/layout/tutorial-sidebar';
import { LanguageScroller } from '@/components/layout/language-scroller';

export default function TutorialLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { language: string };
}) {
  const tutorialsForLanguage = allTutorialPosts.filter(
    (post) => post.language === params.language
  );

  if (tutorialsForLanguage.length === 0) {
    // Or handle this case as you see fit
    // notFound(); 
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="py-6">
        <LanguageScroller activeLanguage={params.language} />
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <TutorialSidebar tutorials={tutorialsForLanguage} language={params.language} />
        <main className="flex-grow min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
