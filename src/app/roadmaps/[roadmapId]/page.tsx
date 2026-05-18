
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
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

    