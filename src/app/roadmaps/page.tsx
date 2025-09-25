
import { RoadmapTile } from "@/components/content/roadmap-tile";
import { BookOpenText } from "lucide-react";
import { allRoadmapPosts } from 'contentlayer/generated';
import type { RoadmapPost } from 'contentlayer/generated';
import type { Metadata } from 'next';

export const revalidate = 60; 

export const metadata: Metadata = {
  title: "Roadmaps | Nocturnal Codex",
  description: "Explore various roadmaps in computer science and related fields, organized by category.",
};

export default function RoadmapsExplorerPage() {
  const groupedRoadmaps: Record<string, RoadmapPost[]> = {};

  allRoadmapPosts.forEach(roadmap => {
    const category = roadmap.category || "Other Roadmaps";
    if (!groupedRoadmaps[category]) {
      groupedRoadmaps[category] = [];
    }
    groupedRoadmaps[category].push(roadmap);
  });

  const sortedCategories = Object.keys(groupedRoadmaps).sort((a, b) => {
    const coreCategories = ["Core Computer Science", "Theoretical Computer Science"];
    if (coreCategories.includes(a) && !coreCategories.includes(b)) return -1;
    if (!coreCategories.includes(a) && coreCategories.includes(b)) return 1;
    return a.localeCompare(b);
  });

  return (
    <div className="container mx-auto px-4 py-10 md:py-12 space-y-16">
      <header className="pb-6 border-b border-border text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-4 flex items-center justify-center">
          <BookOpenText className="mr-4 h-10 w-10 text-primary" />
          Explore Roadmaps
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-3xl mx-auto">
          Dive into curated knowledge domains within computer science and beyond. Each roadmap offers a gateway to in-depth articles, tutorials, and discussions.
        </p>
      </header>
      
      {sortedCategories.length > 0 ? (
        <div className="space-y-12">
          {sortedCategories.map(category => (
            <section key={category}>
              <h2 className="text-2xl font-semibold mb-8 pb-3 border-b-2 border-primary/20 text-foreground/90">
                {category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {groupedRoadmaps[category].map((roadmap) => (
                  <RoadmapTile key={roadmap.id} roadmap={roadmap} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-10">No roadmaps available yet. Check back soon!</p>
      )}
    </div>
  );
}
