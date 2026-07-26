
import { RoadmapCard } from '@/components/Roadmaps/RoadmapCard';
import { BookMarked, Compass, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';
import { getAllRoadmaps } from '@/lib/roadmaps';

export const metadata: Metadata = {
  title: 'Developer Roadmaps',
  description: 'Step-by-step guides and paths to learn different tools and technologies.',
};

export default function RoadmapsPage() {
  const roadmaps = getAllRoadmaps();
  const featuredRoadmaps = roadmaps.filter(r => r.featured);
  const otherRoadmaps = roadmaps.filter(r => !r.featured);

  return (
    <div className="container mx-auto px-4 py-10 md:py-16">
      {/* Hero Header */}
      <header className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 border border-primary/20">
          <Compass className="h-4 w-4" />
          Interactive Learning Paths
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
          Developer Roadmaps
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Curated step-by-step guides to navigate the vast landscape of software development.
          Click any topic on a roadmap to explore resources.
        </p>
      </header>

      {/* Featured Roadmaps */}
      {featuredRoadmaps.length > 0 && (
        <section className="mb-14">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            Featured Paths
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRoadmaps.map((roadmap) => (
              <RoadmapCard key={roadmap.slug} roadmap={roadmap} featured />
            ))}
          </div>
        </section>
      )}

      {/* All Other Roadmaps */}
      {otherRoadmaps.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <BookMarked className="h-5 w-5 text-primary" />
            All Roadmaps
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {otherRoadmaps.map((roadmap) => (
              <RoadmapCard key={roadmap.slug} roadmap={roadmap} />
            ))}
          </div>
        </section>
      )}

      {/* If no featured/other split, show all */}
      {featuredRoadmaps.length === 0 && otherRoadmaps.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">No roadmaps available yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}