
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, BookMarked, Tag, Layers, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
}

interface RoadmapCardProps {
  roadmap: Roadmap;
  featured?: boolean;
}

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: 'text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/5',
  Intermediate: 'text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-500/5',
  Advanced: 'text-rose-600 dark:text-rose-400 border-rose-500/30 bg-rose-500/5',
};

const CATEGORY_ICONS: Record<string, string> = {
  Core: '🏗️',
  Specialization: '🎯',
  Infrastructure: '⚙️',
  Security: '🔒',
  'AI/ML': '🧠',
  Creative: '🎮',
  Mobile: '📱',
  Embedded: '🔌',
};

export function RoadmapCard({ roadmap, featured }: RoadmapCardProps) {
  const difficultyClass = DIFFICULTY_COLORS[roadmap.difficulty] || '';
  const categoryIcon = CATEGORY_ICONS[roadmap.category] || '📘';

  return (
    <Link href={roadmap.url} className="group block h-full">
      <Card className={`
        h-full flex flex-col justify-between overflow-hidden transition-all duration-300 ease-out
        transform hover:-translate-y-1.5 rounded-2xl
        bg-card border border-border/50 hover:border-primary/40
        shadow-sm hover:shadow-xl hover:shadow-primary/5
        ${featured ? 'ring-1 ring-accent/20' : ''}
      `}>
        {/* Top Accent Bar */}
        <div className={`h-1 w-full bg-gradient-to-r ${
          featured 
            ? 'from-accent via-primary to-accent' 
            : 'from-primary/60 via-primary to-primary/60'
        }`} />

        <CardHeader className="pb-3 pt-5 px-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl" role="img" aria-label={roadmap.category}>
                {categoryIcon}
              </span>
              <div>
                <CardTitle className="text-base font-bold group-hover:text-primary transition-colors leading-snug">
                  {roadmap.title}
                </CardTitle>
              </div>
            </div>
            {featured && (
              <Star className="w-4 h-4 text-accent fill-accent flex-shrink-0 mt-0.5" />
            )}
          </div>
          {roadmap.description && (
            <CardDescription className="text-sm text-muted-foreground leading-relaxed line-clamp-2 pl-0">
              {roadmap.description}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="flex-grow flex flex-col justify-end pt-1 pb-5 px-5">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="secondary" className="text-xs px-2.5 py-1 flex items-center gap-1.5 rounded-md font-medium">
              <Layers className="h-3 w-3" />
              {roadmap.category}
            </Badge>
            <Badge variant="outline" className={`text-xs px-2.5 py-1 flex items-center gap-1.5 rounded-md font-semibold ${difficultyClass}`}>
              {roadmap.difficulty}
            </Badge>
          </div>

          <div className="flex items-center text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out translate-y-1 group-hover:translate-y-0">
            Explore Path
            <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
