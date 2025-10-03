
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
          minZoom={0.5}
          maxZoom={1.5}
          defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={true}
        >
          <Background />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>

      {/* Info box at bottom */}
      <div className="border-t bg-card p-4 text-center text-sm text-muted-foreground">
        Find the detailed version of this roadmap and more at{' '}
        <a 
            href={`https://roadmap.sh/${roadmapId}`} 
            className="ml-1 text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
        >
            roadmap.sh/{roadmapId}
        </a>
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
