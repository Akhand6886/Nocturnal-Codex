import { MOCK_TOPICS } from "@/lib/data";
import { TopicTile } from "@/components/content/topic-tile";
import { BookOpenText } from "lucide-react";

export default function TopicsExplorerPage() {
  return (
    <div className="space-y-10">
      <header className="pb-6 border-b border-border">
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center text-foreground">
          <BookOpenText className="mr-4 h-10 w-10 text-primary" />
          Explore Topics
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Dive into curated knowledge domains within computer science and beyond. Each topic offers a gateway to in-depth articles, tutorials, and discussions.
        </p>
      </header>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_TOPICS.map((topic) => (
          <TopicTile key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
}

export const metadata = {
  title: "Topics | Nocturnal Codex",
  description: "Explore various topics in computer science and related fields.",
};
