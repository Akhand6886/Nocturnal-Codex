// src/app/tutorial/javascript/page.tsx
import { allTutorialPosts } from 'contentlayer/generated';
import { TutorialCard } from '@/components/content/tutorial-card';
import { Code2 } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const revalidate = 60;

export default function JavascriptTutorialsPage() {
  const javascriptTutorials = allTutorialPosts
    .filter((post) => post.language === 'javascript')
    .sort((a, b) => a.order - b.order);

  // Redirect to the first tutorial if it exists
  if (javascriptTutorials.length > 0) {
    redirect(javascriptTutorials[0].url);
  }

  // Fallback content if there are no tutorials
  return (
    <div className="container mx-auto px-4 py-10 md:py-12">
      <header className="pb-6 border-b border-border">
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center text-foreground">
          <Code2 className="mr-4 h-10 w-10 text-primary" />
          JavaScript Tutorials
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          No tutorials found for JavaScript at the moment. Please check back soon.
        </p>
      </header>
    </div>
  );
}

export const metadata = {
  title: "JavaScript Tutorials | Nocturnal Codex",
  description: "Browse all JavaScript tutorials available on Nocturnal Codex.",
};
