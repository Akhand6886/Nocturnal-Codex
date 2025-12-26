
import { MOCK_WIKI_ARTICLES, type WikiArticle } from '@/lib/data';
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { BookCopy, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { WikiArticleCard } from '@/components/content/wiki-article-card';

export const metadata: Metadata = {
  title: 'Wiki',
  description: 'A glossary of core computer science concepts, data structures, and algorithms.',
};

export default function WikiPage() {
  const articlesByCategory = MOCK_WIKI_ARTICLES.reduce((acc, article) => {
    const { category } = article;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(article);
    return acc;
  }, {} as Record<string, WikiArticle[]>);

  const sortedCategories = Object.keys(articlesByCategory).sort();

  return (
    <div className="container mx-auto px-4 py-10 md:py-12">
      <header className="pb-6 border-b border-border">
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center text-foreground">
          <BookCopy className="mr-4 h-10 w-10 text-primary" />
          Wiki
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          A glossary of core computer science concepts, data structures, and algorithms.
        </p>
      </header>
      
      <div className="space-y-12 mt-10">
        {sortedCategories.map(category => (
            <section key={category}>
                <h2 className="text-2xl font-semibold mb-6 flex items-center text-foreground/90">
                    <Layers className="mr-3 h-6 w-6 text-accent" />
                    {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articlesByCategory[category].map(article => (
                        <WikiArticleCard key={article.slug} article={article} />
                    ))}
                </div>
            </section>
        ))}
      </div>
    </div>
  );
}
