

import { RoadmapCard } from "@/components/content/roadmap-card";
import { BookOpenText } from "lucide-react";
import { allRoadmapPosts } from 'contentlayer/generated';
import type { RoadmapPost } from 'contentlayer/generated';
import type { Metadata } from 'next';

export const revalidate = 60; 

export const metadata: Metadata = {
  title: "Topics | Nocturnal Codex",
  description: "Explore various topics in computer science and related fields, organized by category.",
};

export default function TopicsExplorerPage() {
  const groupedTopics: Record<string, RoadmapPost[]> = {};

  allRoadmapPosts.forEach(topic => {
    const category = topic.category || "Other Topics";
    if (!groupedTopics[category]) {
      groupedTopics[category] = [];
    }
    groupedTopics[category].push(topic);
  });

  const sortedCategories = Object.keys(groupedTopics).sort((a, b) => {
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
          Explore Topics
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-3xl mx-auto">
          Dive into curated knowledge domains within computer science and beyond. Each topic offers a gateway to in-depth articles, tutorials, and discussions.
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
                {groupedTopics[category].map((topic) => (
                  <RoadmapCard key={topic.slug} roadmap={topic} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-10">No topics available yet. Check back soon!</p>
      )}
    </div>
  );
}
