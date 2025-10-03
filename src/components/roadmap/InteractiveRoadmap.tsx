// src/components/roadmap/InteractiveRoadmap.tsx
'use client';

import React, { useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type NodeMouseHandler,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { RoadmapNode as CustomRoadmapNode } from './RoadmapNode';
import { TopicSidebar } from './TopicSidebar';
import { useNodeSelection, useProgress } from './hooks';
import { type RoadmapPost } from 'contentlayer/generated';
import { type RoadmapFlowData, type ProgressStatus, type RoadmapNodeData } from '@/types/roadmap';

import { RoadmapProgressDisplay } from './RoadmapProgressDisplay';
import { RoadmapSidebar } from './RoadmapSidebar';

interface InteractiveRoadmapProps {
  initialNodes: Node<RoadmapNodeData>[];
  initialEdges: Edge[];
  roadmap: RoadmapPost;
  blueprint: RoadmapFlowData | null;
}

export function InteractiveRoadmap({ initialNodes, initialEdges, roadmap, blueprint }: InteractiveRoadmapProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  const { selectedNode, selectNode, clearSelection } = useNodeSelection();
  const { progress, updateNodeStatus, getNodeStatus, getCompletedCount, getProgressPercentage } = useProgress(roadmap.slug || '', nodes);
  
  const nodeTypes = useMemo(() => ({ roadmapNode: CustomRoadmapNode }), []);

  const onNodeClick: NodeMouseHandler = useCallback((event, node) => {
    // For shift-click to mark as 'learning'
    if (event.shiftKey) {
        event.preventDefault();
        const currentStatus = getNodeStatus(node.id);
        const newStatus = currentStatus === 'learning' ? 'pending' : 'learning';
        updateNodeStatus(node.id, newStatus);
        return; // Stop further execution
    }

    // For alt-click to mark as 'skipped'
    if (event.altKey) {
        event.preventDefault();
        const currentStatus = getNodeStatus(node.id);
        const newStatus = currentStatus === 'skipped' ? 'pending' : 'skipped';
        updateNodeStatus(node.id, newStatus);
        return; // Stop further execution
    }
    
    // Default click action: select node to open sidebar
    selectNode(node as Node<RoadmapNodeData>);

  }, [selectNode, updateNodeStatus, getNodeStatus]);

  const onNodeContextMenu: NodeMouseHandler = useCallback((event, node) => {
      event.preventDefault();
      const currentStatus = getNodeStatus(node.id);
      const newStatus = currentStatus === 'done' ? 'pending' : 'done';
      updateNodeStatus(node.id, newStatus);
  }, [updateNodeStatus, getNodeStatus]);

  // Apply progress status to nodes for consistent styling
  const nodesWithStatus = useMemo(() => {
    return nodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        status: getNodeStatus(node.id),
      },
    }));
  }, [nodes, progress, getNodeStatus]);

  const handleUpdateStatus = useCallback((nodeId: string, status: ProgressStatus) => {
    updateNodeStatus(nodeId, status);
  }, [updateNodeStatus]);

  return (
    <div className="w-full h-full">
        <RoadmapProgressDisplay 
            completedNodesCount={getCompletedCount()} 
            totalNodes={nodes.length}
            progressPercentage={getProgressPercentage()}
        />

        <div className="flex flex-col lg:flex-row gap-8">
            {blueprint && <RoadmapSidebar blueprint={blueprint} />}

            <div className="flex-1 h-[80vh] rounded-lg border bg-card shadow-sm">
                <ReactFlow
                    nodes={nodesWithStatus}
                    edges={edges}
                    onNodesChange={onNodesChange as OnNodesChange<Node<RoadmapNodeData>>}
                    onEdgesChange={onEdgesChange}
                    onNodeClick={onNodeClick}
                    onNodeContextMenu={onNodeContextMenu}
                    nodeTypes={nodeTypes}
                    fitView
                    className="bg-background"
                >
                    <Controls />
                    <MiniMap nodeStrokeWidth={3} zoomable pannable />
                    <Background gap={16} />
                </ReactFlow>
            </div>
        </div>

        <TopicSidebar
            isOpen={!!selectedNode}
            onClose={clearSelection}
            selectedNode={selectedNode}
            onUpdateStatus={handleUpdateStatus}
        />
    </div>
  );
}
