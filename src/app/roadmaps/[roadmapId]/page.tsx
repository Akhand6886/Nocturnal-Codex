import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import { getAllRoadmaps, getRoadmapBySlug, parseRoadmapChapters } from '@/lib/roadmaps';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { RoadmapTimelineView } from '@/components/Roadmaps/RoadmapTimelineView';

export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  const roadmaps = getAllRoadmaps();
  return roadmaps.map((roadmap) => ({
    roadmapId: roadmap.slug,
  }));
}

interface RoadmapDetailsPageProps {
  params: Promise<{ roadmapId: string }>;
}

export async function generateMetadata({ params }: RoadmapDetailsPageProps): Promise<Metadata> {
  const { roadmapId } = await params;
  const roadmapMeta = getRoadmapBySlug(roadmapId);
  
  if (!roadmapMeta) {
    return {
      title: 'Roadmap Not Found',
    };
  }
  return {
    title: `${roadmapMeta.title} — Nocturnal Codex`,
    description: roadmapMeta.description,
  };
}

export default async function RoadmapDetailsPage({ params }: RoadmapDetailsPageProps) {
  const { roadmapId } = await params;
  const roadmapMeta = getRoadmapBySlug(roadmapId);

  if (!roadmapMeta) {
    notFound();
  }

  // Read roadmap JSON data
  let roadmapData = null;
  try {
    const filePath = path.join(process.cwd(), 'public', 'roadmap-content', `${roadmapId}.json`);
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      roadmapData = JSON.parse(fileContents);
    }
  } catch (e) {
    console.error(`Error reading roadmap file for ${roadmapId}:`, e);
  }

  // Parse into chapters with domain-specific curriculum
  const chapters = roadmapData ? parseRoadmapChapters(roadmapData, roadmapId) : [];
  const totalTopics = chapters.reduce((sum, c) => sum + c.topics.length, 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Header */}
      <header className="max-w-4xl mx-auto px-4 pt-10 pb-2">
        {/* Back Link */}
        <Link
          href="/roadmaps"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          All roadmaps
        </Link>

        <div className="flex items-start justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            {/* Eyebrow & Badges */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-primary font-bold">
                YOUR LEARNING PATH
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-border bg-card/60 text-muted-foreground">
                {roadmapMeta.difficulty}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-border bg-card/60 text-muted-foreground">
                {roadmapMeta.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
              {roadmapMeta.title.replace(' Roadmap', '')}
            </h1>

            {/* Description */}
            <p className="text-base text-muted-foreground leading-relaxed">
              {roadmapMeta.description}
            </p>

            {/* Meta Stats */}
            <div className="text-[11px] font-mono text-muted-foreground/60 tracking-wider">
              {chapters.length} {chapters.length === 1 ? 'chapter' : 'chapters'} · {totalTopics} topics
            </div>
          </div>
        </div>
      </header>

      {/* SEO Semantic Content Block (hidden, for crawlers) */}
      {roadmapData && roadmapData.nodes && (
        <div className="sr-only">
          <h2>Curriculum Topics for {roadmapMeta.title}</h2>
          {roadmapData.nodes.map((node: any) => {
            const label = node.data?.label;
            const description = node.data?.description;
            const resources = node.data?.resources;
            if (!label) return null;

            return (
              <article key={node.id}>
                <h3>{label}</h3>
                {description && <p>{description}</p>}
                {resources && Array.isArray(resources) && resources.length > 0 && (
                  <ul>
                    {resources.map((res: any, idx: number) => (
                      <li key={idx}>
                        <a href={res.url}>{res.title}</a> {res.type ? `(${res.type})` : ''}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}
        </div>
      )}

      {/* Timeline View (Client Component) */}
      {chapters.length > 0 ? (
        <RoadmapTimelineView
          chapters={chapters}
          roadmapTitle={roadmapMeta.title}
          roadmapSlug={roadmapId}
        />
      ) : (
        <div className="max-w-5xl mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground text-lg">
            No curriculum data available for this roadmap yet.
          </p>
        </div>
      )}
    </div>
  );
}