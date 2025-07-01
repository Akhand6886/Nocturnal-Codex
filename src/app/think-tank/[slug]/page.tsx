
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';
import { format } from 'date-fns';
import { Users, CalendarDays, Tag as TagIcon, FileText, Sigma, Link as LinkIconLucide } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { RelatedArticleCard, type RelatedArticle } from '@/components/content/related-article-card';
import { fetchThinkTankArticles, fetchThinkTankArticleBySlug, fetchBlogPosts } from "@/lib/contentful";
import { ContentfulRichTextRenderer } from "@/components/contentful/rich-text-renderer";
import type { BlogPost, ThinkTankArticle } from "@/types";

export const revalidate = 60;

export async function generateStaticParams() {
  const articles = await fetchThinkTankArticles({ limit: 50 });
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

interface ThinkTankArticlePageProps {
  params: { slug: string };
}

export default async function ThinkTankArticlePage({ params }: ThinkTankArticlePageProps) {
  const article = await fetchThinkTankArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Think Tank", href: "/think-tank" },
    { label: article.title },
  ];

  // Fetch related content
  const relatedArticles: RelatedArticle[] = [];
  if (article.tags && article.tags.length > 0) {
    const allThinkTank = await fetchThinkTankArticles();
    allThinkTank.forEach(otherArticle => {
      if (otherArticle.id !== article.id && otherArticle.tags?.some(tag => article.tags!.includes(tag))) {
        if (relatedArticles.length < 2 && !relatedArticles.find(ra => ra.slug === otherArticle.slug && ra.type === 'think-tank')) {
          relatedArticles.push({ title: otherArticle.title, slug: otherArticle.slug, type: 'think-tank', excerpt: otherArticle.abstract });
        }
      }
    });

    const allBlogPosts = await fetchBlogPosts();
    const relatedBlogPosts = allBlogPosts.filter(post => 
        post.tags?.some(tag => article.tags?.includes(tag))
    ).slice(0, 3);

    relatedBlogPosts.forEach(otherPost => {
      if (relatedArticles.length < 5 && otherPost.slug) {
         relatedArticles.push({ 
            title: otherPost.title, 
            slug: otherPost.slug, 
            type: 'blog', 
            excerpt: otherPost.excerpt 
        });
      }
    });
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <article className="space-y-8">
        <Breadcrumbs items={breadcrumbItems} />
        
        <header className="space-y-4 border-b border-border pb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1.5">
              <Users className="h-4 w-4" />
              <span>{article.authors.join(", ")}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CalendarDays className="h-4 w-4" />
              <span>Published: {format(new Date(article.date), "MMMM d, yyyy")}</span>
            </div>
          </div>
           {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <TagIcon className="h-4 w-4 text-muted-foreground" />
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
              ))}
            </div>
          )}
        </header>

        {article.featuredImage && (
          <div className="relative w-full aspect-[16/7] rounded-lg overflow-hidden shadow-lg my-8">
            <Image 
              src={article.featuredImage.url} 
              alt={article.featuredImage.alt} 
              width={article.featuredImage.width}
              height={article.featuredImage.height}
              className="object-cover w-full h-full"
              priority 
              data-ai-hint={article.featuredImage.dataAiHint || "research concept"}
            />
          </div>
        )}
        
        <Card className="bg-card shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center text-xl"><FileText className="mr-2 h-5 w-5 text-primary"/>Abstract</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="italic text-muted-foreground">{article.abstract}</p>
          </CardContent>
        </Card>

        <ContentfulRichTextRenderer content={article.content} />

      </article>

      {relatedArticles.length > 0 && (
        <section className="mt-16 pt-8 border-t border-border">
          <h2 className="text-2xl font-semibold mb-6 text-foreground flex items-center">
            <LinkIconLucide className="h-6 w-6 mr-3 text-primary" />
            Related Content
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

export async function generateMetadata({ params }: ThinkTankArticlePageProps): Promise<Metadata> {
  const article = await fetchThinkTankArticleBySlug(params.slug);
  if (!article) {
    return { title: "Article Not Found | Nocturnal Codex" };
  }
  return {
    title: `${article.title} | Think Tank | Nocturnal Codex`,
    description: article.abstract,
    openGraph: {
      title: article.title,
      description: article.abstract,
      images: article.featuredImage ? [article.featuredImage.url] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.abstract,
      images: article.featuredImage ? [article.featuredImage.url] : [],
    }
  };
}
