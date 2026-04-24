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
import { ExternalLink, BookOpen, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

export function RoadmapDrawer({ open, onOpenChange, data }: RoadmapDrawerProps) {
  if (!data) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col h-full border-l border-border bg-background/95 backdrop-blur-md shadow-2xl p-0">
        <SheetHeader className="p-6 border-b border-border bg-muted/30">
          <div className="flex items-start justify-between gap-4">
            <div>
              <SheetTitle className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2 roadmap-font">
                {data.label}
                {data.status === 'done' && <CheckCircle className="w-5 h-5 text-green-500" />}
              </SheetTitle>
              {data.description && (
                <SheetDescription className="mt-2 text-base text-muted-foreground leading-relaxed">
                  {data.description}
                </SheetDescription>
              )}
            </div>
            {/* SheetClose is handled natively by SheetContent, but we can have custom if needed */}
          </div>
        </SheetHeader>
        
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            {data.resources && data.resources.length > 0 ? (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Recommended Resources
                </h3>
                <ul className="space-y-3">
                  {data.resources.map((resource, index) => (
                    <li key={index}>
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-start gap-3 p-3 rounded-lg border border-border/50 bg-card hover:bg-muted/50 hover:border-primary/50 transition-all duration-200"
                      >
                        <div className="bg-primary/10 p-2 rounded-md mt-0.5">
                           <ExternalLink className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {resource.title}
                          </p>
                          {resource.type && (
                            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                              {resource.type}
                            </span>
                          )}
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-center py-10 bg-muted/20 rounded-lg border border-dashed border-border">
                <p className="text-muted-foreground">No specific resources listed for this topic yet.</p>
              </div>
            )}
            
            {/* Status Toggles could go here in the future */}
          </div>
        </ScrollArea>
        <div className="p-4 border-t border-border bg-muted/20 flex justify-end">
          <SheetClose asChild>
            <Button variant="outline" className="w-full sm:w-auto">Close</Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
