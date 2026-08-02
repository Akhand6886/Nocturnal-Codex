'use client';

import React from 'react';
import { Search, RotateCcw, Filter, CheckCircle2, Clock, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { NodeStatus } from '@/lib/roadmapProgress';

interface RoadmapControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: 'all' | NodeStatus;
  onStatusFilterChange: (filter: 'all' | NodeStatus) => void;
  totalTopics: number;
  completedCount: number;
  learningCount: number;
  onResetProgress: () => void;
}

export function RoadmapControls({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  totalTopics,
  completedCount,
  learningCount,
  onResetProgress,
}: RoadmapControlsProps) {
  const percent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  return (
    <div className="w-full bg-card/80 backdrop-blur-xl border-y border-border/60 py-4 px-4 sm:px-6 shadow-sm mb-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Search Bar & Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64 min-w-[200px]">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search topics..."
              className="w-full pl-9 pr-3 py-1.5 text-xs font-medium rounded-xl bg-background border border-border/70 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            />
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1.5 bg-background/60 p-1 rounded-xl border border-border/60">
            <Button
              size="sm"
              variant={statusFilter === 'all' ? 'default' : 'ghost'}
              onClick={() => onStatusFilterChange('all')}
              className="h-7 text-xs px-2.5 rounded-lg font-semibold"
            >
              All Topics
            </Button>
            <Button
              size="sm"
              variant={statusFilter === 'done' ? 'default' : 'ghost'}
              onClick={() => onStatusFilterChange('done')}
              className={`h-7 text-xs px-2.5 rounded-lg font-semibold ${
                statusFilter === 'done' ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'text-emerald-600 dark:text-emerald-400'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              Mastered ({completedCount})
            </Button>
            <Button
              size="sm"
              variant={statusFilter === 'learning' ? 'default' : 'ghost'}
              onClick={() => onStatusFilterChange('learning')}
              className={`h-7 text-xs px-2.5 rounded-lg font-semibold ${
                statusFilter === 'learning' ? 'bg-amber-500 hover:bg-amber-400 text-slate-950' : 'text-amber-600 dark:text-amber-400'
              }`}
            >
              <Clock className="w-3.5 h-3.5 mr-1" />
              In Progress ({learningCount})
            </Button>
          </div>
        </div>

        {/* Right: Progress Meter & Reset */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-border/40 pt-3 md:pt-0">
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Roadmap Progress
              </div>
              <div className="text-xs font-bold text-foreground font-mono">
                {completedCount} / {totalTopics} Topics ({percent}%)
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-28 sm:w-36 h-2.5 bg-muted rounded-full overflow-hidden border border-border/50 p-0.5 shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-primary to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          <Button
            size="sm"
            variant="ghost"
            onClick={onResetProgress}
            className="h-7 text-xs text-muted-foreground hover:text-destructive px-2"
            title="Reset roadmap progress"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
