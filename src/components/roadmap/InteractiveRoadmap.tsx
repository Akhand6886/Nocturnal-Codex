
// src/components/roadmap/InteractiveRoadmap.tsx
'use client';

import React, { useCallback, useMemo, useState, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { RoadmapNode } from './RoadmapNode';
import { TopicSidebar } from './TopicSidebar';
import { ProgressTracker } from './ProgressTracker';
import { RoadmapControls } from './RoadmapControls';
import { useRoadmapData, useNodeSelection, useProgress } from './hooks';
import { type RoadmapFlowData, type RoadmapNodeData } from '@/types/roadmap';
import { type Roadmap as RoadmapType } from 'contentlayer/generated';

interface InteractiveRoadmapProps {
  roadmapData: RoadmapType;
  flowData: RoadmapFlowData;
  slug: string;
}

const nodeTypes = {
  roadmapNode: RoadmapNode,
};

const defaultViewport = { x: 0, y: 0, zoom: 0.8 };

export function InteractiveRoadmap({
  roadmapData,
  flowData,
  slug,
}: InteractiveRoadmapProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Use the custom hooks
  const { 
    nodes: initialNodes, 
    edges: initialEdges,
    loading: dataLoading,
    error: dataError,
  } = useRoadmapData({
    slug,
    initialFlowData: flowData,
  });
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  const { selectedNode, selectNode, clearSelection } = useNodeSelection();
  const { 
    progress, 
    toggleNodeCompletion, 
    getProgressPercentage 
  } = useProgress(slug, nodes, edges);

  // Update nodes with completion status from progress hook
  useEffect(() => {
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


  // Handle node clicks
  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.stopPropagation();
      selectNode(node as Node<RoadmapNodeData>);
    },
    [selectNode]
  );

  // Handle node completion toggle
  const onToggleCompletion = useCallback(
    (nodeId: string) => {
      toggleNodeCompletion(nodeId);
    },
    [toggleNodeCompletion]
  );

  // Search functionality
  const filteredNodes = useMemo(() => {
    if (!searchTerm) return nodes;
    
    return nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        highlighted: node.data.label
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      },
    }));
  }, [nodes, searchTerm]);

  // Handle background click to clear selection
  const onPaneClick = useCallback(() => {
    clearSelection();
  }, [clearSelection]);

  // Focus on searched node
  const onFocusNode = useCallback((nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (node) {
      selectNode(node);
    }
  }, [nodes, selectNode]);

  const progressPercentage = getProgressPercentage();

  if (dataLoading) {
    return <div>Loading roadmap...</div>;
  }

  if (dataError) {
    return <div>Error loading roadmap: {dataError}</div>
  }

  return (
    <div className="relative w-full h-[800px] bg-background border rounded-lg overflow-hidden">
      {/* Progress Tracker */}
      <ProgressTracker
        progress={progressPercentage}
        totalNodes={nodes.length}
        completedNodes={progress.completedNodes.length}
        roadmapTitle={roadmapData.title}
      />

      {/* Search and Controls */}
      <RoadmapControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        nodes={nodes}
        onFocusNode={onFocusNode}
      />

      {/* Main React Flow */}
      <ReactFlow
        nodes={filteredNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        defaultViewport={defaultViewport}
        fitView
        fitViewOptions={{
          padding: 0.2,
          includeHiddenNodes: false,
        }}
        onlyRenderVisibleElements
        maxZoom={2}
        minZoom={0.2}
        className="bg-background"
        proOptions={{ hideAttribution: true }}
      >
        <Background 
          variant="dots" 
          gap={20} 
          size={1} 
          className="opacity-50"
        />
        <Controls 
          className="bg-background border shadow-md"
          showInteractive={false}
        />
        <MiniMap 
          className="bg-background border shadow-md"
          zoomable
          pannable
          nodeColor={(node) => {
            return node.data.completed ? '#10b981' : '#6b7280';
          }}
        />
      </ReactFlow>

      {/* Topic Detail Sidebar */}
      <TopicSidebar
        isOpen={!!selectedNode}
        onClose={clearSelection}
        selectedNode={selectedNode}
        onToggleCompletion={onToggleCompletion}
        roadmapSlug={slug}
      />
    </div>
  );
}
