import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { EditorRoadmapRenderer } from '@/components/EditorRoadmap/EditorRoadmapRenderer';
import type { Node, Edge } from '@xyflow/react';
import path from 'path';
import { promises as fs } from 'fs';

export const revalidate = 3600; // Revalidate every hour

// This tells Next.js which roadmap pages to build at build time
export async function generateStaticParams() {
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

interface RoadmapMeta {
    title: string;
    description: string;
}

// Faking roadmap metadata since contentlayer is gone
const getRoadmapMeta = (slug: string): RoadmapMeta | null => {
    const titles: { [key: string]: string } = {
        'backend': "Backend Roadmap",
        'frontend': "Frontend Roadmap",
        'devops': "DevOps Roadmap",
        'full-stack': "Full Stack Roadmap",
        'machine-learning': "Machine Learning Roadmap",
        'cybersecurity': "Cybersecurity Roadmap",
    };
    const descriptions: { [key: string]: string } = {
        'backend': "Step-by-step guide to becoming a modern backend developer.",
        'frontend': "Step-by-step guide to becoming a modern frontend developer.",
        'devops': "Step-by-step guide to becoming a DevOps engineer.",
        'full-stack': "Step-by-step guide to becoming a full stack developer.",
        'machine-learning': "Step-by-step guide to becoming a Machine Learning engineer.",
        'cybersecurity': "Step-by-step guide to becoming a cybersecurity expert.",
    };

    if (titles[slug]) {
        return {
            title: titles[slug],
            description: descriptions[slug]
        }
    }
    return null;
}

async function getRoadmapData(roadmapId: string): Promise<RoadmapData | null> {
  // Construct the path to the JSON file within the public directory
  const jsonPath = path.join(process.cwd(), 'public', 'roadmap-content', `${roadmapId}.json`);
  
  try {
    const fileContents = await fs.readFile(jsonPath, 'utf-8');
    if (!fileContents) {
        return null;
    }
    const data = JSON.parse(fileContents);
    return data;
  } catch (error) {
    console.error(`Failed to read or parse roadmap data for ${roadmapId}:`, error);
    return null;
  }
}

// Updated interface - params is now a Promise
interface RoadmapDetailsPageProps {
  params: Promise<{ roadmapId: string }>;
}

// Function to generate metadata for the page - await params
export async function generateMetadata({ params }: RoadmapDetailsPageProps): Promise<Metadata> {
  const { roadmapId } = await params;  // Await params here
  const roadmapMeta = getRoadmapMeta(roadmapId);
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

// The main page component - await params
export default async function RoadmapDetailsPage({ params }: RoadmapDetailsPageProps) {
  const { roadmapId } = await params;  // Await params here
  const roadmapData = await getRoadmapData(roadmapId);
  const roadmapMeta = getRoadmapMeta(roadmapId);

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
      <EditorRoadmapRenderer roadmapId={roadmapId} />
    </div>
  );
}
