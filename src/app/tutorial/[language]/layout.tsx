// src/app/tutorial/[language]/layout.tsx
import { allTutorialPosts } from 'contentlayer/generated';
import { TutorialSidebar } from '@/components/layout/tutorial-sidebar';

export default function TutorialLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { language: string };
}) {
  const tutorialsForLanguage = allTutorialPosts
    .filter((post) => post.language === params.language)
    .sort((a, b) => a.order - b.order);

  const groupedTutorials = tutorialsForLanguage.reduce((acc, tutorial) => {
    const category = tutorial.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tutorial);
    return acc;
  }, {} as Record<string, typeof tutorialsForLanguage>);


  return (
    <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-64 lg:w-72 flex-shrink-0 md:py-6 md:pl-2">
                <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
                    <TutorialSidebar groupedTutorials={groupedTutorials} />
                </div>
            </aside>
            <main className="flex-grow min-w-0 md:pr-8">
                {children}
            </main>
        </div>
    </div>
  );
}
