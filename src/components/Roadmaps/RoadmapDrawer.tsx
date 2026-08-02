import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ExternalLink, BookOpen, CheckCircle, Clock, Circle, Sparkles, Code2, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { NodeStatus } from '@/lib/roadmapProgress';

export interface RoadmapResource {
  title: string;
  url: string;
  type?: string;
}

export interface SelectedNodeData {
  id: string;
  label: string;
  description?: string;
  status?: NodeStatus;
  resources?: RoadmapResource[];
  codeSnippet?: string;
  prerequisites?: string[];
}

interface RoadmapDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: SelectedNodeData | null;
  onStatusChange?: (nodeId: string, status: NodeStatus) => void;
}

const STATUS_CONFIG: Record<NodeStatus, { icon: React.ReactNode; label: string; className: string }> = {
  done: {
    icon: <CheckCircle className="w-4 h-4" />,
    label: 'Mastered',
    className: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  },
  learning: {
    icon: <Clock className="w-4 h-4" />,
    label: 'In Progress',
    className: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/30',
  },
  pending: {
    icon: <Circle className="w-4 h-4" />,
    label: 'Unexplored',
    className: 'text-muted-foreground bg-muted/50 border-border',
  },
};

const RESOURCE_TYPE_ICONS: Record<string, string> = {
  video: '🎬',
  article: '📄',
  course: '🎓',
  docs: '📚',
  tool: '🛠️',
  github: '💻',
};

export function RoadmapDrawer({ open, onOpenChange, data, onStatusChange }: RoadmapDrawerProps) {
  if (!data) return null;

  const currentStatus: NodeStatus = data.status || 'pending';
  const statusConfig = STATUS_CONFIG[currentStatus];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col h-full border-l border-border bg-background/95 backdrop-blur-xl shadow-2xl p-0">
        {/* Header */}
        <SheetHeader className="p-6 pb-5 border-b border-border bg-gradient-to-br from-primary/5 via-muted/20 to-transparent">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className={`text-xs px-2.5 py-1 rounded-md font-semibold inline-flex items-center gap-1.5 ${statusConfig.className}`}>
                  {statusConfig.icon}
                  {statusConfig.label}
                </Badge>
              </div>
              <SheetTitle className="text-xl font-bold tracking-tight text-foreground roadmap-font leading-snug">
                {data.label}
              </SheetTitle>
              {data.description && (
                <SheetDescription className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
                  {data.description}
                </SheetDescription>
              )}
            </div>
          </div>

          {/* Quick Action Status Toggles */}
          {onStatusChange && (
            <div className="flex items-center gap-2 pt-4 mt-2 border-t border-border/40">
              <Button
                size="sm"
                variant={currentStatus === 'done' ? 'default' : 'outline'}
                onClick={() => onStatusChange(data.id, currentStatus === 'done' ? 'pending' : 'done')}
                className={`h-8 text-xs font-semibold rounded-lg gap-1.5 transition-all ${
                  currentStatus === 'done'
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20'
                    : 'hover:border-emerald-500/50 hover:text-emerald-600'
                }`}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                {currentStatus === 'done' ? 'Mastered' : 'Mark as Mastered'}
              </Button>

              <Button
                size="sm"
                variant={currentStatus === 'learning' ? 'default' : 'outline'}
                onClick={() => onStatusChange(data.id, currentStatus === 'learning' ? 'pending' : 'learning')}
                className={`h-8 text-xs font-semibold rounded-lg gap-1.5 transition-all ${
                  currentStatus === 'learning'
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'hover:border-amber-500/50 hover:text-amber-600'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                {currentStatus === 'learning' ? 'In Progress' : 'Mark In Progress'}
              </Button>
            </div>
          )}
        </SheetHeader>
        
        {/* Content */}
        <ScrollArea className="flex-1 p-6 space-y-6">
          {/* Code Snippet Example Section */}
          {data.codeSnippet && (
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70 mb-3 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-primary" />
                Key Concept / Code Example
              </h3>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs overflow-x-auto whitespace-pre-wrap shadow-inner leading-relaxed">
                {data.codeSnippet}
              </pre>
            </div>
          )}

          {/* Prerequisites */}
          {data.prerequisites && data.prerequisites.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70 mb-3 flex items-center gap-2">
                <Play className="w-3.5 h-3.5 text-accent" />
                Prerequisites
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.prerequisites.map((prereq, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs font-medium px-2.5 py-1 rounded-md">
                    {prereq}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Resources List */}
          {data.resources && data.resources.length > 0 ? (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70 mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                Recommended Resources ({data.resources.length})
              </h3>
              <ul className="space-y-2.5">
                {data.resources.map((resource, index) => {
                  const typeIcon = resource.type ? RESOURCE_TYPE_ICONS[resource.type.toLowerCase()] || '📎' : '📎';
                  return (
                    <li key={index}>
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 p-3 rounded-xl border border-border/60 bg-card hover:bg-primary/5 hover:border-primary/40 transition-all duration-200 shadow-sm"
                      >
                        <span className="text-lg flex-shrink-0" role="img" aria-label={resource.type || 'resource'}>
                          {typeIcon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors truncate">
                            {resource.title}
                          </p>
                          {resource.type && (
                            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                              {resource.type}
                            </span>
                          )}
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary flex-shrink-0 transition-colors" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <div className="text-center py-10 rounded-xl bg-muted/10 border border-dashed border-border/50">
              <Sparkles className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground font-medium">Curated Resources Loaded</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Explore official documentation and guide topics above</p>
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/10 flex justify-end">
          <SheetClose asChild>
            <Button variant="outline" size="sm" className="rounded-lg w-full sm:w-auto">
              Close
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
