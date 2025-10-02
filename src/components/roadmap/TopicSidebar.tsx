// src/components/roadmap/TopicSidebar.tsx
'use client';

import React from 'react';
import { type Node } from '@xyflow/react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  BookOpen,
  Video,
  FileText,
  Laptop,
  X,
  Target,
  List,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { type RoadmapNodeData, type Resource, type TopicContent } from '@/types/roadmap';
import { MarkdownRenderer } from '@/components/content/markdown-renderer';

interface TopicSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedNode: Node<RoadmapNodeData> | null;
  onToggleCompletion: (nodeId: string) => void;
  roadmapSlug: string;
}

export function TopicSidebar({
  isOpen,
  onClose,
  selectedNode,
  onToggleCompletion,
}: TopicSidebarProps) {
  if (!selectedNode) return null;

  const { data } = selectedNode;
  const {
    label,
    category,
    completed = false,
    content, // This is the detailed content from the markdown file
  } = data;
  
  const estimatedTime = content?.description?.length ? `${Math.ceil(content.description.length / 1000)} min read` : undefined;

  // Get resource icon based on type
  const getResourceIcon = (type: Resource['type']) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'course':
        return <Laptop className="h-4 w-4" />;
      case 'documentation':
        return <FileText className="h-4 w-4" />;
      case 'book':
        return <BookOpen className="h-4 w-4" />;
      default:
        return <ExternalLink className="h-4 w-4" />;
    }
  };

  // Get category color
  const getCategoryColor = (cat?: string) => {
    switch (cat?.toLowerCase()) {
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
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl p-0">
        <ScrollArea className="h-full">
          <div className="p-6">
            {/* Header */}
            <SheetHeader className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <SheetTitle className="text-2xl font-bold leading-tight">
                    {content?.title || label}
                  </SheetTitle>
                  
                  <div className="flex flex-wrap gap-2">
                    {category && (
                      <Badge 
                        variant="outline"
                        className={getCategoryColor(category)}
                      >
                        {category}
                      </Badge>
                    )}
                    {estimatedTime && (
                       <Badge variant="secondary" className="gap-1">
                        <Clock className="h-3 w-3" />
                        {estimatedTime}
                      </Badge>
                    )}
                  </div>
                </div>

                <SheetClose asChild>
                  <Button variant="ghost" size="sm">
                    <X className="h-4 w-4" />
                  </Button>
                </SheetClose>
              </div>

              {/* Completion Toggle */}
              <Button
                onClick={() => onToggleCompletion(selectedNode.id)}
                variant={completed ? "default" : "outline"}
                size="lg"
                className="w-full gap-2"
              >
                <CheckCircle2 className="h-5 w-5" />
                {completed ? 'Completed' : 'Mark as Complete'}
              </Button>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              {/* Description from Markdown */}
              {content?.description && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {content.description}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Learning Objectives from Markdown */}
              {content?.objectives && content.objectives.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Learning Objectives
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {content.objectives.map((objective, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Raw Markdown Content */}
              {content?.rawContent && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <MarkdownRenderer content={content.rawContent} />
                    </CardContent>
                </Card>
              )}

              {/* Resources from Markdown */}
              {content?.resources && content.resources.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Learning Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {content.resources.map((resource, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="text-muted-foreground">
                              {getResourceIcon(resource.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">
                                {resource.title}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {resource.type}
                                </Badge>
                                {resource.difficulty && (
                                  <Badge variant="secondary" className="text-xs">
                                    {resource.difficulty}
                                  </Badge>
                                )}
                                {resource.free && (
                                  <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                                    Free
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="flex-shrink-0"
                          >
                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="gap-1"
                            >
                              <ExternalLink className="h-3 w-3" />
                              Open
                            </a>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
