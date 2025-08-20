
import { allTutorialPosts } from 'contentlayer/generated';
import { TutorialCard } from '@/components/content/tutorial-card';
import { Code2 } from 'lucide-react';

export const revalidate = 60;

export default function JavaLanguagePage() {
  const javaTutorials = allTutorialPosts
    .filter((post) => post.language === 'java')
    .sort((a, b) => a.order - b.order);

  return (
    <div className="container mx-auto px-4 py-10 md:py-12">
      <header className="pb-6 border-b border-border">
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center text-foreground">
          <Code2 className="mr-4 h-10 w-10 text-primary" />
          Java Tutorials
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Explore our collection of tutorials for Java, from beginner to advanced topics.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {javaTutorials.map((tutorial) => (
          <TutorialCard key={tutorial.slug} tutorial={tutorial} />
        ))}
      </div>
    </div>
  );
}

export const metadata = {
  title: "Java Tutorials | Nocturnal Codex",
  description: "Browse all Java tutorials available on Nocturnal Codex.",
};
