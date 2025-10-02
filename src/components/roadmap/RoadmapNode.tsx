
// src/components/roadmap/RoadmapNode.tsx
'use client';

import React, { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Clock, BookOpen, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type RoadmapNodeData } from '@/types/roadmap';

export const RoadmapNode = memo<NodeProps<RoadmapNodeData>>(({ data, selected }) => {
  const {
    label,
    category,
    completed = false,
    content,
    highlighted = false,
  } = data;

  const estimatedTime = content?.description?.length ? `${Math.ceil(content.description.length / 1000)} min read` : undefined;
  const resources = content?.resources || [];

  // Get category color
  const getCategoryColor = (category?: string) => {
    switch (category?.toLowerCase()) {
      case 'foundation':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'programming':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'algorithms':
        return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      case 'tools':
        return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      case 'advanced':
        return 'bg-red-500/10 text-red-600 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <>
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-muted-foreground border-2 border-background"
        isConnectable={false}
      />

      <Card
        className={cn(
          'min-w-[200px] max-w-[250px] cursor-pointer transition-all duration-200 shadow-md',
          'hover:shadow-lg hover:scale-105',
          selected && 'ring-2 ring-primary ring-offset-2',
          highlighted && 'ring-2 ring-yellow-400 ring-offset-2',
          completed && 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800'
        )}
      >
        <CardContent className="p-4">
          {/* Header with completion status */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h4 className="font-semibold text-sm leading-tight text-foreground">
                {label}
              </h4>
            </div>
            <div className="ml-2 flex-shrink-0">
              {completed ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
          </div>

          {/* Category and Time Info */}
          <div className="flex flex-wrap gap-2 mb-2">
            {category && (
              <Badge 
                variant="outline" 
                className={cn('text-xs', getCategoryColor(category))}
              >
                {category}
              </Badge>
            )}
          </div>

          {/* Estimated Time */}
          {estimatedTime && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{estimatedTime}</span>
            </div>
          )}

          {/* Resource Count */}
          {resources.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <BookOpen className="h-3 w-3" />
              <span>{resources.length} resource{resources.length > 1 ? 's' : ''}</span>
            </div>
          )}

          {/* Progress indicator */}
          <div
            className={cn(
              'absolute bottom-0 left-0 h-1 transition-all duration-300',
              completed ? 'w-full bg-green-500' : 'w-0 bg-gray-300'
            )}
          />
        </CardContent>
      </Card>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-muted-foreground border-2 border-background"
        isConnectable={false}
      />
    </>
  );
});

RoadmapNode.displayName = 'RoadmapNode';
