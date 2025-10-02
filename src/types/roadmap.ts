
// src/types/roadmap.ts
import { type Node, type Edge } from '@xyflow/react';

export interface RoadmapNodeData {
  id: string;
  label: string;
  description?: string;
  category?: string;
  estimatedTime?: string;
  completed?: boolean;
  resources?: Resource[];
  prerequisites?: string[];
  objectives?: string[];
  highlighted?: boolean;
  position?: { x: number; y: number };
  style?: React.CSSProperties;
}

export interface Resource {
  title: string;
  url: string;
  type: 'article' | 'video' | 'course' | 'documentation' | 'book' | 'tool';
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  duration?: string;
  free?: boolean;
}

export interface RoadmapLink {
    title: string;
    slug: string;
}

export interface RoadmapFlowData {
  nodes: RoadmapNodeData[];
  edges: Array<{
    id?: string;
    source: string;
    target: string;
    type?: string;
    animated?: boolean;
    style?: Record<string, any>;
  }>;
  viewport?: {
    x: number;
    y: number;
    zoom: number;
  };
  metadata?: {
    title: string;
    version: string;
    lastUpdated: string;
    totalTopics: number;
    prerequisites?: RoadmapLink[];
    relatedRoadmaps?: RoadmapLink[];
  };
}

export interface RoadmapProgress {
  userId: string;
  roadmapSlug: string;
  completedNodes: string[];
  lastAccessed: Date;
  totalProgress: number;
}

export type RoadmapNode = Node<RoadmapNodeData>;
export type RoadmapEdge = Edge;
