
import { allRoadmaps } from 'contentlayer/generated';
import { RoadmapCard } from '@/components/Roadmaps/RoadmapCard';
import { BookMarked } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Developer Roadmaps',
  description: 'Step-by-step guides and paths to learn different tools and technologies.',
};

export default function RoadmapsPage() {
  const roadmaps = allRoadmaps.sort((a, b) => a.order - b.order);

  return (
    <div className="container mx-auto px-4 py-10 md:py-12">
      <header className="pb-6 border-b border-border">
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center text-foreground">
          <BookMarked className="mr-4 h-10 w-10 text-primary" />
          Developer Roadmaps
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Step-by-step guides and paths to learn different tools and technologies.
          For a more detailed and interactive experience, visit{' '}
          <a href="https://roadmap.sh" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
            roadmap.sh
          </a>.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {roadmaps.map((roadmap) => (
          <RoadmapCard key={roadmap.slug} roadmap={roadmap} />
        ))}
      </div>
    </div>
  );
}
