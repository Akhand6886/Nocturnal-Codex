
// src/components/roadmap/InteractiveRoadmap.tsx
'use client';

import React, { useCallback, useMemo } from 'react';
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

import { RoadmapHeader } from './RoadmapHeader';
import { RoadmapProgress } from './RoadmapProgress';
import { RoadmapSidebar } from './RoadmapSidebar';


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
  const { progress, toggleNodeCompletion } = useProgress(
    slug,
    nodes,
    edges
  );

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
  
  return (
    <div className="container mx-auto px-4 py-8">
      <RoadmapHeader roadmapData={roadmapData} />
      
      <RoadmapProgress 
        nodes={nodes}
        progress={progress}
      />

      <div className="flex flex-col lg:flex-row gap-8">
        <RoadmapSidebar blueprint={blueprint} />

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
