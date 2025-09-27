
// src/components/roadmap/RoadmapControls.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { type Node } from '@xyflow/react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  X,
  CheckCircle2,
  Circle,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { type RoadmapNodeData } from '@/types/roadmap';

interface RoadmapControlsProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  nodes: Node<RoadmapNodeData>[];
  onFocusNode: (nodeId: string) => void;
}

export function RoadmapControls({
  searchTerm,
  onSearchChange,
  nodes,
  onFocusNode,
}: RoadmapControlsProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showCompleted, setShowCompleted] = useState<'all' | 'completed' | 'pending'>('all');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    nodes.forEach(node => {
      if (node.data.category) {
        cats.add(node.data.category);
      }
    });
    return Array.from(cats).sort();
  }, [nodes]);

  // Filter nodes based on search and filters
  const filteredNodes = useMemo(() => {
    return nodes.filter(node => {
      const matchesSearch = node.data.label
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategories.length === 0 || 
        (node.data.category && selectedCategories.includes(node.data.category));
      
      const matchesCompletion = 
        showCompleted === 'all' ||
        (showCompleted === 'completed' && node.data.completed) ||
        (showCompleted === 'pending' && !node.data.completed);

      return matchesSearch && matchesCategory && matchesCompletion;
    });
  }, [nodes, searchTerm, selectedCategories, showCompleted]);

  // Toggle category filter
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setShowCompleted('all');
    onSearchChange('');
  };

  const hasActiveFilters = selectedCategories.length > 0 || showCompleted !== 'all' || searchTerm;

  return (
    <Card className="absolute top-4 right-4 z-10 w-96 shadow-lg bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search topics..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                onClick={() => onSearchChange('')}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-1 h-4 px-1 text-xs">
                      {(selectedCategories.length + (showCompleted !== 'all' ? 1 : 0))}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <Command>
                  <CommandInput placeholder="Search filters..." />
                  <CommandList>
                    <CommandEmpty>No filters found.</CommandEmpty>
                    
                    {/* Completion Status */}
                    <CommandGroup heading="Progress Status">
                      <CommandItem
                        onSelect={() => setShowCompleted('all')}
                        className="cursor-pointer"
                      >
                        <div className={cn(
                          'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                          showCompleted === 'all' ? 'bg-primary text-primary-foreground' : 'opacity-50'
                        )}>
                          {showCompleted === 'all' && <CheckCircle2 className="h-3 w-3" />}
                        </div>
                        <span>All Topics</span>
                      </CommandItem>
                      <CommandItem
                        onSelect={() => setShowCompleted('completed')}
                        className="cursor-pointer"
                      >
                        <div className={cn(
                          'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                          showCompleted === 'completed' ? 'bg-primary text-primary-foreground' : 'opacity-50'
                        )}>
                          {showCompleted === 'completed' && <CheckCircle2 className="h-3 w-3" />}
                        </div>
                        <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                        <span>Completed</span>
                      </CommandItem>
                      <CommandItem
                        onSelect={() => setShowCompleted('pending')}
                        className="cursor-pointer"
                      >
                        <div className={cn(
                          'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                          showCompleted === 'pending' ? 'bg-primary text-primary-foreground' : 'opacity-50'
                        )}>
                          {showCompleted === 'pending' && <CheckCircle2 className="h-3 w-3" />}
                        </div>
                        <Circle className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>Not Started</span>
                      </CommandItem>
                    </CommandGroup>

                    {/* Categories */}
                    {categories.length > 0 && (
                      <CommandGroup heading="Categories">
                        {categories.map((category) => (
                          <CommandItem
                            key={category}
                            onSelect={() => toggleCategory(category)}
                            className="cursor-pointer"
                          >
                            <div className={cn(
                              'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                              selectedCategories.includes(category) ? 'bg-primary text-primary-foreground' : 'opacity-50'
                            )}>
                              {selectedCategories.includes(category) && <CheckCircle2 className="h-3 w-3" />}
                            </div>
                            <span className="capitalize">{category}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {hasActiveFilters && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="gap-1"
              >
                <X className="h-3 w-3" />
                Clear
              </Button>
            )}
          </div>

          {/* Search Results */}
          {searchTerm && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                {filteredNodes.length} result{filteredNodes.length !== 1 ? 's' : ''}
              </p>
              <div className="max-h-40 overflow-y-auto space-y-1">
                {filteredNodes.slice(0, 5).map((node) => (
                  <button
                    key={node.id}
                    onClick={() => onFocusNode(node.id)}
                    className="w-full flex items-center gap-2 p-2 text-left hover:bg-muted rounded-sm transition-colors"
                  >
                    <div className="flex-shrink-0">
                      {node.data.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {node.data.label}
                      </p>
                      {node.data.category && (
                        <p className="text-xs text-muted-foreground capitalize">
                          {node.data.category}
                        </p>
                      )}
                    </div>
                    {node.data.estimatedTime && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {node.data.estimatedTime}
                      </div>
                    )}
                  </button>
                ))}
                {filteredNodes.length > 5 && (
                  <p className="text-xs text-muted-foreground text-center pt-2">
                    and {filteredNodes.length - 5} more...
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
