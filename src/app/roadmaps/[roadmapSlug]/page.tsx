
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

    const blueprint = await loadRoadmapBlueprint(slug);
    if (!blueprint) {
        return { roadmap, initialNodes: [], initialEdges: [], blueprint: null };
    }

    const topicsContent = await loadTopicContent(slug);

    if (!topicsContent) {
        // If topics are missing, we can still show the graph shape from the blueprint
        const { nodes, edges } = transformToReactFlow(blueprint, null);
        return { roadmap, initialNodes: nodes, initialEdges: edges, blueprint };
    }
    
    const { nodes, edges } = transformToReactFlow(blueprint, topicsContent);

    return { roadmap, initialNodes: nodes, initialEdges: edges, blueprint };
});

export async function generateStaticParams() {
  const roadmaps = allRoadmapPosts || [];
  // Corrected to use `id` for slug generation, which matches the file names `backend.json`, etc.
  return roadmaps.map((roadmap) => ({
    roadmapSlug: roadmap.id,
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

    // If there are no nodes after processing, show a WIP message.
    if (!initialNodes || initialNodes.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <RoadmapHeader roadmapData={roadmap} />
                <div className="text-center py-16 text-muted-foreground mt-8 border-t">
                    <p className='text-lg'>This interactive roadmap is currently a work in progress.</p>
                    <p className='text-sm'>The blueprint for its nodes and connections is not yet available.</p>
                </div>
            </div>
        );
    }


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
