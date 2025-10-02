
import Link from 'next/link';
import { type RoadmapPost } from 'contentlayer/generated';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Calendar,
  Download,
  Share2,
  Bookmark,
} from 'lucide-react';

interface RoadmapHeaderProps {
    roadmapData: RoadmapPost;
}

export function RoadmapHeader({ roadmapData }: RoadmapHeaderProps) {
    const pageTitle = roadmapData.title || roadmapData.name;

    return (
        <div className="mb-6">
            <Button variant="ghost" asChild className="mb-4 text-muted-foreground">
            <Link href="/roadmaps">
                <ArrowLeft className="h-4 w-4 mr-2" />
                All Roadmaps
            </Link>
            </Button>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <h1 className="text-4xl font-bold tracking-tight text-foreground">{pageTitle}</h1>
                <p className="mt-2 text-lg text-muted-foreground">{roadmapData.description}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
                <Button variant="outline" size="sm" className="gap-1.5">
                <Calendar className="h-4 w-4" /> Schedule
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5">
                <Download className="h-4 w-4" /> Download
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5">
                <Share2 className="h-4 w-4" /> Share
                </Button>
                <Button variant="ghost" size="icon">
                <Bookmark className="h-5 w-5" />
                </Button>
            </div>
            </div>
        </div>
    );
}
