
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MOCK_WIKI_ARTICLES, getWikiArticleBySlug, getRelatedWikiArticles } from '@/lib/data';
import { MarkdownRenderer } from '@/components/content/markdown-renderer';
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { Badge } from '@/components/ui/badge';
import { Layers, Link as LinkIcon } from 'lucide-react';
import { RelatedArticleCard, type RelatedArticle } from '@/components/content/related-article-card';

interface WikiArticlePageProps {
  params: { slug: string };
}

// Generate static pages for all wiki articles at build time
export async function generateStaticParams() {
  return MOCK_WIKI_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: WikiArticlePageProps): Promise<Metadata> {
  const article = getWikiArticleBySlug(params.slug);
  
  if (!article) {
    return { title: 'Article Not Found' };
  }
  return {
    title: `${article.title} | Wiki`,
    description: article.excerpt,
  };
}

export default async function WikiArticlePage({ params }: WikiArticlePageProps) {
  const article = getWikiArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }
  
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Wiki", href: "/wiki" },
    { label: article.title },
  ];

  const relatedArticlesRaw = getRelatedWikiArticles(article);
  const relatedArticles: RelatedArticle[] = relatedArticlesRaw.map(ra => ({
      title: ra.title,
      slug: ra.slug,
      type: 'wiki' as const, // Use as const to satisfy the type
      excerpt: ra.excerpt,
  }));

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10 md:py-12">
      <article className="space-y-8">
        <Breadcrumbs items={breadcrumbItems} />
        
        <header className="space-y-4 border-b border-border pb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">{article.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Layers className="h-4 w-4" />
              <Badge variant="secondary">{article.category}</Badge>
            </div>
          </div>
        </header>
        
        <MarkdownRenderer content={article.content} />
      </article>
      
      {relatedArticles.length > 0 && (
        <section className="mt-16 pt-8 border-t border-border">
          <h2 className="text-2xl font-semibold mb-6 text-foreground flex items-center">
            <LinkIcon className="h-6 w-6 mr-3 text-primary" />
            Related Concepts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedArticles.slice(0,4).map(related => (
              <RelatedArticleCard key={`${related.type}-${related.slug}`} article={related} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
