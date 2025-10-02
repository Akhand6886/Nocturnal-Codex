
import { type Node, type Edge } from '@xyflow/react';
import { type RoadmapFlowData, type RoadmapNodeData, type TopicContent } from '@/types/roadmap';

export function transformToReactFlow(
  blueprint: RoadmapFlowData,
  topicsContent: Record<string, TopicContent>
): {
  nodes: Node<RoadmapNodeData>[];
  edges: Edge[];
} {
  const nodes: Node<RoadmapNodeData>[] = blueprint.nodes?.map((node) => ({
    id: node.id,
    type: 'roadmapNode',
    position: node.position || { x: 0, y: 0 },
    data: {
      id: node.id,
      label: node.label || 'Untitled', // Correctly assign the label here
      category: node.category,
      content: topicsContent ? topicsContent[node.id] : undefined,
      completed: false, 
      highlighted: false,
    },
    draggable: true,
    selectable: true,
    style: {
      ...node.style,
    }
  })) || [];

  const edges: Edge[] = blueprint.edges?.map((edge: any) => ({
    id: edge.id || `${edge.source}-${edge.target}`,
    source: edge.source,
    target: edge.target,
    type: edge.type || 'smoothstep',
    animated: edge.animated || false,
    style: {
      strokeWidth: edge.style?.strokeWidth || 1.5,
      stroke: edge.style?.stroke || '#a1a1aa', // neutral-400
      ...(edge.style || {})
    },
    markerEnd: {
      type: 'arrowclosed',
      width: 15,
      height: 15,
      color: edge.style?.stroke || '#a1a1aa',
    }
  })) || [];

  return { nodes, edges };
}

export function getProgressPercentage(nodes: Node<RoadmapNodeData>[]): number {
  if (!nodes.length) return 0;
  const completedNodes = nodes.filter(node => node.data.completed);
  return Math.round((completedNodes.length / nodes.length) * 100);
}

export function validateRoadmapData(data: any): data is RoadmapFlowData {
  return (
    data &&
    typeof data === 'object' &&
    Array.isArray(data.nodes) &&
    Array.isArray(data.edges) &&
    data.nodes.every((node: any) => 
      node.id && 
      typeof node.id === 'string' &&
      node.label
    )
  );
}


export function calculateEstimatedCompletionTime(
  nodes: Node<RoadmapNodeData>[],
  completedNodeIds: string[]
): string {
    const totalMinutes = nodes.reduce((acc, node) => {
        if (completedNodeIds.includes(node.id)) {
            return acc;
        }

        const timeString = node.data.content?.resources
            ?.reduce((resourceAcc, resource) => resourceAcc + (parseInt(resource.duration || '0')), 0).toString();

        if (timeString) {
            const time = parseInt(timeString, 10);
            if (!isNaN(time)) {
                return acc + time;
            }
        }
        return acc;
    }, 0);

    if (totalMinutes < 60) {
        return `${totalMinutes}m`;
    } else {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h ${minutes}m`;
    }
}


export function getNextRecommendedNodes(
  nodes: Node<RoadmapNodeData>[],
  edges: Edge[],
  completedNodeIds: string[]
): Node<RoadmapNodeData>[] {
  // Find nodes that have all their prerequisites completed
  return nodes
    .filter(node => !completedNodeIds.includes(node.id))
    .filter(node => {
      // Get all nodes that lead to this node (prerequisites)
      const prerequisiteEdges = edges.filter(edge => edge.target === node.id);
      const prerequisiteNodeIds = prerequisiteEdges.map(edge => edge.source);
      
      // Check if all prerequisites are completed
      return prerequisiteNodeIds.every(prereqId => completedNodeIds.includes(prereqId));
    })
    .slice(0, 3); // Return max 3 recommendations
}
