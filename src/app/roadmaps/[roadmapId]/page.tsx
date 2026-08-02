import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import { EditorRoadmapRenderer } from '@/components/EditorRoadmap/EditorRoadmapRenderer';
import { getAllRoadmaps, getRoadmapBySlug } from '@/lib/roadmaps';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Layers, BookMarked, Compass } from 'lucide-react';
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
    title: `${roadmapMeta.title} | Developer Roadmaps`,
    description: roadmapMeta.description,
  };
}

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: 'text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  Intermediate: 'text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-500/10',
  Advanced: 'text-rose-600 dark:text-rose-400 border-rose-500/30 bg-rose-500/10',
};

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

  const difficultyClass = DIFFICULTY_COLORS[roadmapMeta.difficulty] || '';
  const nodeCount = roadmapData?.nodes?.filter((n: any) => n.type === 'topic')?.length || 0;

  return (
    <div className="min-h-screen bg-[#fafaf9] dark:bg-black text-foreground">
      {/* Sleek Header Section */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-[1000px] mx-auto px-4 py-8">
          {/* Back Button */}
          <Link 
            href="/roadmaps" 
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors mb-4 group"
          >
            <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
            Back to Roadmaps
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full border-primary/30 text-primary">
                  <Compass className="w-3 h-3 mr-1 inline" />
                  INTERACTIVE ROADMAP
                </Badge>
                <Badge variant="outline" className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full ${difficultyClass}`}>
                  {roadmapMeta.difficulty}
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground">
                {roadmapMeta.title}
              </h1>
              
              <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                {roadmapMeta.description}
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-3 self-start md:self-center flex-shrink-0 bg-muted/40 p-3 rounded-2xl border border-border/50">
              <div className="flex items-center gap-2 text-xs font-medium">
                <Layers className="h-4 w-4 text-primary" />
                <span>{roadmapMeta.category}</span>
              </div>
              <span className="text-border">|</span>
              <div className="flex items-center gap-1.5 text-xs font-semibold font-mono text-muted-foreground">
                <BookMarked className="h-4 w-4 text-amber-500" />
                <span>{nodeCount} Topics</span>
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
      <main>
        <EditorRoadmapRenderer roadmapId={roadmapId} initialRoadmapData={roadmapData} />
      </main>
    </div>
  );
}