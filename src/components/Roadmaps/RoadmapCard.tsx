
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import type { Roadmap } from 'contentlayer/generated';
import { Badge } from '@/components/ui/badge';
import { BookMarked } from 'lucide-react'; // Changed icon

interface RoadmapCardProps {
  roadmap: Roadmap;
}

export function RoadmapCard({ roadmap }: RoadmapCardProps) {
  return (
    <Link href={roadmap.url} className="group block h-full">
      <Card className="h-full flex flex-col overflow-hidden shadow-md hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-card border border-border/50 hover:border-primary/60 rounded-lg">
        <CardHeader className="flex flex-row items-start gap-4 space-y-0">
          <div className="mt-1">
              <BookMarked className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
              <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {roadmap.title}
              </CardTitle>
              <CardDescription className="text-sm mt-1">{roadmap.description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-end pt-2">
            <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{roadmap.category}</Badge>
                <Badge variant="secondary">{roadmap.difficulty}</Badge>
            </div>
             <div className="text-primary font-medium text-sm flex items-center group-hover:text-accent transition-all duration-200 ease-in-out mt-4 opacity-0 group-hover:opacity-100">
                View Roadmap <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
        </CardContent>
      </Card>
    </Link>
  );
}
