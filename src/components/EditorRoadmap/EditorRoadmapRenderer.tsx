'use client';

import { useEffect, useRef, useState } from 'react';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNodeClick = (event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    // We can re-enable the sidebar later if needed.
    // setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedNode(null);
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
      <div className="border-t bg-gray-50 p-4 text-center text-sm text-gray-600">
        Find the detailed version of this roadmap along with other similar roadmaps · 
        <a href="https://roadmap.sh" className="ml-1 text-blue-600 hover:underline">roadmap.sh</a>
      </div>
    </>
  );
}
