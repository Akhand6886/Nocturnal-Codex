
import Link from 'next/link';
import Image from 'next/image';
import { allTutorialPosts } from 'contentlayer/generated';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Python Tutorials | Nocturnal Codex',
  description: 'Learn Python programming with our collection of tutorials, from basics to advanced topics.',
};

export default function PythonLanguagePage() {
  const pythonTutorials = allTutorialPosts
    .filter((post) => post.language === 'python')
    .sort((a, b) => a.order - b.order);

  const groupedTutorials = pythonTutorials.reduce((acc, tutorial) => {
    const category = tutorial.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tutorial);
    return acc;
  }, {} as Record<string, typeof pythonTutorials>);

  return (
    <div className="container mx-auto px-4 py-10 md:py-12">
      <header className="flex flex-col md:flex-row items-center gap-8 pb-8 border-b border-border">
        <Image
          src="https://cdn.simpleicons.org/python/3776AB"
          alt="Python Logo"
          width={100}
          height={100}
          className="rounded-lg"
        />
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Python Tutorials
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            A curated list of Python tutorials to guide you from beginner to advanced concepts in Python programming.
          </p>
        </div>
      </header>

      <div className="mt-12 space-y-12">
        {Object.entries(groupedTutorials).map(([category, tutorials]) => (
          <section key={category}>
            <h2 className="text-2xl font-semibold mb-6 pb-3 border-b border-border/70 text-foreground/90">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tutorials.map((tutorial) => (
                <Link href={tutorial.url} key={tutorial.slug} className="group block">
                  <Card className="h-full overflow-hidden shadow-lg hover:shadow-primary/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1.5 bg-card border border-border/50 hover:border-primary/60 rounded-xl">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold group-hover:text-primary">
                        {tutorial.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm text-muted-foreground mb-4">
                        {tutorial.description}
                      </CardDescription>
                      <div className="flex items-center text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out font-medium">
                        Start Learning <ArrowRight className="ml-1.5 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
