'use client';

import './EditorRoadmapRenderer.css';
import React, { FC, useEffect, useState, useCallback, useMemo } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap, 
  type Node, 
  type Edge, 
  ReactFlowProvider, 
  useReactFlow,
  BackgroundVariant
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
  default: TopicNode, // Fallback
};

const edgeTypes = {
  roadmap: RoadmapEdge,
  dotted: DottedEdge,
  default: RoadmapEdge, // Fallback
};

const FitViewUpdater: FC = () => {
  const { fitView } = useReactFlow();
  useEffect(() => {
    const timer = setTimeout(() => fitView({ duration: 800, padding: 0.15 }), 50);
    return () => clearTimeout(timer);
  }, [fitView]);
  return null;
};

export const EditorRoadmapRenderer: FC<EditorRoadmapRendererProps> = ({ roadmapId }) => {
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<SelectedNodeData | null>(null);

  useEffect(() => {
    async function fetchRoadmapData() {
      try {
        setLoading(true);
        const response = await fetch(`/roadmap-content/${roadmapId}.json`);
        if (!response.ok) {
          throw new Error(`Failed to fetch roadmap data. Status: ${response.status}`);
        }
        let data: RoadmapData = await response.json();
        
        // Ensure all edges use our custom edge type if not explicitly set
        data.edges = data.edges.map(edge => ({
          ...edge,
          type: edge.type || 'roadmap',
          animated: false,
        }));

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
    // Prevent click if we are dragging (handled by ReactFlow mostly, but good practice)
    event.preventDefault();
    
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
      <div style={{ height: 'calc(100vh - 250px)' }} className="w-full flex items-center justify-center bg-muted/10 rounded-xl border border-border/50 shadow-inner">
        <div className="flex flex-col items-center gap-4">
           <Spinner className="text-primary w-8 h-8" />
           <p className="text-muted-foreground font-medium animate-pulse">Loading roadmap data...</p>
        </div>
      </div>
    );
  }

  if (error || !roadmapData) {
    return (
      <div style={{ height: 'calc(100vh - 250px)' }} className="w-full flex items-center justify-center text-destructive bg-destructive/5 rounded-xl border border-destructive/20">
        <p className="font-semibold">Error loading roadmap: {error || 'Data could not be loaded.'}</p>
      </div>
    );
  }

  return (
    <div style={{ height: 'calc(100vh - 200px)' }} className="w-full rounded-xl border border-border/60 shadow-sm bg-background overflow-hidden relative">
      <ReactFlowProvider>
        <ReactFlow
          nodes={roadmapData.nodes}
          edges={roadmapData.edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodeClick={onNodeClick}
          fitView
          minZoom={0.2}
          maxZoom={1.5}
          zoomOnScroll={true} // Allow zooming for better exploration
          panOnDrag={true} // Allow panning
          preventScrolling={false}
          nodesDraggable={false} // Roadmap is fixed
          nodesConnectable={false}
          elementsSelectable={true}
          className="roadmap-flow"
        >
          <Controls showInteractive={false} className="shadow-md rounded-md bg-background/80 backdrop-blur-sm border-border/50" />
          <MiniMap 
            nodeColor={(node) => {
               if (node.type === 'section') return 'hsl(var(--rm-section-bg))';
               if (node.type === 'subtopic') return 'hsl(var(--rm-edge))';
               return 'hsl(var(--rm-topic-bg))';
            }}
            maskColor="hsl(var(--background) / 0.7)"
            className="rounded-md border border-border/50 shadow-md bg-background/50 backdrop-blur-sm"
          />
          <Background gap={24} size={2} variant={BackgroundVariant.Dots} color="hsl(var(--muted-foreground) / 0.3)" />
          <FitViewUpdater />
        </ReactFlow>
      </ReactFlowProvider>
      
      <RoadmapDrawer 
        open={drawerOpen} 
        onOpenChange={setDrawerOpen} 
        data={selectedNode} 
      />
    </div>
  );
};
