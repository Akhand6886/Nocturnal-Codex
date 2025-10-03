
'use client';

import './EditorRoadmapRenderer.css';
import React, { FC, useEffect, useState } from 'react';
import { ReactFlow, Background, Controls, MiniMap, type Node, type Edge, ReactFlowProvider, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Spinner } from '@/components/common/spinner';

interface EditorRoadmapRendererProps {
  roadmapId: string;
}

interface RoadmapData {
  nodes: Node[];
  edges: Edge[];
}

const FitViewUpdater: FC = () => {
  const { fitView } = useReactFlow();
  useEffect(() => {
    const timer = setTimeout(() => fitView({ duration: 200, padding: 0.1 }), 10);
    return () => clearTimeout(timer);
  }, [fitView]);
  return null;
};

export const EditorRoadmapRenderer: FC<EditorRoadmapRendererProps> = ({ roadmapId }) => {
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRoadmapData() {
      try {
        setLoading(true);
        const response = await fetch(`/roadmap-content/${roadmapId}.json`);
        if (!response.ok) {
          throw new Error(`Failed to fetch roadmap data. Status: ${response.status}`);
        }
        const data: RoadmapData = await response.json();
        setRoadmapData(data);
      } catch (e: any) {
        console.error(e);
        setError(e.message || 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    }

    fetchRoadmapData();
  }, [roadmapId]);

  if (loading) {
    return (
      <div style={{ height: 'calc(100vh - 150px)' }} className="w-full flex items-center justify-center">
        <Spinner className="text-primary" />
      </div>
    );
  }

  if (error || !roadmapData) {
    return (
      <div style={{ height: 'calc(100vh - 150px)' }} className="w-full flex items-center justify-center text-destructive">
        <p>Error loading roadmap: {error || 'Data could not be loaded.'}</p>
      </div>
    );
  }

  return (
    <div style={{ height: 'calc(100vh - 150px)' }} className="w-full">
      <ReactFlowProvider>
        <ReactFlow
          nodes={roadmapData.nodes}
          edges={roadmapData.edges}
          fitView
          zoomOnScroll={false}
          preventScrolling={false}
          panOnDrag={false}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
        >
          <Controls showInteractive={false} />
          <MiniMap />
          <Background gap={16} />
          <FitViewUpdater />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};
