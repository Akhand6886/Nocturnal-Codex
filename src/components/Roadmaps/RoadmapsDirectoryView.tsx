'use client';

import React, { useState, useMemo } from 'react';
import { RoadmapCard } from './RoadmapCard';
import { Search, X, Sparkles } from 'lucide-react';

interface Roadmap {
  title: string;
  description?: string;
  category: string;
  difficulty: string;
  featured: boolean;
  imageUrl?: string;
  order: number;
  url: string;
  slug: string;
  topicCount?: number;
  chapterCount?: number;
}

interface RoadmapsDirectoryViewProps {
  roadmaps: Roadmap[];
}

const CATEGORIES = [
  { id: 'all', label: 'All Paths' },
  { id: 'web', label: 'Web & Cloud' },
  { id: 'ai-systems', label: 'AI & Systems' },
  { id: 'security-specialized', label: 'Security & Specialized' },
];

export function RoadmapsDirectoryView({ roadmaps }: RoadmapsDirectoryViewProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRoadmaps = useMemo(() => {
    return roadmaps.filter((r) => {
      // Category filter
      if (selectedCategory === 'web') {
        const matches = ['frontend', 'backend', 'full-stack', 'devops'].includes(r.slug);
        if (!matches) return false;
      } else if (selectedCategory === 'ai-systems') {
        const matches = ['machine-learning', 'embedded-systems'].includes(r.slug);
        if (!matches) return false;
      } else if (selectedCategory === 'security-specialized') {
        const matches = ['cybersecurity', 'mobile-development', 'game-development'].includes(r.slug);
        if (!matches) return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery =
          r.title.toLowerCase().includes(q) ||
          r.description?.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.difficulty.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      return true;
    });
  }, [roadmaps, selectedCategory, searchQuery]);

  return (
    <div>
      {/* Category Pills & Search Bar */}
      <div className="max-w-5xl mx-auto px-4 mb-8">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-muted/40 border border-border/50 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`
                    px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap
                    ${isActive
                      ? 'bg-background text-foreground shadow-xs border border-border/60 font-semibold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-background/40'
                    }
                  `}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter roadmaps..."
              className="w-full pl-8 pr-8 py-1.5 text-xs rounded-xl bg-background border border-border/60 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2-Column Grid */}
      <div className="max-w-5xl mx-auto px-4 pb-12">
        {filteredRoadmaps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredRoadmaps.map((roadmap) => (
              <RoadmapCard key={roadmap.slug} roadmap={roadmap} featured={roadmap.featured} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-2xl border border-dashed border-border/60 bg-muted/10 p-8">
            <Sparkles className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-foreground mb-1">No roadmaps match your criteria</h3>
            <p className="text-xs text-muted-foreground mb-4">Try clearing your search query or selecting &ldquo;All Paths&rdquo;.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-xs font-mono text-primary hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
