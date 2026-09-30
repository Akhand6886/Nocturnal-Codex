'use client';

import React from 'react';
import { Search, X, Maximize2, Minimize2, ZoomIn, ZoomOut, Move, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RoadmapControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalTopics: number;
  matchCount?: number;
  isInteractive: boolean;
  onToggleInteractive: () => void;
  onFitView: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export function RoadmapControls({
  searchQuery,
  onSearchChange,
  totalTopics,
  matchCount,
  isInteractive,
  onToggleInteractive,
  onFitView,
  onZoomIn,
  onZoomOut,
  isFullscreen,
  onToggleFullscreen,
}: RoadmapControlsProps) {
  return (
    <div className="w-full max-w-[1100px] mx-auto px-4 pt-3 pb-3">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl bg-card/70 dark:bg-card/40 border border-border/60 shadow-sm backdrop-blur-md">
        
        {/* Left: Scholarly Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search syllabus concepts, theorems, tools..."
            className="w-full pl-9 pr-9 py-2 text-xs font-mono rounded-lg bg-background/90 border border-border/60 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-1 focus:ring-primary/60 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right: Flow Graph Controls */}
        <div className="flex items-center justify-between sm:justify-end gap-2 flex-wrap">
          {/* Concept Count Badge */}
          <div className="text-[11px] font-mono text-muted-foreground px-2.5 py-1 rounded-md bg-muted/30 border border-border/40 hidden md:block">
            {searchQuery ? (
              <span>
                <strong className="text-primary font-bold">{matchCount}</strong> of {totalTopics} matched
              </span>
            ) : (
              <span>{totalTopics} Concepts</span>
            )}
          </div>

          <div className="h-4 w-px bg-border/40 hidden md:block" />

          {/* Interactive Mode Toggle */}
          <Button
            size="sm"
            variant={isInteractive ? 'default' : 'outline'}
            onClick={onToggleInteractive}
            className={`h-8 text-xs font-medium rounded-lg px-2.5 transition-all ${
              isInteractive
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'border-border/60 text-muted-foreground hover:text-foreground'
            }`}
            title={isInteractive ? 'Pan & zoom enabled (click to lock page scrolling)' : 'Enable pan & zoom'}
          >
            <Move className="w-3.5 h-3.5 mr-1.5" />
            {isInteractive ? 'Pan & Zoom: ON' : 'Free Explore'}
          </Button>

          {/* Zoom & Fit Controls */}
          <div className="flex items-center rounded-lg border border-border/60 bg-background/70 overflow-hidden">
            <Button
              size="icon"
              variant="ghost"
              onClick={onZoomIn}
              className="h-8 w-8 rounded-none hover:bg-muted/50 text-foreground/80 hover:text-foreground"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </Button>
            <div className="h-4 w-px bg-border/40" />
            <Button
              size="icon"
              variant="ghost"
              onClick={onZoomOut}
              className="h-8 w-8 rounded-none hover:bg-muted/50 text-foreground/80 hover:text-foreground"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </Button>
            <div className="h-4 w-px bg-border/40" />
            <Button
              size="icon"
              variant="ghost"
              onClick={onFitView}
              className="h-8 w-8 rounded-none hover:bg-muted/50 text-foreground/80 hover:text-foreground"
              title="Center / Fit View"
            >
              <Navigation className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Fullscreen Expand */}
          <Button
            size="icon"
            variant="outline"
            onClick={onToggleFullscreen}
            className="h-8 w-8 rounded-lg border-border/60 hover:bg-muted/50 text-foreground/80 hover:text-foreground"
            title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
