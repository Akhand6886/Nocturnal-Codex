
import { ThinkTankArticleCard } from "@/components/content/think-tank-article-card";
import { BrainCircuit } from "lucide-react";
import { fetchThinkTankArticles } from "@/lib/contentful";
import type { Metadata } from 'next';

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
  title: "Think Tank | Nocturnal Codex",
  description: "In-depth research articles and theoretical explorations.",
};

export default async function ThinkTankPage() {
  const articles = await fetchThinkTankArticles();

  return (
    <div className="container mx-auto px-4 py-10 md:py-12 space-y-10">
      <header className="pb-6 border-b border-border">
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center text-foreground">
          <BrainCircuit className="mr-4 h-10 w-10 text-primary" />
          Think Tank
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Long-form theoretical research, explorations of complex ideas, and dialogues on the frontiers of knowledge.
        </p>
      </header>
      
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {articles.map((article) => (
            <ThinkTankArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
         <p className="text-muted-foreground text-center py-10">No Think Tank articles yet. Dive deep soon!</p>
      )}
    </div>
  );
}
