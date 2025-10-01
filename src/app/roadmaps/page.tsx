// src/app/roadmaps/page.tsx
import { allRoadmapPosts } from 'contentlayer/generated';
import { RoadmapCard } from '@/components/content/roadmap-tile';
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
    const publishedRoadmaps = allRoadmapPosts;

    const groupedRoadmaps = publishedRoadmaps.reduce((acc, roadmap) => {
        const category = roadmap.category || 'Uncategorized';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(roadmap);
        return acc;
    }, {} as Record<string, typeof publishedRoadmaps>);

    const sortedCategories = Object.keys(groupedRoadmaps).sort((a, b) => a.localeCompare(b));
    
    return (
        <div className="container mx-auto px-4 py-8 space-y-12">
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

            {publishedRoadmaps.length > 0 ? (
                 <div className="space-y-12">
                    {sortedCategories.map(category => (
                        <section key={category}>
                        <h2 className="text-2xl font-semibold mb-6 pb-3 border-b border-border text-foreground">
                            {category}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {groupedRoadmaps[category].map((roadmap) => (
                                <RoadmapCard key={roadmap.slug} roadmap={roadmap} />
                            ))}
                        </div>
                        </section>
                    ))}
                </div>
            ) : (
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
