// src/app/roadmaps/[roadmapSlug]/page.tsx
import { notFound } from 'next/navigation';
import { allInteractiveRoadmaps } from 'contentlayer/generated';
import { InteractiveRoadmap } from '@/components/roadmap/InteractiveRoadmap';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, BookOpen, Users, Star } from 'lucide-react';
import { Metadata } from 'next';

interface RoadmapPageProps {
  params: {
    roadmapSlug: string;
  };
}

export async function generateStaticParams() {
  if (!allInteractiveRoadmaps) {
    return [];
  }
  return allInteractiveRoadmaps
    .map((roadmap) => ({
      roadmapSlug: roadmap.slug,
    }));
}

export async function generateMetadata({ params }: RoadmapPageProps): Promise<Metadata> {
  if (!allInteractiveRoadmaps) {
    return {
      title: 'Roadmaps Not Available',
      description: 'The learning roadmaps are currently being updated.',
    };
  }
  const roadmap = allInteractiveRoadmaps.find(
    (roadmap) => roadmap.slug === params.roadmapSlug
  );

  if (!roadmap) {
    return {
      title: 'Roadmap Not Found',
      description: 'The requested roadmap could not be found.',
    };
  }

  return {
    title: `${roadmap.title} - Interactive Learning Roadmap`,
    description: roadmap.description,
    openGraph: {
      title: roadmap.title,
      description: roadmap.description,
      type: 'article',
      url: `/roadmaps/${roadmap.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: roadmap.title,
      description: roadmap.description,
    },
  };
}

export default async function RoadmapPage({ params }: RoadmapPageProps) {
    if (!allInteractiveRoadmaps) {
        notFound();
    }
  const roadmap = allInteractiveRoadmaps.find(
    (roadmap) => roadmap.slug === params.roadmapSlug
  );

  if (!roadmap) {
    notFound();
  }

  // Load the React Flow data from the public directory
  let flowData = null;
  try {
    const flowDataPath = `/roadmap-data/${roadmap.slug}.json`;
    const response = await fetch(
      new URL(flowDataPath, process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
    );
    
    if (response.ok) {
      flowData = await response.json();
    } else {
      console.warn(`Failed to load flow data for roadmap: ${roadmap.slug}`);
    }
  } catch (error) {
    console.error('Error loading flow data:', error);
  }

  const getDifficultyColor = (difficulty: string) => {
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-4xl font-bold text-foreground">
                {roadmap.title}
              </h1>
              <Badge 
                variant="outline" 
                className={getDifficultyColor(roadmap.difficulty)}
              >
                {roadmap.difficulty}
              </Badge>
            </div>
            
            <p className="text-xl text-muted-foreground mb-4 max-w-3xl">
              {roadmap.description}
            </p>

            {/* Roadmap Stats */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Est. Time: {roadmap.estimatedTime}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Category: {roadmap.category}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Interactive Learning Path</span>
              </div>
            </div>

            {/* Tags */}
            {((roadmap as any).tags) && ((roadmap as any).tags).length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {((roadmap as any).tags).map((tag: any) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 md:flex-row">
            <Button size="lg" className="gap-2">
              <Star className="h-4 w-4" />
              Start Learning
            </Button>
            <Button variant="outline" size="lg">
              Share Roadmap
            </Button>
          </div>
        </div>
      </div>

      {/* Interactive Roadmap */}
      {flowData ? (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Interactive Learning Path</CardTitle>
            <CardDescription>
              Click on any topic to learn more. Pan and zoom to explore the roadmap.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <InteractiveRoadmap
              roadmapData={roadmap}
              flowData={flowData}
              slug={roadmap.slug}
            />
          </CardContent>
        </Card>
      ) : (
        <Card className="mb-8">
          <CardContent className="flex items-center justify-center py-16">
            <div className="text-center text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">Interactive roadmap coming soon</p>
              <p className="text-sm">
                The visual roadmap for this learning path is being prepared.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Roadmap Content (MDX) */}
      {roadmap.body.raw && (
        <Card>
          <CardHeader>
            <CardTitle>About This Roadmap</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: roadmap.body.html }} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Enable ISR with your existing revalidation strategy
export const revalidate = 60;

// Enable static generation
export const dynamic = 'force-static';