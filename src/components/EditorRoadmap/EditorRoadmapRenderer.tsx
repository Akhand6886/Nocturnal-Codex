'use client';

import './EditorRoadmapRenderer.css';
import React, { FC, useEffect, useState, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  type Node,
  type Edge,
  ReactFlowProvider,
  useReactFlow,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Spinner } from '@/components/common/spinner';
import TopicNode from '../Roadmaps/nodes/TopicNode';
import SectionNode from '../Roadmaps/nodes/SectionNode';
import SubtopicNode from '../Roadmaps/nodes/SubtopicNode';
import BlueNode from '../Roadmaps/nodes/BlueNode';
import InfoNode from '../Roadmaps/nodes/InfoNode';
import LabelNode from '../Roadmaps/nodes/LabelNode';
import RoadmapEdge from '../Roadmaps/edges/RoadmapEdge';
import DottedEdge from '../Roadmaps/edges/DottedEdge';
import { RoadmapDrawer, SelectedNodeData } from '../Roadmaps/RoadmapDrawer';

interface EditorRoadmapRendererProps {
  roadmapId: string;
}

interface RoadmapData {
  nodes: Node[];
  edges: Edge[];
}

const nodeTypes = {
  topic: TopicNode,
  section: SectionNode,
  subtopic: SubtopicNode,
  blue: BlueNode,
  info: InfoNode,
  label: LabelNode,
  default: TopicNode,
};

const edgeTypes = {
  roadmap: RoadmapEdge,
  dotted: DottedEdge,
  default: RoadmapEdge,
};

const LEGEND = [
  { color: '#a855f7', label: 'Personal Recommendation' },
  { color: '#22c55e', label: 'Alternative Option' },
  { color: '#94a3b8', label: 'Order and avoid on roadmap' },
];

const Legend: FC = () => (
  <div
    style={{
      position: 'absolute',
      top: 24,
      left: 24,
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    }}
  >
    {LEGEND.map(({ color, label }) => (
      <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span
          style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: color,
            border: '2px solid #000',
            flexShrink: 0,
          }}
        />
        <span className="roadmap-font text-[13px] font-semibold text-slate-700">{label}</span>
      </div>
    ))}
  </div>
);

const FitViewUpdater: FC = () => {
  const { fitView } = useReactFlow();
  useEffect(() => {
    const timer = setTimeout(() => fitView({ duration: 600, padding: 0.12 }), 60);
    return () => clearTimeout(timer);
  }, [fitView]);
  return null;
};

export const EditorRoadmapRenderer: FC<EditorRoadmapRendererProps> = ({ roadmapId }) => {
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<SelectedNodeData | null>(null);

  useEffect(() => {
    async function fetchRoadmapData() {
      try {
        setLoading(true);
        const response = await fetch(`/roadmap-content/${roadmapId}.json`);
        if (!response.ok) throw new Error(`Failed to fetch roadmap data. Status: ${response.status}`);
        const data: RoadmapData = await response.json();
        // Default edge type if not set
        data.edges = data.edges.map(edge => ({ ...edge, type: edge.type || 'roadmap' }));
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

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    // Skip non-interactive nodes
    if (node.type === 'section' || node.type === 'info' || node.type === 'label') return;
    const nodeData = node.data as Record<string, unknown>;
    setSelectedNode({
      id: node.id,
      label: nodeData.label as string,
      description: nodeData.description as string | undefined,
      status: nodeData.status as 'done' | 'learning' | 'pending' | undefined,
      resources: nodeData.resources as any,
    });
    setDrawerOpen(true);
  }, []);

  if (loading) {
    return (
      <div style={{ height: 'calc(100vh - 250px)' }} className="w-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Spinner className="text-primary w-7 h-7" />
          <p className="text-sm text-muted-foreground animate-pulse">Loading roadmap…</p>
        </div>
      </div>
    );
  }

  if (error || !roadmapData) {
    return (
      <div style={{ height: 'calc(100vh - 250px)' }} className="w-full flex items-center justify-center text-destructive">
        <p className="font-semibold">Error: {error || 'Data could not be loaded.'}</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto bg-[#fafaf9]">
      <div
        style={{ height: 2600, minWidth: 1000 }}
        className="w-full max-w-[1000px] mx-auto relative border-x border-border/10 shadow-sm"
      >
        <ReactFlowProvider>
        <ReactFlow
          nodes={roadmapData.nodes}
          edges={roadmapData.edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodeClick={onNodeClick}
          fitView
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          panOnDrag={false}
          panOnScroll={false}
          preventScrolling={false}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={true}
          style={{ background: '#fafaf9' }}
        >
          <Legend />
          <Background
            gap={24}
            size={1.5}
            variant={BackgroundVariant.Dots}
            color="#cbd5e1"
          />
          <FitViewUpdater />
        </ReactFlow>
      </ReactFlowProvider>

        <RoadmapDrawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          data={selectedNode}
        />
      </div>
    </div>
  );
};
