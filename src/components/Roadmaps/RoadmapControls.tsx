'use client';

import React from 'react';
import { Search, RotateCcw, CheckCircle2, Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
    <div className="w-full max-w-[1000px] mx-auto px-4 pt-4 pb-2">
      <div className="p-3.5 sm:p-4 rounded-2xl bg-card/90 border border-border/80 shadow-sm backdrop-blur-xl space-y-3">
        {/* Top Row: Search & Legend Indicators */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Filter or search topics..."
              className="w-full pl-9 pr-8 py-2 text-xs font-medium rounded-xl bg-background border border-border/70 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Clean Legend Badges */}
          <div className="flex items-center gap-3 text-[11px] font-medium text-muted-foreground self-center sm:self-auto">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-sm" /> Mastered
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shadow-sm" /> Learning
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block shadow-sm" /> Recommended
            </span>
          </div>
        </div>

        {/* Bottom Row: Status Filter Pills & Progress Meter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-border/50">
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <Button
              size="sm"
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              onClick={() => onStatusFilterChange('all')}
              className={`h-7 text-xs px-3 rounded-lg font-bold transition-all ${
                statusFilter === 'all' ? 'bg-primary text-primary-foreground shadow-sm' : 'border-border/60'
              }`}
            >
              All ({totalTopics})
            </Button>
            <Button
              size="sm"
              variant={statusFilter === 'done' ? 'default' : 'outline'}
              onClick={() => onStatusFilterChange('done')}
              className={`h-7 text-xs px-3 rounded-lg font-bold transition-all ${
                statusFilter === 'done'
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                  : 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              Mastered ({completedCount})
            </Button>
            <Button
              size="sm"
              variant={statusFilter === 'learning' ? 'default' : 'outline'}
              onClick={() => onStatusFilterChange('learning')}
              className={`h-7 text-xs px-3 rounded-lg font-bold transition-all ${
                statusFilter === 'learning'
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm'
                  : 'border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10'
              }`}
            >
              <Clock className="w-3.5 h-3.5 mr-1" />
              In Progress ({learningCount})
            </Button>
          </div>

          {/* Progress Bar & Reset Button */}
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-24 sm:w-32 h-2 bg-muted rounded-full overflow-hidden border border-border/40 p-0.5 shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-primary to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="text-xs font-bold font-mono text-foreground">
                {percent}%
              </span>
            </div>

            <Button
              size="sm"
              variant="ghost"
              onClick={onResetProgress}
              className="h-7 text-xs text-muted-foreground hover:text-destructive px-2 rounded-lg"
              title="Reset progress"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
