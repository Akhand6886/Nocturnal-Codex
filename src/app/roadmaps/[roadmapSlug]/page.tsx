// src/app/roadmaps/[roadmapSlug]/page.tsx
import { notFound } from 'next/navigation';
import { allRoadmapPosts } from 'contentlayer/generated';
import { loadRoadmapBlueprint, loadTopicContent } from '@/lib/roadmap-server-utils';
import { transformToReactFlow } from '@/lib/roadmap-utils';
import { InteractiveRoadmap } from '@/components/roadmap/InteractiveRoadmap';
import { RoadmapHeader } from '@/components/roadmap/RoadmapHeader';
import type { Metadata } from 'next';
import { cache } from 'react';

export const revalidate = 60; // Revalidate every 60 seconds

const getRoadmapData = cache(async (slug: string) => {
    const roadmap = allRoadmapPosts.find((p) => p.slug === slug);
    if (!roadmap) {
        return null;
    }

    // Since this is a Server Component, we can directly fetch and process data here.
    const blueprint = await loadRoadmapBlueprint(slug);
    const topicsContent = await loadTopicContent(slug);

    if (!blueprint || !topicsContent) {
        // Return roadmap data even if interactive parts are missing
        // to allow for static content display.
        return { roadmap, initialNodes: [], initialEdges: [], blueprint: null };
    }
    
    const { nodes, edges } = transformToReactFlow(blueprint, topicsContent);

    return { roadmap, initialNodes: nodes, initialEdges: edges, blueprint };
});

export async function generateStaticParams() {
  const roadmaps = allRoadmapPosts || [];
  return roadmaps.map((roadmap) => ({
    roadmapSlug: roadmap.slug,
  }));
}

export async function generateMetadata({ params }: { params: { roadmapSlug: string } }): Promise<Metadata> {
    const data = await getRoadmapData(params.roadmapSlug);
    if (!data?.roadmap) {
        return { title: 'Roadmap Not Found' };
    }
    const { roadmap } = data;
    const pageTitle = roadmap.title || roadmap.name;

    return {
        title: `${pageTitle} | Interactive Roadmap`,
        description: roadmap.description,
    };
}

export default async function RoadmapPage({ params }: { params: { roadmapSlug: string } }) {
    const roadmapData = await getRoadmapData(params.roadmapSlug);

    if (!roadmapData || !roadmapData.roadmap) {
        notFound();
    }
    
    const { roadmap, initialNodes, initialEdges, blueprint } = roadmapData;

    // The Server Component fetches the data and then passes it to the Client Component.
    return (
        <div className="container mx-auto px-4 py-8">
             <RoadmapHeader roadmapData={roadmap} />
            <InteractiveRoadmap
                initialNodes={initialNodes}
                initialEdges={initialEdges}
                roadmap={roadmap}
                blueprint={blueprint}
            />
        </div>
    );
}
