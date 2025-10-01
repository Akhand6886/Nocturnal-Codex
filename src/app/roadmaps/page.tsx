
// src/app/roadmaps/page.tsx
import { allRoadmapPosts } from 'contentlayer/generated';
import { RoadmapCard } from '@/components/roadmap/RoadmapCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';
import { Metadata } from 'next';

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

export default function RoadmapsPage() {
    const publishedRoadmaps = allRoadmapPosts.filter(p => p.title);
    
    const categories = Array.from(
        new Set(publishedRoadmaps.map(roadmap => roadmap.category).filter(Boolean))
    ).sort();

    // Group roadmaps by category
    const roadmapsByCategory = categories.reduce((acc, category) => {
        if(!category) return acc;
        acc[category] = publishedRoadmaps.filter(roadmap => roadmap.category === category);
        return acc;
    }, {} as Record<string, typeof publishedRoadmaps>);

    const featuredRoadmaps = publishedRoadmaps.slice(0, 6);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
                    <BookOpen className="mr-3 h-9 w-9 text-primary" />
                    Learning Roadmaps
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                    Explore our comprehensive, community-driven learning paths to master new technologies.
                </p>
            </div>

            {/* Main content with Tabs for categories */}
            <Tabs defaultValue={categories[0]} className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-8">
                    {categories.map((category) => (
                        <TabsTrigger key={category} value={category!} className="capitalize">
                            {category}
                            <Badge variant="secondary" className="ml-2">
                                {roadmapsByCategory[category!]?.length || 0}
                            </Badge>
                        </TabsTrigger>
                    ))}
                </TabsList>

                {categories.map((category) => (
                    <TabsContent key={category} value={category!}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {(roadmapsByCategory[category!] || []).map((roadmap) => (
                                <RoadmapCard key={roadmap.slug} roadmap={roadmap} />
                            ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>

            {publishedRoadmaps.length === 0 && (
                <div className="text-center py-16">
                    <h3 className="text-lg font-semibold mb-2">No roadmaps found</h3>
                    <p className="text-muted-foreground">
                        It looks like there are no roadmaps available at the moment. Please check back later.
                    </p>
                </div>
            )}
        </div>
    );
}

export const revalidate = 60;
