
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { EditorRoadmapRenderer } from '@/components/EditorRoadmap/EditorRoadmapRenderer';
import type { Node, Edge } from '@xyflow/react';
import { allRoadmaps } from 'contentlayer/generated';

export const revalidate = 3600; // Revalidate every hour

// This tells Next.js which roadmap pages to build at build time
export async function generateStaticParams() {
  // Since we are fetching JSON files, we manually define the slugs.
  // This should match the filenames in `public/roadmap-content/`.
  const roadmapSlugs = [
    'backend',
    'frontend',
    'devops',
    'full-stack',
    'machine-learning',
    'cybersecurity',
  ];

  return roadmapSlugs.map((slug) => ({
    roadmapId: slug,
  }));
}

interface RoadmapData {
  nodes: Node[];
  edges: Edge[];
}

async function getRoadmapData(roadmapId: string): Promise<RoadmapData | null> {
  // Because this is a server component, we can fetch directly from the public folder.
  // The URL needs to be absolute for the fetch to work on the server.
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const url = `${baseUrl}/roadmap-content/${roadmapId}.json`;
  
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } }); // Cache for an hour
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    console.error(`Failed to fetch roadmap data for ${roadmapId}:`, error);
    return null;
  }
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
  const roadmapData = await getRoadmapData(params.roadmapId);
  const roadmapMeta = allRoadmaps.find((r) => r.slug === params.roadmapId);

  if (!roadmapMeta || !roadmapData) {
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
      <EditorRoadmapRenderer roadmapId={params.roadmapId} roadmapData={roadmapData} />
    </div>
  );
}
