
// src/components/roadmap/RoadmapFilters.tsx
'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  X, 
  Filter,
  SortAsc,
  Grid3X3,
  List
} from 'lucide-react';
import { type RoadmapPost } from 'contentlayer/generated';
import { RoadmapCard } from './RoadmapCard';

interface RoadmapFiltersProps {
  roadmaps: RoadmapPost[];
}

type SortOption = 'title' | 'difficulty' | 'category' | 'estimatedTime';
type ViewMode = 'grid' | 'list';

export function RoadmapFilters({ roadmaps }: RoadmapFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('title');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Get unique values for filters
  const categories = useMemo(() => {
    const cats = Array.from(new Set(roadmaps.map(r => r.category))).sort();
    return cats;
  }, [roadmaps]);

  const difficulties = useMemo(() => {
    const diffs = Array.from(new Set(roadmaps.map(r => r.difficulty).filter(Boolean) as string[])).sort();
    return diffs;
  }, [roadmaps]);

  // Filter and sort roadmaps
  const filteredRoadmaps = useMemo(() => {
    let filtered = roadmaps.filter(roadmap => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const matchesSearch = 
        (roadmap.title && roadmap.title.toLowerCase().includes(lowerSearchTerm)) ||
        (roadmap.description && roadmap.description.toLowerCase().includes(lowerSearchTerm)) ||
        (roadmap.tags && roadmap.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm)));
      
      const matchesCategory = selectedCategory === 'all' || roadmap.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || roadmap.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return (a.title || '').localeCompare(b.title || '');
        case 'difficulty':
          const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
          const difficultyA = a.difficulty as keyof typeof difficultyOrder;
          const difficultyB = b.difficulty as keyof typeof difficultyOrder;
          return (difficultyOrder[difficultyA] || 4) - (difficultyOrder[difficultyB] || 4);
        case 'category':
          return (a.category || '').localeCompare(b.category || '');
        default:
          return 0;
      }
    });

    return filtered;
  }, [roadmaps, searchTerm, selectedCategory, selectedDifficulty, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSortBy('title');
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'all' || selectedDifficulty !== 'all';

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-4 sm:flex-row">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search roadmaps..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Difficulty Filter */}
          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {difficulties.map((difficulty) => (
                <SelectItem key={difficulty} value={difficulty}>
                  {difficulty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Sort by Title</SelectItem>
              <SelectItem value="difficulty">Sort by Difficulty</SelectItem>
              <SelectItem value="category">Sort by Category</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
              <X className="h-3 w-3" />
              Clear
            </Button>
          )}

          <div className="flex items-center border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none border-0"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none border-0"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <Badge variant="secondary" className="gap-1">
              Search: {searchTerm}
              <button onClick={() => setSearchTerm('')}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedCategory !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Category: {selectedCategory}
              <button onClick={() => setSelectedCategory('all')}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedDifficulty !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Difficulty: {selectedDifficulty}
              <button onClick={() => setSelectedDifficulty('all')}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredRoadmaps.length} of {roadmaps.length} roadmaps
        </p>
      </div>

      {/* Roadmaps Grid/List */}
      <div className={`
        ${viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
          : 'space-y-4'
        }
      `}>
        {filteredRoadmaps.map((roadmap) => (
          <RoadmapCard 
            key={roadmap.slug} 
            roadmap={roadmap}
            showProgress={true}
          />
        ))}
      </div>

      {/* No Results */}
      {filteredRoadmaps.length === 0 && (
        <div className="text-center py-16">
          <Filter className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No roadmaps found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search terms or filters
          </p>
          <Button variant="outline" onClick={clearFilters}>
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}

    