
'use client';

import { useState } from 'react';
import { ReactFlow, Background, Controls, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './EditorRoadmapRenderer.css';

interface EditorRoadmapRendererProps {
  roadmapId: string;
  roadmapData: {
    nodes: Node[];
    edges: Edge[];
  };
}

export function EditorRoadmapRenderer({ roadmapId, roadmapData }: EditorRoadmapRendererProps) {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const handleNodeClick = (event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  };

  return (
    <>
      <div className="relative w-full" style={{ height: 'calc(100vh - 200px)' }}>
        <ReactFlow
          nodes={roadmapData.nodes}
          edges={roadmapData.edges}
          onNodeClick={handleNodeClick}
          fitView
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={true}
          zoomOnScroll={false}
          panOnDrag={false}
          preventScrolling={false}
        >
          <Background />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>

       {/* You can re-enable and build a sidebar for selected nodes later */}
       {selectedNode && (
        <div className="fixed top-0 right-0 h-full w-96 bg-background border-l shadow-lg z-10 p-4 overflow-y-auto">
            <button onClick={() => setSelectedNode(null)} className="absolute top-2 right-2 p-1">X</button>
            <h2 className="text-xl font-bold mb-4">{selectedNode.data.label}</h2>
            <p className="text-sm text-muted-foreground">{JSON.stringify(selectedNode.data)}</p>
        </div>
      )}
    </>
  );
}
