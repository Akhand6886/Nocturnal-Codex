// src/types/roadmap.ts
import { type Node, type Edge } from '@xyflow/react';

export type ProgressStatus = 'pending' | 'learning' | 'done' | 'skipped';

// Represents the data properties of a single node in the React Flow graph.
// This data comes from the JSON blueprint and is enriched with content.
export interface RoadmapNodeData {
  id: string;
  label: string;
  // Content is now separate
  content?: TopicContent; 
  // Fields from JSON blueprint
  category?: string;
  position?: { x: number; y: number };
  style?: React.CSSProperties;
  // State-related fields
  status?: ProgressStatus;
  highlighted?: boolean;
}

// Represents the content for a single topic, loaded from a markdown file.
export interface TopicContent {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  resources: Resource[];
  rawContent: string; // The raw markdown body
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

// Represents the structure of the JSON blueprint file.
export interface RoadmapFlowData {
  nodes: Array<{
    id: string;
    label: string;
    category?: string;
    position?: { x: number, y: number };
    style?: React.CSSProperties;
  }>;
  edges: Array<{
    id?: string;
    source: string;
    target: string;
    type?: string;
    animated?: boolean;
    style?: Record<string, any>;
  }>;
  metadata?: {
    prerequisites?: RoadmapLink[];
    relatedRoadmaps?: RoadmapLink[];
  };
}

export interface RoadmapProgress {
  [nodeId: string]: ProgressStatus;
}

export type RoadmapNode = Node<RoadmapNodeData>;
export type RoadmapEdge = Edge;
