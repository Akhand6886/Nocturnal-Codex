// src/app/roadmaps/[roadmapSlug]/page.tsx
import { notFound } from 'next/navigation';
import { allRoadmapPosts } from 'contentlayer/generated';
import { loadRoadmapBlueprint, loadTopicContent } from '@/lib/roadmap-server-utils';
import { transformToReactFlow } from '@/lib/roadmap-utils';
import { InteractiveRoadmap } from '@/components/roadmap/InteractiveRoadmap';
import { RoadmapHeader } from '@/components/roadmap/RoadmapHeader';

async function getRoadmapData(slug: string) {
    const roadmap = allRoadmapPosts.find((p) => p.slug === slug);
    if (!roadmap) {
        return null;
    }

    const blueprint = await loadRoadmapBlueprint(slug);
    const topicsContent = await loadTopicContent(slug);

    if (!blueprint || !topicsContent) {
        return { roadmap, initialNodes: [], initialEdges: [], blueprint: null };
    }
    
    const { nodes, edges } = transformToReactFlow(blueprint, topicsContent);

    return { roadmap, initialNodes: nodes, initialEdges: edges, blueprint };
}

export default async function RoadmapPage({ params }: { params: { roadmapSlug: string } }) {
    const roadmapData = await getRoadmapData(params.roadmapSlug);

    if (!roadmapData || !roadmapData.roadmap) {
        notFound();
    }
    
    const { roadmap, initialNodes, initialEdges, blueprint } = roadmapData;

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
