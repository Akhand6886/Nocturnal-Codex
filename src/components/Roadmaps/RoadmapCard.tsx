
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, BookMarked, Tag, Layers } from 'lucide-react';
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
}

export function RoadmapCard({ roadmap }: RoadmapCardProps) {
  return (
    <Link href={roadmap.url} className="group block h-full">
      <Card className="h-full flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-primary/15 transition-all duration-300 ease-in-out transform hover:-translate-y-1.5 bg-card border border-border/50 hover:border-primary/40 rounded-xl">
        <CardHeader className="pb-3 pt-5">
            <div className="flex items-start gap-4 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <BookMarked className="w-6 h-6 text-primary flex-shrink-0" />
                </div>
                <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors leading-tight pt-1">
                    {roadmap.title}
                </CardTitle>
            </div>
             {roadmap.description && (
                <CardDescription className="text-sm text-foreground/70 pt-1 line-clamp-2">{roadmap.description}</CardDescription>
            )}
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-end pt-2">
            <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="text-xs px-2 py-1 flex items-center gap-1.5">
                    <Layers className="h-3 w-3" />
                    {roadmap.category}
                </Badge>
                <Badge variant="outline" className="text-xs px-2 py-1 flex items-center gap-1.5">
                    <Tag className="h-3 w-3" />
                    {roadmap.difficulty}
                </Badge>
            </div>
             <div className="text-primary font-semibold text-sm flex items-center group-hover:text-accent transition-all duration-200 ease-in-out opacity-0 group-hover:opacity-100">
                Explore Path <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
        </CardContent>
      </Card>
    </Link>
  );
}
