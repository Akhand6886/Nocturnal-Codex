"use client";

import { useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Connection,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { BaseNode } from "@/components/ui/base-node";
import { LabeledHandle } from "@/components/ui/labeled-handle";

const nodeTypes = {
  custom: BaseNode,
};

const initialNodes: Node[] = [
  // Tier 1
  { id: 'ml', type: 'custom', position: { x: 0, y: 0 }, data: { label: 'Machine Learning', variant: 'primary' } },
  
  // Tier 2
  { id: 'intro', type: 'custom', position: { x: 0, y: 100 }, data: { label: 'Introduction', variant: 'primary' } },
  
  // Tier 3
  { id: 'math', type: 'custom', position: { x: 0, y: 200 }, data: { label: 'Mathematical Foundations', variant: 'primary' } },
  
  // Tier 4
  { id: 'calculus', type: 'custom', position: { x: -300, y: 300 }, data: { label: 'Calculus', variant: 'primary' } },
  { id: 'linalg', type: 'custom', position: { x: 0, y: 300 }, data: { label: 'Linear Algebra', variant: 'primary' } },
  { id: 'proba', type: 'custom', position: { x: 300, y: 300 }, data: { label: 'Probability', variant: 'primary' } },
  
  // Tier 5
  { id: 'prog', type: 'custom', position: { x: 0, y: 450 }, data: { label: 'Programming Fundamentals', variant: 'primary' } },

  // Tier 6
  { id: 'python', type: 'custom', position: { x: 0, y: 550 }, data: { label: 'Python', variant: 'primary' } },

  // Tier 7
  { id: 'basics', type: 'custom', position: { x: -150, y: 650 }, data: { label: 'Basic Syntax', variant: 'primary' } },
  { id: 'oop', type: 'custom', position: { x: 150, y: 650 }, data: { label: 'Object Oriented Programming', variant: 'default' } },
  { id: 'libs', type: 'custom', position: { x: 450, y: 650 }, data: { label: 'Essential Libraries', variant: 'primary' } },

  // Tier 8 - Libs
  { id: 'numpy', type: 'custom', position: { x: 350, y: 750 }, data: { label: 'Numpy' } },
  { id: 'pandas', type: 'custom', position: { x: 550, y: 750 }, data: { label: 'Pandas' } },
  { id: 'matplotlib', type: 'custom', position: { x: 350, y: 820 }, data: { label: 'Matplotlib' } },
  { id: 'seaborn', type: 'custom', position: { x: 550, y: 820 }, data: { label: 'Seaborn' } },
];

const initialEdges: Edge[] = [
  { id: 'e-ml-intro', source: 'ml', target: 'intro', type: 'straight' },
  { id: 'e-intro-math', source: 'intro', target: 'math', type: 'straight' },
  
  { id: 'e-math-calc', source: 'math', target: 'calculus', type: 'straight' },
  { id: 'e-math-linalg', source: 'math', target: 'linalg', type: 'straight' },
  { id: 'e-math-proba', source: 'math', target: 'proba', type: 'straight' },

  { id: 'e-linalg-prog', source: 'linalg', target: 'prog', type: 'straight' },
  { id: 'e-prog-python', source: 'prog', target: 'python', type: 'straight' },

  { id: 'e-python-basics', source: 'python', target: 'basics', type: 'straight' },
  { id: 'e-python-oop', source: 'python', target: 'oop', type: 'straight' },
  { id: 'e-python-libs', source: 'python', target: 'libs', type: 'straight' },

  { id: 'e-libs-numpy', source: 'libs', target: 'numpy', type: 'straight' },
  { id: 'e-libs-pandas', source: 'libs', target: 'pandas', type: 'straight' },
  { id: 'e-libs-matplotlib', source: 'libs', target: 'matplotlib', type: 'straight' },
  { id: 'e-libs-seaborn', source: 'libs', target: 'seaborn', type: 'straight' },
];

const proOptions = { hideAttribution: true };

export default function MachineLearningRoadmapPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="w-full h-[1200px] bg-background">
        <header className="py-8 text-center">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">Machine Learning Roadmap</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Step by step guide to becoming a Machine Learning Engineer</p>
        </header>
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            proOptions={proOptions}
            className="bg-gray-50 dark:bg-gray-950"
        >
        </ReactFlow>
    </div>
  );
}
