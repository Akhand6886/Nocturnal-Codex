
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { EditorRoadmapRenderer } from '@/components/EditorRoadmap/EditorRoadmapRenderer';
import { getAllRoadmaps, getRoadmapBySlug } from '@/lib/roadmaps';

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

// The main page component
export default async function RoadmapDetailsPage({ params }: RoadmapDetailsPageProps) {
  const { roadmapId } = await params;
  const roadmapMeta = getRoadmapBySlug(roadmapId);

  // The roadmap *data* (nodes/edges) is fetched on the client by the renderer
  // But we need the *metadata* to exist to render the page header.
  if (!roadmapMeta) {
    notFound();
  }

  return (
    <div>
      <header className="pb-6 pt-10 border-b border-border text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-4">
          {roadmapMeta.title}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          {roadmapMeta.description}
        </p>
      </header>
      <EditorRoadmapRenderer roadmapId={roadmapId} />
    </div>
  );
}

    