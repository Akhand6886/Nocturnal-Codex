
import { MOCK_TOPICS, type Topic } from "@/lib/data";
import { TopicTile } from "@/components/content/topic-tile";
import { BookOpenText } from "lucide-react";

export const revalidate = 60; // Revalidate every 60 seconds

export default function TopicsExplorerPage() {
  const groupedTopics: Record<string, Topic[]> = {};

  MOCK_TOPICS.forEach(topic => {
    const category = topic.category || "Other Topics";
    if (!groupedTopics[category]) {
      groupedTopics[category] = [];
    }
    groupedTopics[category].push(topic);
  });

  const sortedCategories = Object.keys(groupedTopics).sort((a, b) => {
    // Optional: Define a custom sort order for categories if needed
    // For now, simple alphabetical sort
    return a.localeCompare(b);
  });

  return (
    <div className="space-y-12">
      <header className="pb-6 border-b border-border">
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center text-foreground">
          <BookOpenText className="mr-4 h-10 w-10 text-primary" />
          Explore Topics
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Dive into curated knowledge domains within computer science and beyond. Each topic offers a gateway to in-depth articles, tutorials, and discussions.
        </p>
      </header>
      
      {sortedCategories.length > 0 ? (
        sortedCategories.map(category => (
          <section key={category} className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6 pb-3 border-b border-border/70 text-foreground/90">
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {groupedTopics[category].map((topic) => (
                <TopicTile key={topic.id} topic={topic} />
              ))}
            </div>
          </section>
        ))
      ) : (
        <p className="text-muted-foreground text-center py-10">No topics available yet. Check back soon!</p>
      )}
    </div>
  );
}

export const metadata = {
  title: "Topics | Nocturnal Codex",
  description: "Explore various topics in computer science and related fields, organized by category.",
};

    