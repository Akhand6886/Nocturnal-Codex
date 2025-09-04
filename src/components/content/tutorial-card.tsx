// src/components/content/tutorial-card.tsx
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { TutorialPost } from 'contentlayer/generated';
import { ArrowRight } from 'lucide-react';

interface TutorialCardProps {
  tutorial: TutorialPost;
}

export function TutorialCard({ tutorial }: TutorialCardProps) {
  return (
    <Link href={tutorial.url} className="group block h-full">
      <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-primary/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1.5 bg-card border border-border/50 hover:border-primary/60 rounded-xl">
        <CardHeader className="flex-grow">
          <CardTitle className="text-xl font-semibold group-hover:text-primary">{tutorial.title}</CardTitle>
          {tutorial.description && (
            <CardDescription className="pt-2">{tutorial.description}</CardDescription>
          )}
        </CardHeader>
        <div className="p-6 pt-0">
            <div className="flex items-center text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out font-medium">
                Read Tutorial <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
        </div>
      </Card>
    </Link>
  );
}
