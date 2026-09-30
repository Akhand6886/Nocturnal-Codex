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

// Internal component inside ReactFlowProvider with access to useReactFlow
const FlowInnerCanvas: FC<{
  processedNodes: Node[];
  edges: Edge[];
  onNodeClick: (event: React.MouseEvent, node: Node) => void;
  isInteractive: boolean;
  canvasHeight: number;
  isFullscreen: boolean;
  onExitFullscreen: () => void;
  totalTopics: number;
  matchCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onToggleInteractive: () => void;
}> = ({
  processedNodes,
  edges,
  onNodeClick,
  isInteractive,
  canvasHeight,
  isFullscreen,
  onExitFullscreen,
  totalTopics,
  matchCount,
  searchQuery,
  onSearchChange,
  onToggleInteractive,
}) => {
  const { fitView, zoomIn, zoomOut } = useReactFlow();

  useEffect(() => {
    const timer = setTimeout(() => {
      fitView({ duration: 500, padding: 0.14 });
    }, 80);
    return () => clearTimeout(timer);
  }, [fitView, isFullscreen]);

  const handleFitView = useCallback(() => {
    fitView({ duration: 400, padding: 0.14 });
  }, [fitView]);

  const handleZoomIn = useCallback(() => {
    zoomIn({ duration: 250 });
  }, [zoomIn]);

  const handleZoomOut = useCallback(() => {
    zoomOut({ duration: 250 });
  }, [zoomOut]);

  return (
    <div className={isFullscreen ? 'fixed inset-0 z-50 bg-background flex flex-col p-4 md:p-6' : 'w-full'}>
      {/* Editorial Codex Graph Toolbar */}
      <RoadmapControls
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        totalTopics={totalTopics}
        matchCount={matchCount}
        isInteractive={isInteractive}
        onToggleInteractive={onToggleInteractive}
        onFitView={handleFitView}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        isFullscreen={isFullscreen}
        onToggleFullscreen={onExitFullscreen}
      />

      {/* Canvas Frame with Architectural Manuscript Detailing */}
      <div className={isFullscreen ? 'flex-1 w-full mt-2' : 'w-full max-w-[1100px] mx-auto px-4 pb-16'}>
        <div
          style={{ height: isFullscreen ? 'calc(100vh - 120px)' : canvasHeight }}
          className="w-full relative rounded-2xl border border-border/70 shadow-sm bg-card/30 dark:bg-card/20 backdrop-blur-md overflow-hidden group transition-all"
        >
          {/* Architectural Corner Markers for Scholarly Codex feel */}
          <span className="absolute top-2 left-2 text-[10px] font-mono text-muted-foreground/40 pointer-events-none select-none z-10">┌</span>
          <span className="absolute top-2 right-2 text-[10px] font-mono text-muted-foreground/40 pointer-events-none select-none z-10">┐</span>
          <span className="absolute bottom-2 left-2 text-[10px] font-mono text-muted-foreground/40 pointer-events-none select-none z-10">└</span>
          <span className="absolute bottom-2 right-2 text-[10px] font-mono text-muted-foreground/40 pointer-events-none select-none z-10">┘</span>

          {/* Mode Indicator Overlay */}
          <div className="absolute bottom-3 left-4 z-10 pointer-events-none">
            <span className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground/60 bg-background/80 px-2 py-0.5 rounded border border-border/40 backdrop-blur-sm">
              {isInteractive ? 'Pan & Zoom Active' : 'Scroll Safe Mode (Click "Free Explore" to Pan)'}
            </span>
          </div>

          <ReactFlow
            nodes={processedNodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodeClick={onNodeClick}
            fitView
            zoomOnScroll={isInteractive}
            zoomOnPinch={isInteractive}
            zoomOnDoubleClick={isInteractive}
            panOnDrag={isInteractive}
            panOnScroll={false}
            preventScrolling={!isInteractive}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={true}
            style={{ background: 'transparent' }}
          >
            <Background
              gap={28}
              size={1.2}
              variant={BackgroundVariant.Dots}
            />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
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

  // Search & Interactive states
  const [searchQuery, setSearchQuery] = useState('');
  const [isInteractive, setIsInteractive] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  // Escape key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const interactiveNodes = useMemo(() => {
    if (!roadmapData) return [];
    return roadmapData.nodes.filter(
      (node) => node.type !== 'section' && node.type !== 'info' && node.type !== 'label'
    );
  }, [roadmapData]);

  // Synchronize search highlighting into ReactFlow node definitions
  const { processedNodes, matchCount } = useMemo(() => {
    if (!roadmapData) return { processedNodes: [], matchCount: 0 };
    const query = searchQuery.trim().toLowerCase();
    let matches = 0;

    const nodes = roadmapData.nodes.map((node) => {
      if (node.type === 'section' || node.type === 'info' || node.type === 'label') {
        return node;
      }

      const label = (node.data?.label as string) || '';
      const matchesSearch = query.length > 0 && label.toLowerCase().includes(query);
      if (matchesSearch) matches++;

      return {
        ...node,
        data: {
          ...node.data,
          isHighlighted: matchesSearch,
        },
      };
    });

    return { processedNodes: nodes, matchCount: matches };
  }, [roadmapData, searchQuery]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    if (node.type === 'section' || node.type === 'info' || node.type === 'label') return;
    const nodeData = node.data as Record<string, unknown>;

    setSelectedNode({
      id: node.id,
      label: nodeData.label as string,
      description: nodeData.description as string | undefined,
      resources: nodeData.resources as any,
      codeSnippet: nodeData.codeSnippet as string | undefined,
      prerequisites: nodeData.prerequisites as string[] | undefined,
    });
    setDrawerOpen(true);
  }, []);

  if (loading) {
    return (
      <div style={{ height: 'calc(100vh - 280px)' }} className="w-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Spinner className="text-primary w-6 h-6" />
          </div>
          <div className="text-center font-serif">
            <p className="text-base font-medium text-foreground">Consulting the Codex</p>
            <p className="text-xs text-muted-foreground mt-0.5 italic">Composing curriculum graph…</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !roadmapData) {
    return (
      <div style={{ height: 'calc(100vh - 280px)' }} className="w-full flex items-center justify-center">
        <div className="text-center max-w-md px-6 font-serif">
          <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📜</span>
          </div>
          <p className="font-semibold text-foreground text-lg mb-2">Curriculum Tractate Unavailable</p>
          <p className="text-xs text-muted-foreground font-sans">{error || 'The requested syllabus data could not be retrieved.'}</p>
        </div>
      </div>
    );
  }

  const maxNodeY = processedNodes.reduce((max, node) => Math.max(max, node.position.y), 0) || 600;
  const canvasHeight = Math.max(maxNodeY + 160, 680);

  return (
    <div className="w-full transition-colors duration-300">
      <ReactFlowProvider>
        <FlowInnerCanvas
          processedNodes={processedNodes}
          edges={roadmapData.edges}
          onNodeClick={onNodeClick}
          isInteractive={isInteractive}
          canvasHeight={canvasHeight}
          isFullscreen={isFullscreen}
          onExitFullscreen={() => setIsFullscreen(prev => !prev)}
          totalTopics={interactiveNodes.length}
          matchCount={matchCount}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onToggleInteractive={() => setIsInteractive(prev => !prev)}
        />
      </ReactFlowProvider>

      <RoadmapDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        data={selectedNode}
      />
    </div>
  );
};
