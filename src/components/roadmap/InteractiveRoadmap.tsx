// src/components/roadmap/InteractiveRoadmap.tsx
'use client';

import React, { useCallback, useMemo } from 'react';
import Link from 'next/link';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { RoadmapNode } from './RoadmapNode';
import { TopicSidebar } from './TopicSidebar';
import { useNodeSelection, useProgress } from './hooks';
import { type RoadmapFlowData, type RoadmapNodeData, type TopicContent } from '@/types/roadmap';
import { type RoadmapPost as RoadmapType } from 'contentlayer/generated';
import { transformToReactFlow } from '@/lib/roadmap-utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Calendar,
  Download,
  Share2,
  Bookmark,
  BookCopy,
  Link as LinkIcon,
} from 'lucide-react';

interface InteractiveRoadmapProps {
  roadmapData: RoadmapType;
  blueprint: RoadmapFlowData;
  topicsContent: Record<string, TopicContent>;
  slug: string;
}

const nodeTypes = {
  roadmapNode: RoadmapNode,
};

const defaultViewport = { x: 0, y: 0, zoom: 0.7 };

export function InteractiveRoadmap({
  roadmapData,
  blueprint,
  topicsContent,
  slug,
}: InteractiveRoadmapProps) {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => transformToReactFlow(blueprint, topicsContent),
    [blueprint, topicsContent]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const { selectedNode, selectNode, clearSelection } = useNodeSelection();
  const { progress, toggleNodeCompletion, getProgressPercentage } = useProgress(
    slug,
    nodes,
    edges
  );
  
  const totalNodes = useMemo(() => nodes.length, [nodes]);
  const completedNodesCount = useMemo(() => progress.completedNodes.length, [progress.completedNodes]);

  React.useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          completed: progress.completedNodes.includes(node.id),
        },
      }))
    );
  }, [progress.completedNodes, setNodes]);

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.stopPropagation();
      selectNode(node as Node<RoadmapNodeData>);
    },
    [selectNode]
  );

  const onToggleCompletion = useCallback(
    (nodeId: string) => {
      toggleNodeCompletion(nodeId);
    },
    [toggleNodeCompletion]
  );

  const onPaneClick = useCallback(() => {
    clearSelection();
  }, [clearSelection]);
  
  const pageTitle = roadmapData.displayTitle;
  const { prerequisites, relatedRoadmaps } = blueprint.metadata || {};

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4 text-muted-foreground">
          <Link href="/roadmaps">
            <ArrowLeft className="h-4 w-4 mr-2" />
            All Roadmaps
          </Link>
        </Button>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">{pageTitle}</h1>
            <p className="mt-2 text-lg text-muted-foreground">{roadmapData.description}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Calendar className="h-4 w-4" /> Schedule
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Download className="h-4 w-4" /> Download
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Share2 className="h-4 w-4" /> Share
            </Button>
            <Button variant="ghost" size="icon">
              <Bookmark className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Progress and Tabs */}
      <div className="mb-8 p-4 border rounded-lg bg-card flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
            <div className="relative w-20 h-20">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                        className="text-border"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none" stroke="currentColor" strokeWidth="3"
                    />
                    <path
                        className="text-primary"
                        strokeDasharray={`${getProgressPercentage()}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold">{getProgressPercentage()}%</span>
                </div>
            </div>
            <div>
                <p className="font-semibold text-foreground">{completedNodesCount} of {totalNodes} Done</p>
                <p className="text-sm text-muted-foreground">Track Progress</p>
            </div>
        </div>
        <div className="flex items-center gap-2 border rounded-full p-1 bg-muted">
          <Button size="sm" className="rounded-full">Roadmap</Button>
          <Button size="sm" variant="ghost" className="rounded-full">AI Tutor</Button>
        </div>
        <div>
            <Button variant="secondary" className="gap-1.5">
                Personalize <Badge className="ml-2">New</Badge>
            </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar */}
        <aside className="w-full lg:w-1/4 lg:sticky lg:top-24 self-start space-y-6">
            {prerequisites && prerequisites.length > 0 && (
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-md flex items-center gap-2"><BookCopy className="h-4 w-4"/>Pre-requisites</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {prerequisites.map(prereq => (
                            <Button key={prereq.slug} variant="outline" size="sm" asChild className="w-full justify-start">
                                <Link href={`/roadmaps/${prereq.slug}`}>{prereq.title}</Link>
                            </Button>
                        ))}
                    </CardContent>
                </Card>
            )}
            {relatedRoadmaps && relatedRoadmaps.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-md flex items-center gap-2"><LinkIcon className="h-4 w-4"/>Related Roadmaps</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                         {relatedRoadmaps.map(related => (
                            <Link key={related.slug} href={`/roadmaps/${related.slug}`} className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2">
                               <Bookmark className="h-4 w-4" /> {related.title}
                            </Link>
                        ))}
                    </CardContent>
                </Card>
            )}
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="relative w-full h-[900px] border rounded-lg overflow-hidden bg-background">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={onNodeClick}
              onPaneClick={onPaneClick}
              nodeTypes={nodeTypes}
              defaultViewport={defaultViewport}
              fitView
              fitViewOptions={{ padding: 0.2 }}
              proOptions={{ hideAttribution: true }}
            >
              <Background variant="dots" gap={20} size={1} className="opacity-50" />
              <Controls showInteractive={false} />
              <MiniMap nodeColor={(n) => n.data.completed ? '#10b981' : '#a1a1aa'} pannable zoomable />
            </ReactFlow>

            <TopicSidebar
              isOpen={!!selectedNode}
              onClose={clearSelection}
              selectedNode={selectedNode}
              onToggleCompletion={onToggleCompletion}
              roadmapSlug={slug}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
