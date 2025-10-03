
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookCopy, Link as LinkIcon, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { type RoadmapFlowData } from '@/types/roadmap';

interface RoadmapSidebarProps {
  blueprint: RoadmapFlowData;
}

export function RoadmapSidebar({ blueprint }: RoadmapSidebarProps) {
  const { prerequisites, relatedRoadmaps } = blueprint.metadata || {};

  return (
    <aside className="w-full lg:w-1/4 lg:sticky lg:top-24 self-start space-y-6">
      {prerequisites && prerequisites.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-md flex items-center gap-2"><BookCopy className="h-4 w-4" />Pre-requisites</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {prerequisites.map(prereq => (
              <Button key={prereq.slug} variant="outline" size="sm" asChild className="w-full justify-start">
                <Link href={`/roadmaps/${prereq.slug}`}>{prereq.title}</Link>
              </Button>
            ))}
          </CardContent>
        </Card>
      )}
      {relatedRoadmaps && relatedRoadmaps.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-md flex items-center gap-2"><LinkIcon className="h-4 w-4" />Related Roadmaps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {relatedRoadmaps.map(related => (
              <Link key={related.slug} href={`/roadmaps/${related.slug}`} className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2">
                <Bookmark className="h-4 w-4" /> {related.title}
              </Link>
            ))}
          </CardContent>
        </Card>
      )}
    </aside>
  );
}
