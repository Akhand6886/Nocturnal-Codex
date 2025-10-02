
// src/components/roadmap/RoadmapCard.tsx
'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  BookOpen, 
  Star, 
  ArrowRight, 
  Trophy,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { type RoadmapPost } from 'contentlayer/generated';
import { useProgress } from './hooks/useProgress';

interface RoadmapCardProps {
  roadmap: RoadmapPost;
  featured?: boolean;
  showProgress?: boolean;
}

export function RoadmapCard({ roadmap, featured = false, showProgress = true }: RoadmapCardProps) {
  const { getProgressPercentage } = useProgress(roadmap.slug, []);
  const progress = showProgress ? getProgressPercentage() : 0;
  const pageTitle = roadmap.title || roadmap.name;

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'intermediate':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'advanced':
        return 'bg-red-500/10 text-red-600 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getDifficultyIcon = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner':
        return '🌱';
      case 'intermediate':
        return '⚡';
      case 'advanced':
        return '🚀';
      default:
        return '📚';
    }
  };

  return (
    <Card className={cn(
      'group relative overflow-hidden transition-all duration-300',
      'hover:shadow-lg hover:-translate-y-1',
      featured && 'ring-2 ring-primary/20 shadow-md'
    )}>
      {featured && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-yellow-900 border-0">
            <Star className="h-3 w-3" />
            Featured
          </Badge>
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="space-y-3">
          {/* Title and Category */}
          <div>
            <Link 
              href={roadmap.url}
              className="block group-hover:text-primary transition-colors"
            >
              <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                {pageTitle}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground mt-1 capitalize">
              {roadmap.category}
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {roadmap.difficulty && <Badge 
              variant="outline" 
              className={cn('text-xs', getDifficultyColor(roadmap.difficulty))}
            >
              <span className="mr-1">{getDifficultyIcon(roadmap.difficulty)}</span>
              {roadmap.difficulty}
            </Badge>}
            
            {roadmap.estimatedTime && (
              <Badge variant="secondary" className="text-xs gap-1">
                <Clock className="h-3 w-3" />
                {roadmap.estimatedTime}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {roadmap.description}
        </p>

        {/* Tags */}
        {roadmap.tags && roadmap.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {roadmap.tags.slice(0, 3).map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {roadmap.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{roadmap.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Progress (if user has started) */}
        {showProgress && progress > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full">
          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              <span>Interactive</span>
            </div>
            {progress > 0 && (
              <div className="flex items-center gap-1">
                <Trophy className="h-3 w-3" />
                <span>In Progress</span>
              </div>
            )}
          </div>

          {/* Action Button */}
          <Button asChild size="sm" className="gap-1">
            <Link href={roadmap.url}>
              {progress > 0 ? 'Continue' : 'Start Learning'}
              <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardFooter>

      {/* Hover effect gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Card>
  );
}
