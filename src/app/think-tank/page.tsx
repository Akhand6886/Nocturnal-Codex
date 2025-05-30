
import { MOCK_THINK_TANK_ARTICLES } from "@/lib/data";
import { ThinkTankArticleCard } from "@/components/content/think-tank-article-card";
import { BrainCircuit } from "lucide-react";

export const revalidate = 60; // Revalidate every 60 seconds

export default function ThinkTankPage() {
  const sortedArticles = MOCK_THINK_TANK_ARTICLES.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-10">
      <header className="pb-6 border-b border-border">
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center text-foreground">
          <BrainCircuit className="mr-4 h-10 w-10 text-primary" />
          Think Tank
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Long-form theoretical research, explorations of complex ideas, and dialogues on the frontiers of knowledge.
        </p>
      </header>
      
      {sortedArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {sortedArticles.map((article) => (
            <ThinkTankArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
         <p className="text-muted-foreground text-center py-10">No Think Tank articles yet. Dive deep soon!</p>
      )}
    </div>
  );
}

export const metadata = {
  title: "Think Tank | Nocturnal Codex",
  description: "In-depth research articles and theoretical explorations.",
};
