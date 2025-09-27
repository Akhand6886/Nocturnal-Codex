
// src/components/roadmap/ProgressTracker.tsx
'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, CheckCircle2 } from 'lucide-react';

interface ProgressTrackerProps {
  progress: number;
  totalNodes: number;
  completedNodes: number;
  roadmapTitle: string;
}

export function ProgressTracker({
  progress,
  totalNodes,
  completedNodes,
  roadmapTitle,
}: ProgressTrackerProps) {
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-blue-600';
    if (progress >= 40) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getProgressMessage = (progress: number) => {
    if (progress === 0) return 'Ready to start learning!';
    if (progress < 25) return 'Just getting started!';
    if (progress < 50) return 'Making good progress!';
    if (progress < 75) return 'Halfway there!';
    if (progress < 100) return 'Almost finished!';
    return 'Congratulations! 🎉';
  };

  return (
    <Card className="absolute top-4 left-4 z-10 w-80 shadow-lg bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-full bg-primary/10">
                {progress === 100 ? (
                  <Trophy className="h-4 w-4 text-yellow-600" />
                ) : (
                  <Target className="h-4 w-4 text-primary" />
                )}
              </div>
              <h3 className="font-semibold text-sm">Learning Progress</h3>
            </div>
            <Badge variant="outline" className={getProgressColor(progress)}>
              {progress}%
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                {completedNodes} of {totalNodes} topics
              </span>
              <span>{getProgressMessage(progress)}</span>
            </div>
          </div>

          {/* Roadmap Title */}
          <p className="text-xs text-muted-foreground truncate">
            {roadmapTitle}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
