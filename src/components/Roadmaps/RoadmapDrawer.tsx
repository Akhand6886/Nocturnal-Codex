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
import { ExternalLink, BookOpen, CheckCircle, Clock, Circle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface RoadmapResource {
  title: string;
  url: string;
  type?: string;
}

export interface SelectedNodeData {
  id: string;
  label: string;
  description?: string;
  status?: 'done' | 'learning' | 'pending';
  resources?: RoadmapResource[];
}

interface RoadmapDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: SelectedNodeData | null;
}

const STATUS_CONFIG: Record<string, { icon: React.ReactNode; label: string; className: string }> = {
  done: {
    icon: <CheckCircle className="w-4 h-4" />,
    label: 'Completed',
    className: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
  learning: {
    icon: <Clock className="w-4 h-4" />,
    label: 'In Progress',
    className: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20',
  },
  pending: {
    icon: <Circle className="w-4 h-4" />,
    label: 'Not Started',
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

export function RoadmapDrawer({ open, onOpenChange, data }: RoadmapDrawerProps) {
  if (!data) return null;

  const statusConfig = data.status ? STATUS_CONFIG[data.status] : null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col h-full border-l border-border bg-background/95 backdrop-blur-xl shadow-2xl p-0">
        {/* Header */}
        <SheetHeader className="p-6 pb-5 border-b border-border bg-gradient-to-br from-muted/40 to-transparent">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <SheetTitle className="text-xl font-bold tracking-tight text-foreground roadmap-font leading-snug">
                {data.label}
              </SheetTitle>
              {data.description && (
                <SheetDescription className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
                  {data.description}
                </SheetDescription>
              )}
              {statusConfig && (
                <Badge variant="outline" className={`mt-3 text-xs px-2.5 py-1 rounded-md font-semibold inline-flex items-center gap-1.5 ${statusConfig.className}`}>
                  {statusConfig.icon}
                  {statusConfig.label}
                </Badge>
              )}
            </div>
          </div>
        </SheetHeader>
        
        {/* Content */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            {data.resources && data.resources.length > 0 ? (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70 mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  Resources ({data.resources.length})
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
                          className="group flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-card hover:bg-primary/5 hover:border-primary/30 transition-all duration-200"
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
              <div className="text-center py-12 rounded-xl bg-muted/10 border border-dashed border-border/50">
                <Sparkles className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground font-medium">No resources listed yet</p>
                <p className="text-xs text-muted-foreground/60 mt-1">Resources will be added soon</p>
              </div>
            )}
          </div>
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
