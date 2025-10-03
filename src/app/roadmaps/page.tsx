
import { RoadmapCard } from '@/components/Roadmaps/RoadmapCard';
import { BookMarked } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Developer Roadmaps',
  description: 'Step-by-step guides and paths to learn different tools and technologies.',
};

// Placeholder since contentlayer was removed
const allRoadmaps = [
    { order: 1, url: '/roadmaps/backend', slug: 'backend', title: 'Backend Roadmap', category: 'Core', difficulty: 'Beginner', featured: true },
    { order: 2, url: '/roadmaps/frontend', slug: 'frontend', title: 'Frontend Roadmap', category: 'Core', difficulty: 'Beginner', featured: true },
    { order: 3, url: '/roadmaps/machine-learning', slug: 'machine-learning', title: 'Machine Learning Roadmap', category: 'Specialized', difficulty: 'Intermediate', featured: false },
    { order: 4, url: '/roadmaps/cybersecurity', slug: 'cybersecurity', title: 'Cybersecurity Roadmap', category: 'Specialized', difficulty: 'Intermediate', featured: false },
    { order: 5, url: '/roadmaps/devops', slug: 'devops', title: 'DevOps Roadmap', category: 'Core', difficulty: 'Intermediate', featured: false },
    { order: 6, url: '/roadmaps/full-stack', slug: 'full-stack', title: 'Full Stack Roadmap', category: 'Core', difficulty: 'Advanced', featured: false },
];

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
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-10">
        {roadmaps.map((roadmap) => (
          <RoadmapCard key={roadmap.slug} roadmap={roadmap} />
        ))}
      </div>
    </div>
  );
}
