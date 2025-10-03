
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import type { Roadmap } from 'contentlayer/generated';
import { Badge } from '@/components/ui/badge';

interface RoadmapCardProps {
  roadmap: Roadmap;
}

export function RoadmapCard({ roadmap }: RoadmapCardProps) {
  return (
    <Link href={roadmap.url} className="group block">
      <Card className="h-full overflow-hidden shadow-lg hover:shadow-primary/30 border border-border/50 hover:border-primary/60 transition-all duration-300 ease-in-out bg-card group rounded-xl">
        <div className="relative h-52 w-full overflow-hidden rounded-t-xl">
          <Image
            src={roadmap.imageUrl}
            alt={roadmap.title}
            width={400}
            height={300}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors duration-200 ease-in-out">
            {roadmap.title}
          </CardTitle>
          <div className="flex gap-2 pt-2">
            <Badge variant="outline">{roadmap.category}</Badge>
            <Badge variant="secondary">{roadmap.difficulty}</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-grow pt-0">
          <CardDescription>{roadmap.description}</CardDescription>
        </CardContent>
        <CardContent className="pb-5">
            <div className="text-primary font-medium text-sm flex items-center group-hover:text-accent transition-all duration-200 ease-in-out">
                View Roadmap <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
        </CardContent>
      </Card>
    </Link>
  );
}
