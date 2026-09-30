import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import { EditorRoadmapRenderer } from '@/components/EditorRoadmap/EditorRoadmapRenderer';
import { getAllRoadmaps, getRoadmapBySlug } from '@/lib/roadmaps';
import { ArrowLeft, BookOpen, Layers } from 'lucide-react';
import Link from 'next/link';

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
    title: `${roadmapMeta.title} — Syllabus | Nocturnal Codex`,
    description: roadmapMeta.description,
  };
}

export default async function RoadmapDetailsPage({ params }: RoadmapDetailsPageProps) {
  const { roadmapId } = await params;
  const roadmapMeta = getRoadmapBySlug(roadmapId);

  if (!roadmapMeta) {
    notFound();
  }

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

  const nodeCount = roadmapData?.nodes?.filter((n: any) => n.type === 'topic')?.length || 0;

  return (
    <div className="min-h-screen bg-[#fafaf9] dark:bg-black text-foreground transition-colors duration-300">
      {/* Editorial Codex Manuscript Header */}
      <header className="relative border-b border-border/50 bg-card/25 dark:bg-card/15 backdrop-blur-xl pt-8 pb-10">
        {/* Subtle engineering blueprint / parchment pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#00000004_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="max-w-[1100px] mx-auto px-4 relative z-10">
          {/* Top Breadcrumb & Folio Tracker */}
          <div className="flex items-center justify-between text-xs font-mono tracking-wider text-muted-foreground/75 mb-6 pb-3 border-b border-border/40">
            <Link 
              href="/roadmaps" 
              className="inline-flex items-center gap-2 hover:text-primary transition-colors group font-sans font-medium"
            >
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Curricula & Syllabi</span>
            </Link>

            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground/60 hidden sm:inline">
              Tractate &bull; {roadmapMeta.category}
            </span>
          </div>

          {/* Main Title Section */}
          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-primary font-bold">
              <span>CODEX CURRICULUM</span>
              <span className="text-muted-foreground/40">&bull;</span>
              <span className="text-foreground/80 font-normal">LEVEL: {roadmapMeta.difficulty}</span>
              <span className="text-muted-foreground/40">&bull;</span>
              <span className="text-foreground/80 font-normal">{nodeCount} CONCEPTS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-foreground leading-[1.12]">
              {roadmapMeta.title}
            </h1>

            {/* Editorial Thesis / Abstract Quote */}
            <div className="relative pl-5 border-l-2 border-primary/50 my-5">
              <p className="font-serif italic text-base sm:text-lg text-foreground/85 leading-relaxed">
                &ldquo;{roadmapMeta.description}&rdquo;
              </p>
            </div>

            {/* Academic Meta Tags */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-muted-foreground">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/60 border border-border/60">
                <Layers className="h-3.5 w-3.5 text-primary" />
                <span>Domain: {roadmapMeta.category}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/60 border border-border/60">
                <BookOpen className="h-3.5 w-3.5 text-accent" />
                <span>Format: Interactive Conceptual Flow</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* SEO Semantic Content Block */}
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

      {/* Main Interactive Flow Graph */}
      <main className="py-4">
        <EditorRoadmapRenderer roadmapId={roadmapId} initialRoadmapData={roadmapData} />
      </main>
    </div>
  );
}