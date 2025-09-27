// src/components/roadmap/hooks/useRoadmapData.ts
'use client';

import { useState, useEffect } from 'react';
import { type RoadmapFlowData } from '@/types/roadmap';

export function useRoadmapData(slug: string) {
  const [flowData, setFlowData] = useState<RoadmapFlowData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const response = await fetch(`/roadmap-data/${slug}.json`);
        if (!response.ok) {
          throw new Error(`Failed to fetch roadmap data: ${response.statusText}`);
        }
        const data: RoadmapFlowData = await response.json();
        setFlowData(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'An unknown error occurred');
        console.error(`Failed to load roadmap data for ${slug}:`, err);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadData();
    }
  }, [slug]);

  return { flowData, loading, error };
}
