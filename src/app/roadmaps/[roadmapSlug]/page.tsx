// src/app/roadmaps/[roadmapSlug]/page.tsx
'use client';
import { notFound, useParams } from 'next/navigation';
import { allRoadmapPosts } from 'contentlayer/generated';
import { InteractiveRoadmap } from '@/components/roadmap/InteractiveRoadmap';
import { useMemo } from 'react';
import { loadRoadmapBlueprint, loadTopicContent } from '@/lib/roadmap-server-utils';
import { transformToReactFlow } from '@/lib/roadmap-utils';
import { Spinner } from '@/components/common/spinner';
import type { RoadmapFlowData } from '@/types/roadmap';

// This is a placeholder for the data that would be fetched on the server in a real app
// For this client component, we'll manage a loading state.
import { useEffect, useState } from 'react';
import { RoadmapNode, RoadmapEdge } from '@/types/roadmap';

export default function RoadmapPage() {
    const params = useParams();
    const roadmapSlug = params.roadmapSlug as string;

    const [nodes, setNodes] = useState<RoadmapNode[]>([]);
    const [edges, setEdges] = useState<RoadmapEdge[]>([]);
    const [blueprint, setBlueprint] = useState<RoadmapFlowData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const roadmap = allRoadmapPosts.find((p) => p.slug === roadmapSlug);

    useEffect(() => {
        if (!roadmapSlug) return;

        async function fetchData() {
            setIsLoading(true);
            try {
                // In a real app, this would be an API call. Here we simulate it.
                // We assume these utils can be made to work on the client for this purpose.
                // NOTE: This is a conceptual fix. The utils are server-side.
                // We will create mock client-side versions for demonstration.
                const blueprintResponse = await fetch(`/roadmap-content/${roadmapSlug}.json`);
                const blueprintData = await blueprintResponse.json();
                
                const topicsResponse = await fetch(`/api/roadmap-topics?slug=${roadmapSlug}`);
                const topicsContent = await topicsResponse.json();
                
                if (blueprintData && topicsContent) {
                    const { nodes: flowNodes, edges: flowEdges } = transformToReactFlow(blueprintData, topicsContent);
                    setNodes(flowNodes);
                    setEdges(flowEdges);
                    setBlueprint(blueprintData);
                }
            } catch (error) {
                console.error("Failed to fetch roadmap data", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [roadmapSlug]);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8 flex justify-center items-center h-[calc(100vh-10rem)]">
                <Spinner className="h-12 w-12" />
            </div>
        );
    }
    
    if (!roadmap) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <InteractiveRoadmap
                initialNodes={nodes}
                initialEdges={edges}
                roadmap={roadmap}
                blueprint={blueprint}
            />
        </div>
    );
}
