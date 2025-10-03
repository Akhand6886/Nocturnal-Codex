'use client';

import './EditorRoadmapRenderer.css';
import React, { FC } from 'react';
import ReactFlow, { Background, Controls, MiniMap, Node, Edge, ReactFlowProvider, useReactFlow } from '@xyflow/react';
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
    fitView({ duration: 200 });
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
