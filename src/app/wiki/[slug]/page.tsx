
import { MOCK_WIKI_ARTICLES } from "@/lib/data";
// import type { WikiArticle } from "@/lib/data"; // Not strictly needed if only using article from find
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { MarkdownRenderer } from "@/components/content/markdown-renderer";
import { BookOpen, CalendarDays, Link as LinkIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {format} from 'date-fns';
import Link from "next/link";
import { RelatedArticleCard, type RelatedArticle } from '@/components/content/related-article-card';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const revalidate = 60; // Revalidate every 60 seconds

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateStaticParams() {
  return MOCK_WIKI_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

interface WikiArticlePageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: WikiArticlePageProps): Promise<Metadata> {
  const article = MOCK_WIKI_ARTICLES.find((a) => a.slug === params.slug);
  if (!article) {
    return { 
      title: "Article Not Found | Nocturnal Codex",
      description: "The wiki article you are looking for could not be found."
    };
  }
  const description = article.content.substring(0, 160).split('\\n')[0] + "...";
  return {
    title: `${article.title} - Wiki | Nocturnal Codex`,
    description: description,
    alternates: {
      canonical: `/wiki/${article.slug}`,
    },
    openGraph: {
      title: `${article.title} - Wiki`,
      description: description,
      url: `${siteUrl}/wiki/${article.slug}`,
      type: 'article',
      // publishedTime: new Date(article.lastUpdated).toISOString(), // Assuming lastUpdated can serve as publishedTime
      modifiedTime: new Date(article.lastUpdated).toISOString(),
    },
  };
}


export default async function WikiArticlePage({ params }: WikiArticlePageProps) {
  const article = MOCK_WIKI_ARTICLES.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Wiki", href: "/wiki" },
    { label: article.title },
  ];

  const relatedArticles: RelatedArticle[] = MOCK_WIKI_ARTICLES
    .filter(otherArticle => 
      otherArticle.id !== article.id && 
      otherArticle.category === article.category &&
      article.category !== undefined
    )
    .map(otherArticle => ({
      title: otherArticle.title,
      slug: otherArticle.slug,
      type: 'wiki',
      excerpt: otherArticle.content.substring(0, 100).split('\\n')[0] + "..." 
    }))
    .slice(0, 4); 

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle", // Or "Article"
    "headline": article.title,
    "abstract": article.content.substring(0, 250).split('\\n')[0] + "...",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/wiki/${article.slug}`
    },
    "datePublished": new Date(article.lastUpdated).toISOString(), // Or a dedicated "datePublished" field if available
    "dateModified": new Date(article.lastUpdated).toISOString(),
    "publisher": {
      "@type": "Organization",
      "name": "Nocturnal Codex",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/images/logo.png` // Ensure logo.png exists in /public/images
      }
    }
    // "author": { "@type": "Person", "name": "The Nocturnist" } // If applicable
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="max-w-3xl mx-auto py-8">
        <article className="space-y-8">
          <Breadcrumbs items={breadcrumbItems} />
          
          <header className="space-y-3 border-b border-border pb-6">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground flex items-start">
              <BookOpen className="mr-3 mt-1 h-8 w-8 text-primary flex-shrink-0" />
              <span>{article.title}</span>
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {article.category && (
                <Badge variant="outline">Category: {article.category}</Badge>
              )}
              <div className="flex items-center space-x-1.5">
                <CalendarDays className="h-4 w-4" />
                <span>Last updated: {format(new Date(article.lastUpdated), "MMMM d, yyyy")}</span>
              </div>
            </div>
          </header>

          <div className="prose dark:prose-invert max-w-none markdown-content">
            <MarkdownRenderer content={article.content} />
          </div>
        </article>

        {relatedArticles.length > 0 && (
          <section className="mt-16 pt-8 border-t border-border">
            <h2 className="text-2xl font-semibold mb-6 text-foreground flex items-center">
              <LinkIcon className="h-6 w-6 mr-3 text-primary" />
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map(related => (
                <RelatedArticleCard key={`${related.type}-${related.slug}`} article={related} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
