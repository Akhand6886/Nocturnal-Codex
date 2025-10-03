
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BookMarked } from 'lucide-react';

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
      <Card className="h-full flex flex-col justify-between overflow-hidden shadow-md hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-card border border-border/50 hover:border-primary/60 rounded-lg">
        <CardHeader className="pb-2">
            <div className="flex items-center gap-3 mb-3">
                <BookMarked className="w-6 h-6 text-primary flex-shrink-0" />
                <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors leading-tight">
                    {roadmap.title}
                </CardTitle>
            </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-end pt-2">
            <div className="flex flex-wrap gap-1 mb-4">
                <Badge variant="outline" className="text-xs px-1.5 py-0.5">{roadmap.category}</Badge>
                <Badge variant="secondary" className="text-xs px-1.5 py-0.5">{roadmap.difficulty}</Badge>
            </div>
             <div className="text-primary font-medium text-xs flex items-center group-hover:text-accent transition-all duration-200 ease-in-out opacity-0 group-hover:opacity-100">
                View <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
        </CardContent>
      </Card>
    </Link>
  );
}
