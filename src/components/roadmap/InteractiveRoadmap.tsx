
// src/components/roadmap/InteractiveRoadmap.tsx
'use client';

import React, { useCallback, useMemo, useEffect } from 'react';
import {
  ReactFlow, Background, Controls, MiniMap, useNodesState, useEdgesState, type Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { RoadmapNode } from './RoadmapNode';
import { TopicSidebar } from './TopicSidebar';
import { useNodeSelection, useProgress } from './hooks';
import { type RoadmapFlowData, type RoadmapNodeData, type TopicContent, type ProgressStatus } from '@/types/roadmap';
import { type RoadmapPost as RoadmapType } from 'contentlayer/generated';
import { transformToReactFlow } from '@/lib/roadmap-utils';

import { RoadmapHeader } from './RoadmapHeader';
import { RoadmapProgressDisplay } from './RoadmapProgressDisplay';
import { RoadmapSidebar as PageSidebar } from './RoadmapSidebar';


interface InteractiveRoadmapProps {
  roadmapData: RoadmapType;
  blueprint: RoadmapFlowData;
  topicsContent: Record<string, TopicContent> | null;
  slug: string;
}

const nodeTypes = { roadmapNode: RoadmapNode };
const defaultViewport = { x: 0, y: 0, zoom: 0.7 };

export function InteractiveRoadmap({
  roadmapData,
  blueprint,
  topicsContent,
  slug,
}: InteractiveRoadmapProps) {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => transformToReactFlow(blueprint, topicsContent || {}),
    [blueprint, topicsContent]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const { selectedNode, selectNode, clearSelection } = useNodeSelection();
  const { progress, updateNodeStatus, getCompletedCount, getProgressPercentage } = useProgress(slug, nodes);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          status: progress[node.id] || 'pending',
        },
      }))
    );
  }, [progress, setNodes]);

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node<RoadmapNodeData>) => {
      event.stopPropagation();
      if (event.shiftKey) {
        const currentStatus = progress[node.id] || 'pending';
        const newStatus = currentStatus === 'learning' ? 'pending' : 'learning';
        updateNodeStatus(node.id, newStatus);
      } else {
        selectNode(node);
      }
    },
    [selectNode, updateNodeStatus, progress]
  );

  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: Node<RoadmapNodeData>) => {
      event.preventDefault();
      const currentStatus = progress[node.id] || 'pending';
      const newStatus = currentStatus === 'done' ? 'pending' : 'done';
      updateNodeStatus(node.id, newStatus);
    },
    [updateNodeStatus, progress]
  );

  const onPaneClick = useCallback(() => {
    clearSelection();
  }, [clearSelection]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <RoadmapHeader roadmapData={roadmapData} />
      
      <RoadmapProgressDisplay
        completedNodesCount={getCompletedCount()}
        totalNodes={nodes.length}
        progressPercentage={getProgressPercentage()}
      />

      <div className="flex flex-col lg:flex-row gap-8">
        <PageSidebar blueprint={blueprint} />

        <main className="flex-1">
          <div className="relative w-full h-[900px] border rounded-lg overflow-hidden bg-background">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={onNodeClick}
              onNodeContextMenu={onNodeContextMenu}
              onPaneClick={onPaneClick}
              nodeTypes={nodeTypes}
              defaultViewport={defaultViewport}
              fitView
              fitViewOptions={{ padding: 0.2 }}
              proOptions={{ hideAttribution: true }}
            >
              <Background variant="dots" gap={20} size={1} className="opacity-50" />
              <Controls showInteractive={false} />
              <MiniMap nodeColor={(n: Node<RoadmapNodeData>) => {
                switch(n.data.status) {
                  case 'done': return '#10b981';
                  case 'learning': return '#f59e0b';
                  default: return '#a1a1aa';
                }
              }} pannable zoomable />
            </ReactFlow>

            <TopicSidebar
              isOpen={!!selectedNode}
              onClose={clearSelection}
              selectedNode={selectedNode}
              onUpdateStatus={updateNodeStatus}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
