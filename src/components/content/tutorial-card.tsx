// src/components/content/tutorial-card.tsx
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { TutorialPost } from 'contentlayer/generated';

interface TutorialCardProps {
  tutorial: TutorialPost;
}

export function TutorialCard({ tutorial }: TutorialCardProps) {
  return (
    <Link href={tutorial.url} className="group block">
      <Card className="h-full overflow-hidden shadow-lg hover:shadow-primary/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1.5 bg-card border border-border/50 hover:border-primary/60 rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold group-hover:text-primary">{tutorial.title}</CardTitle>
          {tutorial.description && (
            <CardDescription>{tutorial.description}</CardDescription>
          )}
        </CardHeader>
      </Card>
    </Link>
  );
}
