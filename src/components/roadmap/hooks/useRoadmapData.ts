
import { useState, useEffect, useMemo } from 'react';
import { type Node, type Edge } from '@xyflow/react';
import { transformToReactFlow, loadRoadmapFlowData } from '@/lib/roadmap-utils';
import { type RoadmapFlowData, type RoadmapNodeData } from '@/types/roadmap';

interface UseRoadmapDataProps {
  slug: string;
  initialFlowData?: RoadmapFlowData;
}

interface UseRoadmapDataReturn {
  nodes: Node<RoadmapNodeData>[];
  edges: Edge[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useRoadmapData({ 
  slug, 
  initialFlowData 
}: UseRoadmapDataProps): UseRoadmapDataReturn {
  const [flowData, setFlowData] = useState<RoadmapFlowData | null>(initialFlowData || null);
  const [loading, setLoading] = useState(!initialFlowData);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (initialFlowData) return; // Don't fetch if we have initial data
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await loadRoadmapFlowData(slug);
      if (data) {
        setFlowData(data);
      } else {
        setError(`Failed to load roadmap data for ${slug}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    setFlowData(null);
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [slug]);

  const { nodes, edges } = useMemo(() => {
    if (!flowData) {
      return { nodes: [], edges: [] };
    }
    
    try {
      return transformToReactFlow(flowData);
    } catch (err) {
      setError('Failed to transform roadmap data');
      return { nodes: [], edges: [] };
    }
  }, [flowData]);

  return {
    nodes,
    edges,
    loading,
    error,
    refetch,
  };
}
