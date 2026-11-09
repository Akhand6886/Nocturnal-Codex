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
      <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-8 border-b border-[#272727]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-[#E5A93C] uppercase">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E5A93C]" />
              CURRICULUM ARCHIVE // INDEX 01
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.15]">
              Developer Roadmaps
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Curated sequential mastery curricula across software engineering, systems design, and applied intelligence. Follow the structured progression or jump into specific topics.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground border border-[#272727] bg-[#181818] px-4 py-2 rounded-lg">
            <span><strong className="text-foreground">{roadmaps.length}</strong> paths</span>
            <span className="text-[#383838]">|</span>
            <span><strong className="text-foreground">{totalChapters}</strong> chapters</span>
            <span className="text-[#383838]">|</span>
            <span><strong className="text-foreground">{totalTopics}</strong> topics</span>
          </div>
        </div>
      </header>

      {/* Interactive Directory View */}
      <div className="pt-8">
        <RoadmapsDirectoryView roadmaps={roadmaps} />
      </div>

      {/* Archival Footnote */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-20 border-t border-[#272727] mt-12">
        <p className="text-xs font-mono text-muted-foreground/60 text-center tracking-wide">
          All curriculum nodes integrate interactive topic drawers, official documentation references, and in-house language guides.
        </p>
      </div>
    </div>
  );
}