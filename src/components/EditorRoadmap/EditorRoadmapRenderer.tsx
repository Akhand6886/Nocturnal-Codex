'use client';

import './EditorRoadmapRenderer.css';
import React, { FC, useEffect, useState, useCallback, useMemo } from 'react';
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
import { RoadmapControls } from '../Roadmaps/RoadmapControls';
import { useRoadmapProgress, NodeStatus } from '@/lib/roadmapProgress';

interface EditorRoadmapRendererProps {
  roadmapId: string;
  initialRoadmapData?: RoadmapData | null;
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
  { color: '#22c55e', border: '#15803d', label: 'Mastered Topic' },
  { color: '#f59e0b', border: '#d97706', label: 'In Progress' },
  { color: '#a855f7', border: '#7e22ce', label: 'Recommended Path' },
];

const Legend: FC = () => (
  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 p-3.5 rounded-xl border border-border/40 bg-card/90 backdrop-blur-xl shadow-lg dark:bg-card/70">
    <span className="roadmap-font text-[10px] font-bold text-muted-foreground/70 uppercase tracking-widest mb-1 px-0.5">
      Legend & Status
    </span>
    {LEGEND.map(({ color, border, label }) => (
      <div key={label} className="flex items-center gap-3 group">
        <span className="relative flex h-3 w-3 flex-shrink-0">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ backgroundColor: color }}
          />
          <span
            className="relative inline-flex rounded-full h-3 w-3 border shadow-sm"
            style={{
              backgroundColor: color,
              borderColor: border,
            }}
          />
        </span>
        <span className="roadmap-font text-[11px] font-semibold text-muted-foreground/85 group-hover:text-foreground transition-colors">
          {label}
        </span>
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

export const EditorRoadmapRenderer: FC<EditorRoadmapRendererProps> = ({ roadmapId, initialRoadmapData }) => {
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(() => {
    if (!initialRoadmapData) return null;
    return {
      ...initialRoadmapData,
      edges: initialRoadmapData.edges.map(edge => ({ ...edge, type: edge.type || 'roadmap' })),
    };
  });
  const [loading, setLoading] = useState(!initialRoadmapData);
  const [error, setError] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<SelectedNodeData | null>(null);

  // Search & Filter controls
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | NodeStatus>('all');

  // Local progress persistence hook
  const { progress, setNodeStatus, getNodeStatus, resetProgress } = useRoadmapProgress(roadmapId);

  useEffect(() => {
    if (initialRoadmapData) return;

    async function fetchRoadmapData() {
      try {
        setLoading(true);
        const response = await fetch(`/roadmap-content/${roadmapId}.json`);
        if (!response.ok) throw new Error(`Failed to fetch roadmap data. Status: ${response.status}`);
        const data: RoadmapData = await response.json();
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
  }, [roadmapId, initialRoadmapData]);

  const interactiveNodes = useMemo(() => {
    if (!roadmapData) return [];
    return roadmapData.nodes.filter(
      (node) => node.type !== 'section' && node.type !== 'info' && node.type !== 'label'
    );
  }, [roadmapData]);

  // Synchronize user completion status & search highlighting into ReactFlow node definitions
  const processedNodes = useMemo(() => {
    if (!roadmapData) return [];
    const query = searchQuery.trim().toLowerCase();

    return roadmapData.nodes.map((node) => {
      if (node.type === 'section' || node.type === 'info' || node.type === 'label') {
        return node;
      }

      const userStatus = getNodeStatus(node.id);
      const label = (node.data?.label as string) || '';
      const matchesSearch = query.length > 0 && label.toLowerCase().includes(query);
      const matchesFilter = statusFilter === 'all' || userStatus === statusFilter;

      return {
        ...node,
        hidden: !matchesFilter,
        data: {
          ...node.data,
          userStatus,
          isHighlighted: matchesSearch,
        },
      };
    });
  }, [roadmapData, getNodeStatus, searchQuery, statusFilter]);

  const handleStatusChange = (nodeId: string, status: NodeStatus) => {
    setNodeStatus(nodeId, status);
    if (selectedNode && selectedNode.id === nodeId) {
      setSelectedNode((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    if (node.type === 'section' || node.type === 'info' || node.type === 'label') return;
    const nodeData = node.data as Record<string, unknown>;
    const currentStatus = getNodeStatus(node.id);

    setSelectedNode({
      id: node.id,
      label: nodeData.label as string,
      description: nodeData.description as string | undefined,
      status: currentStatus,
      resources: nodeData.resources as any,
      codeSnippet: nodeData.codeSnippet as string | undefined,
      prerequisites: nodeData.prerequisites as string[] | undefined,
    });
    setDrawerOpen(true);
  }, [getNodeStatus]);

  if (loading) {
    return (
      <div style={{ height: 'calc(100vh - 250px)' }} className="w-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Spinner className="text-primary w-6 h-6" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">Loading roadmap</p>
            <p className="text-xs text-muted-foreground mt-0.5 animate-pulse">Preparing your learning path…</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !roadmapData) {
    return (
      <div style={{ height: 'calc(100vh - 250px)' }} className="w-full flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <p className="font-semibold text-foreground mb-2">Failed to load roadmap</p>
          <p className="text-sm text-muted-foreground">{error || 'Data could not be loaded. Please try refreshing the page.'}</p>
        </div>
      </div>
    );
  }

  const maxNodeY = processedNodes.reduce((max, node) => Math.max(max, node.position.y), 0) || 600;
  const canvasHeight = maxNodeY + 140;

  return (
    <div className="w-full bg-[#fafaf9] dark:bg-black transition-colors duration-300">
      {/* Top Filter Bar & Progress Meter */}
      <RoadmapControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        totalTopics={interactiveNodes.length}
        completedCount={progress.completedNodeIds.length}
        learningCount={progress.learningNodeIds.length}
        onResetProgress={resetProgress}
      />

      <div
        style={{ height: canvasHeight, minWidth: 1000 }}
        className="w-full max-w-[1000px] mx-auto relative border-x border-border/10 shadow-sm bg-transparent"
      >
        <ReactFlowProvider>
          <ReactFlow
            nodes={processedNodes}
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
            style={{ background: 'transparent' }}
          >
            <Legend />
            <Background
              gap={24}
              size={1.5}
              variant={BackgroundVariant.Dots}
            />
            <FitViewUpdater />
          </ReactFlow>
        </ReactFlowProvider>

        <RoadmapDrawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          data={selectedNode}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
};
