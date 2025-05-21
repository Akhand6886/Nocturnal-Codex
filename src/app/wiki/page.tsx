import { MOCK_WIKI_ARTICLES } from "@/lib/data";
import { WikiArticleLink } from "@/components/content/wiki-article-link";
import { BookMarked } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WikiPage() {
  const sortedArticles = [...MOCK_WIKI_ARTICLES].sort((a, b) => a.title.localeCompare(b.title));

  // Group articles by category or first letter if no category
  const groupedArticles: Record<string, typeof sortedArticles> = {};
  sortedArticles.forEach(article => {
    const key = article.category || article.title.charAt(0).toUpperCase();
    if (!groupedArticles[key]) {
      groupedArticles[key] = [];
    }
    groupedArticles[key].push(article);
  });


  return (
    <div className="space-y-10">
      <header className="pb-6 border-b border-border">
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center text-foreground">
          <BookMarked className="mr-4 h-10 w-10 text-primary" />
          Wiki
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          A compendium of factual, reference-style articles on computer science concepts, theories, and technologies.
        </p>
      </header>
      
      {Object.keys(groupedArticles).sort().map(groupKey => (
        <section key={groupKey} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-border/70 text-foreground/90">{groupKey}</h2>
          <Card className="bg-card shadow-md">
            <CardContent className="p-2 space-y-1">
              {groupedArticles[groupKey].map((article) => (
                <WikiArticleLink key={article.id} article={article} />
              ))}
            </CardContent>
          </Card>
        </section>
      ))}

      {sortedArticles.length === 0 && (
         <p className="text-muted-foreground text-center py-10">No wiki articles yet. Check back soon!</p>
      )}
    </div>
  );
}

export const metadata = {
  title: "Wiki | Nocturnal Codex",
  description: "Reference articles on computer science and technology.",
};
