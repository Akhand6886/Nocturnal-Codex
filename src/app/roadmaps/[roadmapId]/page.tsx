
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import { EditorRoadmapRenderer } from '@/components/EditorRoadmap/EditorRoadmapRenderer';
import { getAllRoadmaps, getRoadmapBySlug } from '@/lib/roadmaps';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Layers, BookMarked } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 3600; // Revalidate every hour

// This tells Next.js which roadmap pages to build at build time
export async function generateStaticParams() {
  const roadmaps = getAllRoadmaps();
  return roadmaps.map((roadmap) => ({
    roadmapId: roadmap.slug,
  }));
}

interface RoadmapDetailsPageProps {
  params: Promise<{ roadmapId: string }>;
}

// Function to generate metadata for the page
export async function generateMetadata({ params }: RoadmapDetailsPageProps): Promise<Metadata> {
  const { roadmapId } = await params;
  const roadmapMeta = getRoadmapBySlug(roadmapId);
  
  if (!roadmapMeta) {
    return {
      title: 'Roadmap Not Found',
    };
  }
  return {
    title: `${roadmapMeta.title} | Roadmaps`,
    description: roadmapMeta.description,
  };
}

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: 'text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/5',
  Intermediate: 'text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-500/5',
  Advanced: 'text-rose-600 dark:text-rose-400 border-rose-500/30 bg-rose-500/5',
};

// The main page component
export default async function RoadmapDetailsPage({ params }: RoadmapDetailsPageProps) {
  const { roadmapId } = await params;
  const roadmapMeta = getRoadmapBySlug(roadmapId);

  if (!roadmapMeta) {
    notFound();
  }

  // Read roadmap data on the server side for SSG/SEO and instant client hydration
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
  const nodeCount = roadmapData?.nodes?.length || 0;

  return (
    <div>
      {/* Premium Header */}
      <header className="relative overflow-hidden border-b border-border">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 dark:from-primary/3 dark:to-accent/3" />
        
        <div className="relative container mx-auto px-4 pt-8 pb-10">
          {/* Back Navigation */}
          <Link 
            href="/roadmaps" 
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            All Roadmaps
          </Link>

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-4">
              {roadmapMeta.title}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              {roadmapMeta.description}
            </p>

            {/* Metadata Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Badge variant="secondary" className="text-xs px-3 py-1.5 flex items-center gap-1.5 rounded-lg font-medium">
                <Layers className="h-3.5 w-3.5" />
                {roadmapMeta.category}
              </Badge>
              <Badge variant="outline" className={`text-xs px-3 py-1.5 flex items-center gap-1.5 rounded-lg font-semibold ${difficultyClass}`}>
                {roadmapMeta.difficulty}
              </Badge>
              {nodeCount > 0 && (
                <Badge variant="outline" className="text-xs px-3 py-1.5 flex items-center gap-1.5 rounded-lg font-medium text-muted-foreground">
                  <BookMarked className="h-3.5 w-3.5" />
                  {nodeCount} Topics
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Instruction hint */}
      <div className="container mx-auto px-4">
        <p className="text-xs text-center text-muted-foreground py-3">
          Click any topic node to view resources and details
        </p>
      </div>

      {/* SEO Semantic Content Block - Rendered on the Server at Build Time */}
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

      <EditorRoadmapRenderer roadmapId={roadmapId} initialRoadmapData={roadmapData} />
    </div>
  );
}