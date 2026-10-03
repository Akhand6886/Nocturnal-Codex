import type { Metadata } from 'next';
import { getAllRoadmaps } from '@/lib/roadmaps';
import { RoadmapsDirectoryView } from '@/components/Roadmaps/RoadmapsDirectoryView';

export const metadata: Metadata = {
  title: 'Developer Roadmaps — Nocturnal Codex',
  description: 'Structured learning paths across AI, frontend, backend, DevOps, and more. Follow the main path, open a chapter, and pick up exactly where you are.',
};

export default function RoadmapsPage() {
  const roadmaps = getAllRoadmaps();
  const totalTopics = roadmaps.reduce((sum, r) => sum + (r.topicCount || 0), 0);
  const totalChapters = roadmaps.reduce((sum, r) => sum + (r.chapterCount || 0), 0);

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
              Curated, battle-tested learning paths for modern software engineering and systems architecture. Select a domain, progress through sequential chapters, and mark off topics as you master them.
            </p>
            <div className="text-[11px] font-mono text-muted-foreground/70 tracking-wider">
              {roadmaps.length} paths · {totalChapters} chapters · {totalTopics} topics
            </div>
          </div>
        </div>
      </header>

      {/* Section Divider */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 border-t border-dashed border-border/50" />
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground/40 whitespace-nowrap">
            choose a path
          </span>
          <div className="flex-1 border-t border-dashed border-border/50" />
        </div>
      </div>

      {/* Interactive Directory View */}
      <RoadmapsDirectoryView roadmaps={roadmaps} />

      {/* Footer Note */}
      <div className="max-w-5xl mx-auto px-4 pt-4 pb-20">
        <p className="text-xs font-mono text-muted-foreground/50 text-center tracking-wide">
          All curriculum topics include code snippets, prerequisites, and Nocturnal Codex in-house language folios.
        </p>
      </div>
    </div>
  );
}