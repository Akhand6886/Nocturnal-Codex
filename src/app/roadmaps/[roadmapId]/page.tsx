
import { allRoadmaps } from 'contentlayer/generated';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { EditorRoadmapRenderer } from '@/components/EditorRoadmap/EditorRoadmapRenderer';
import type { Node, Edge } from '@xyflow/react';

// This tells Next.js which roadmap pages to build at build time
export async function generateStaticParams() {
  const roadmaps = allRoadmaps;
  return roadmaps.map((roadmap) => ({
    roadmapId: roadmap.slug,
  }));
}

interface RoadmapDetailsPageProps {
  params: { roadmapId: string };
}

// Function to generate metadata for the page
export async function generateMetadata({ params }: RoadmapDetailsPageProps): Promise<Metadata> {
  const roadmapMeta = allRoadmaps.find((r) => r.slug === params.roadmapId);
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
  const roadmapMeta = allRoadmaps.find((r) => r.slug === params.roadmapId);

  if (!roadmapMeta) {
    notFound();
  }

  // The EditorRoadmapRenderer will now fetch its own data on the client
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
      <EditorRoadmapRenderer roadmapId={params.roadmapId} />
    </div>
  );
}
