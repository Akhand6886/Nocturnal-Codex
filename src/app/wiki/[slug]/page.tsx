import { MOCK_WIKI_ARTICLES } from "@/lib/data";
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { MarkdownRenderer } from "@/components/content/markdown-renderer";
import { BookOpen, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {format} from 'date-fns';
import Link from "next/link";

export async function generateStaticParams() {
  return MOCK_WIKI_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

interface WikiArticlePageProps {
  params: { slug: string };
}

export default async function WikiArticlePage({ params }: WikiArticlePageProps) {
  const article = MOCK_WIKI_ARTICLES.find((a) => a.slug === params.slug);

  if (!article) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold">Article Not Found</h1>
        <p className="text-muted-foreground">The requested wiki article could not be found.</p>
        <Link href="/wiki" className="text-primary hover:underline mt-4 inline-block">
          Back to Wiki
        </Link>
      </div>
    );
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Wiki", href: "/wiki" },
    { label: article.title },
  ];

  return (
    <article className="max-w-3xl mx-auto py-8 space-y-8">
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

      <div className="prose dark:prose-invert max-w-none">
        <MarkdownRenderer content={article.content} />
      </div>
    </article>
  );
}

export async function generateMetadata({ params }: WikiArticlePageProps) {
  const article = MOCK_WIKI_ARTICLES.find((a) => a.slug === params.slug);
  if (!article) {
    return { title: "Article Not Found | Nocturnal Codex" };
  }
  return {
    title: `${article.title} - Wiki | Nocturnal Codex`,
    description: `Wiki article on ${article.title}.`,
  };
}

