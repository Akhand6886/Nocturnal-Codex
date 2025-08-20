
import { allTutorialPosts } from 'contentlayer/generated';
import { TutorialSidebar } from '@/components/layout/tutorial-sidebar';
import { LanguageScroller } from '@/components/layout/language-scroller';

export default function PythonTutorialLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { language: string };
}) {
  const tutorialsForLanguage = allTutorialPosts
    .filter((post) => post.language === 'python')
    .sort((a, b) => a.order - b.order);

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
