
// src/app/languages/javascript/page.tsx
import { allTutorialPosts } from 'contentlayer/generated';
import { TutorialCard } from '@/components/content/tutorial-card';
import { Code2 } from 'lucide-react';

export const revalidate = 60;

export default function JavascriptLanguagePage() {
  const javascriptTutorials = allTutorialPosts
    .filter((post) => post.language === 'javascript')
    .sort((a, b) => a.order - b.order);

  return (
    <div className="container mx-auto px-4 py-10 md:py-12">
      <header className="pb-6 border-b border-border">
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center text-foreground">
          <Code2 className="mr-4 h-10 w-10 text-primary" />
          JavaScript Tutorials
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Master the language of the web with our collection of JavaScript tutorials.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {javascriptTutorials.map((tutorial) => (
          <TutorialCard key={tutorial.slug} tutorial={tutorial} />
        ))}
        {javascriptTutorials.length === 0 && (
            <p className="text-muted-foreground col-span-full text-center">No tutorials available for JavaScript yet. Please check back soon.</p>
        )}
      </div>
    </div>
  );
}

export const metadata = {
    title: "JavaScript Tutorials | Nocturnal Codex",
    description: "Learn JavaScript from scratch with our comprehensive tutorials covering everything from the basics to advanced topics.",
};
