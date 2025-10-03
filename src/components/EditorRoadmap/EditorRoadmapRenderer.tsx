'use client';

import './EditorRoadmapRenderer.css';
import React, { FC } from 'react';
import ReactFlow, { Background, Controls, MiniMap, type Node, type Edge, ReactFlowProvider, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface EditorRoadmapRendererProps {
  roadmapId: string;
  roadmapData: {
    nodes: Node[];
    edges: Edge[];
  };
}

const FitViewUpdater: FC = () => {
  const { fitView } = useReactFlow();
  React.useEffect(() => {
    // Adding a small delay to ensure the container is sized correctly before fitting the view.
    const timer = setTimeout(() => fitView({ duration: 200, padding: 0.1 }), 10);
    return () => clearTimeout(timer);
  }, [fitView]);
  return null;
};

export const EditorRoadmapRenderer: FC<EditorRoadmapRendererProps> = ({ roadmapId, roadmapData }) => {
  if (!roadmapData || !roadmapData.nodes || !roadmapData.edges) {
    return <div>Loading roadmap data...</div>;
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
