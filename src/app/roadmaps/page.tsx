
import { RoadmapCard } from '@/components/Roadmaps/RoadmapCard';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { getAllRoadmaps } from '@/lib/roadmaps';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Developer Roadmaps — Nocturnal Codex',
  description: 'Structured learning paths across AI, frontend, backend, DevOps, and more. Follow the main path, open a chapter, and pick up exactly where you are.',
};

export default function RoadmapsPage() {
  const roadmaps = getAllRoadmaps();
  const featuredRoadmaps = roadmaps.filter(r => r.featured);
  const otherRoadmaps = roadmaps.filter(r => !r.featured);
  const totalTopics = roadmaps.reduce((sum, r) => sum + (r.topicCount || 0), 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <header className="max-w-5xl mx-auto px-4 pt-16 pb-6">
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-primary font-bold">
              YOUR LEARNING PATH
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
              Developer Roadmaps
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              One complete roadmap for each domain. Follow the main path, open a chapter, and pick up exactly where you are.
            </p>
            <div className="text-[11px] font-mono text-muted-foreground/60 tracking-wider">
              {roadmaps.length} paths · {totalTopics} topics
            </div>
          </div>
        </div>
      </header>

      {/* Section Divider */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4">
          <div className="flex-1 border-t border-dashed border-border/50" />
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground/40 whitespace-nowrap">
            choose a path
          </span>
          <div className="flex-1 border-t border-dashed border-border/50" />
        </div>
      </div>

      {/* Featured Paths — 2-Column Grid */}
      {featuredRoadmaps.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featuredRoadmaps.map((roadmap) => (
              <RoadmapCard key={roadmap.slug} roadmap={roadmap} featured />
            ))}
          </div>
        </section>
      )}

      {/* Other Paths */}
      {otherRoadmaps.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {otherRoadmaps.map((roadmap) => (
              <RoadmapCard key={roadmap.slug} roadmap={roadmap} />
            ))}
          </div>
        </section>
      )}

      {/* Footer Note */}
      <div className="max-w-5xl mx-auto px-4 pt-4 pb-20">
        <p className="text-sm text-muted-foreground/50 text-center">
          All published topics and resources are included. Each roadmap is a curated sequence — start from the top and work your way down.
        </p>
      </div>

      {/* Empty State */}
      {roadmaps.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">No roadmaps available yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}