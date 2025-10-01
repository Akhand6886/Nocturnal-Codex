
// src/app/roadmaps/page.tsx
import { allInteractiveRoadmaps } from 'contentlayer/generated';
import { RoadmapCard } from '@/components/roadmap/RoadmapCard';
import { RoadmapFilters } from '@/components/roadmap/RoadmapFilters';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  BookOpen, 
  TrendingUp, 
  Users, 
  Clock,
  ArrowRight,
  Star
} from 'lucide-react';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Interactive Learning Roadmaps - Master Any Technology',
  description: 'Explore comprehensive, interactive learning roadmaps for web development, machine learning, data science, and more. Track your progress and master new skills with structured learning paths.',
  keywords: 'learning roadmaps, programming tutorials, web development, machine learning, career development',
  openGraph: {
    title: 'Interactive Learning Roadmaps',
    description: 'Master new technologies with our interactive, structured learning paths',
    type: 'website',
    url: '/roadmaps',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interactive Learning Roadmaps',
    description: 'Master new technologies with our interactive, structured learning paths',
  },
};

// Get unique categories and stats
function getRoadmapStats() {
  const publishedRoadmaps = allInteractiveRoadmaps;
  
  if (!publishedRoadmaps || publishedRoadmaps.length === 0) {
    return {
      publishedRoadmaps: [],
      categories: [],
      difficulties: [],
      totalRoadmaps: 0,
      avgEstimatedTime: '0',
    };
  }
  
  const categories = Array.from(
    new Set(publishedRoadmaps.map(roadmap => roadmap.category))
  ).sort();
  
  const difficulties = Array.from(
    new Set(publishedRoadmaps.map(roadmap => roadmap.difficulty))
  );
  
  const totalRoadmaps = publishedRoadmaps.length;
  const avgEstimatedTime = 'Variable'; // Could calculate this from estimatedTime fields
  
  return {
    publishedRoadmaps,
    categories,
    difficulties,
    totalRoadmaps,
    avgEstimatedTime,
  };
}

export default function RoadmapsPage() {
  const {
    publishedRoadmaps,
    categories,
    difficulties,
    totalRoadmaps,
  } = getRoadmapStats();

  // Group roadmaps by category
  const roadmapsByCategory = categories.reduce((acc, category) => {
    acc[category] = publishedRoadmaps.filter(roadmap => roadmap.category === category);
    return acc;
  }, {} as Record<string, typeof publishedRoadmaps>);

  // Featured/Popular roadmaps (you can customize this logic)
  const featuredRoadmaps = publishedRoadmaps
    .filter(roadmap => {
        const tags = (roadmap as any).tags || [];
        return ['machine learning', 'frontend', 'backend', 'full stack'].some(keyword =>
            roadmap.title.toLowerCase().includes(keyword) ||
            tags.some((tag: string) => tag.toLowerCase().includes(keyword))
        )
    })
    .slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Interactive Learning Roadmaps
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Master new technologies with our comprehensive, interactive learning paths. 
          Each roadmap is carefully crafted with hands-on projects, resources, and progress tracking.
        </p>
        

        {/* CTA */}
      </div>

      {/* Featured Roadmaps */}
      {featuredRoadmaps.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Roadmaps</h2>
              <p className="text-muted-foreground">
                Most popular learning paths to kickstart your journey
              </p>
            </div>
            <Button variant="outline" className="gap-2">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRoadmaps.map((roadmap) => (
              <RoadmapCard 
                key={roadmap.slug} 
                roadmap={roadmap}
                featured
              />
            ))}
          </div>
        </section>
      )}

      {/* Browse by Category */}
      <section className="mb-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Browse by Category</h2>
          <p className="text-muted-foreground">
            Find learning paths organized by technology domains
          </p>
        </div>

        <Tabs defaultValue={categories[0]} className="w-full">
          <TabsList className="grid grid-cols-2 lg:grid-cols-4 mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category}
                <Badge variant="secondary" className="ml-2">
                  {roadmapsByCategory[category].length}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roadmapsByCategory[category].map((roadmap) => (
                  <RoadmapCard key={roadmap.slug} roadmap={roadmap} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      
    </div>
  );
}

// Client component for interactive filtering
function RoadmapListing({ roadmaps }: { roadmaps: typeof allInteractiveRoadmaps }) {
  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <RoadmapFilters roadmaps={roadmaps} />
    </div>
  );
}

// Loading skeleton
function RoadmapListingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="h-10 w-80 bg-muted animate-pulse rounded-md" />
        <div className="h-10 w-32 bg-muted animate-pulse rounded-md" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="h-64 animate-pulse">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="h-4 w-3/4 bg-muted rounded" />
                <div className="h-20 w-full bg-muted rounded" />
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-muted rounded-full" />
                  <div className="h-6 w-20 bg-muted rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Enable ISR
export const revalidate = 60;
