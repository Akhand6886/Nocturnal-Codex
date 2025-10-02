
import { type Node, type Edge } from '@xyflow/react';
import { type RoadmapFlowData, type RoadmapNodeData } from '@/types/roadmap';

export function transformToReactFlow(roadmapData: RoadmapFlowData): {
  nodes: Node<RoadmapNodeData>[];
  edges: Edge[];
} {
  const nodes: Node<RoadmapNodeData>[] = roadmapData.nodes?.map((node: any) => ({
    id: node.id,
    type: 'roadmapNode',
    position: node.position || { x: 0, y: 0 },
    data: {
      id: node.id, // This is the crucial fix
      label: node.data?.label || 'Untitled',
      description: node.data?.description,
      category: node.data?.category,
      estimatedTime: node.data?.estimatedTime,
      completed: false, // Always start as not completed
      resources: node.data?.resources || [],
      prerequisites: node.data?.prerequisites || [],
      objectives: node.data?.objectives || [],
      ...node.data
    },
    draggable: true,
    selectable: true,
    style: {
      width: node.width,
      height: node.height,
      ...node.style,
      ...node.data?.style
    }
  })) || [];

  const edges: Edge[] = roadmapData.edges?.map((edge: any) => ({
    id: edge.id || `${edge.source}-${edge.target}`,
    source: edge.source,
    target: edge.target,
    type: edge.type || 'smoothstep',
    animated: edge.animated || false,
    style: {
      strokeWidth: 2,
      stroke: '#94a3b8',
      ...edge.style
    },
    markerEnd: {
      type: 'arrowclosed',
      width: 20,
      height: 20,
      color: '#94a3b8',
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
      (node.label || node.data?.label)
    )
  );
}

export function generateNodeId(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function calculateEstimatedCompletionTime(
  nodes: Node<RoadmapNodeData>[],
  completedNodeIds: string[]
): string {
  const remainingNodes = nodes.filter(node => !completedNodeIds.includes(node.id));
  
  let totalMinutes = 0;
  remainingNodes.forEach(node => {
    const timeStr = node.data.estimatedTime;
    if (timeStr) {
      // Parse time strings like "2 hours", "30 minutes", "1 week", etc.
      const match = timeStr.match(/(\d+)\s*(hour|minute|day|week|month)s?/i);
      if (match) {
        const value = parseInt(match[1]);
        const unit = match[2].toLowerCase();
        
        switch (unit) {
          case 'minute':
            totalMinutes += value;
            break;
          case 'hour':
            totalMinutes += value * 60;
            break;
          case 'day':
            totalMinutes += value * 60 * 8; // 8 hours per day
            break;
          case 'week':
            totalMinutes += value * 60 * 8 * 5; // 5 days per week
            break;
          case 'month':
            totalMinutes += value * 60 * 8 * 20; // 20 days per month
            break;
        }
      }
    }
  });

  if (totalMinutes === 0) return 'Unknown';
  
  const hours = Math.floor(totalMinutes / 60);
  const days = Math.floor(hours / 8);
  const weeks = Math.floor(days / 5);
  const months = Math.floor(weeks / 4);

  if (months > 0) return `${months} month${months > 1 ? 's' : ''}`;
  if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''}`;
  if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
  return `${totalMinutes} minute${totalMinutes > 1 ? 's' : ''}`;
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

export function exportProgress(
  roadmapSlug: string,
  completedNodeIds: string[],
  nodes: Node<RoadmapNodeData>[]
): string {
  const exportData = {
    roadmapSlug,
    completedNodeIds,
    progress: getProgressPercentage(nodes.map(n => ({
      ...n,
      data: { ...n.data, completed: completedNodeIds.includes(n.id) }
    }))),
    exportDate: new Date().toISOString(),
    totalNodes: nodes.length,
    completedNodes: completedNodeIds.length
  };
  
  return JSON.stringify(exportData, null, 2);
}

export function importProgress(jsonString: string): {
  roadmapSlug: string;
  completedNodeIds: string[];
} | null {
  try {
    const data = JSON.parse(jsonString);
    if (data.roadmapSlug && Array.isArray(data.completedNodeIds)) {
      return {
        roadmapSlug: data.roadmapSlug,
        completedNodeIds: data.completedNodeIds
      };
    }
  } catch (error) {
    console.error('Failed to import progress:', error);
  }
  return null;
}
