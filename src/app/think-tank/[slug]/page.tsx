import { MOCK_THINK_TANK_ARTICLES } from "@/lib/data";
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { MarkdownRenderer } from "@/components/content/markdown-renderer";
import Image from "next/image";
import { Users, CalendarDays, Tag, FileText, Sigma } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {format} from 'date-fns';
import Link from "next/link";

export async function generateStaticParams() {
  return MOCK_THINK_TANK_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

interface ThinkTankArticlePageProps {
  params: { slug: string };
}

export default async function ThinkTankArticlePage({ params }: ThinkTankArticlePageProps) {
  const article = MOCK_THINK_TANK_ARTICLES.find((a) => a.slug === params.slug);

  if (!article) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold">Article Not Found</h1>
        <p className="text-muted-foreground">The requested Think Tank article could not be found.</p>
        <Link href="/think-tank" className="text-primary hover:underline mt-4 inline-block">
          Back to Think Tank
        </Link>
      </div>
    );
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Think Tank", href: "/think-tank" },
    { label: article.title },
  ];

  return (
    <article className="max-w-4xl mx-auto py-8 space-y-8">
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
            <Tag className="h-4 w-4 text-muted-foreground" />
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
            ))}
          </div>
        )}
      </header>

      {article.imageUrl && (
        <div className="relative w-full aspect-[16/7] rounded-lg overflow-hidden shadow-lg my-8">
          <Image 
            src={article.imageUrl} 
            alt={article.title} 
            layout="fill" 
            objectFit="cover" 
            priority 
            data-ai-hint={article.dataAiHint || "research concept"}
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

      <div className="prose dark:prose-invert max-w-none">
        <MarkdownRenderer content={article.content} />
        {/* Conceptual note for LaTeX */}
        {article.content.includes("$$") && ( // Basic check for LaTeX delimiters
            <div className="my-6 p-4 border border-dashed border-accent rounded-md bg-accent/10">
                <div className="flex items-center text-sm text-accent-foreground mb-2">
                    <Sigma className="h-5 w-5 mr-2"/> 
                    <span>Mathematical expressions rendered via LaTeX (conceptual).</span>
                </div>
                <p className="text-xs text-muted-foreground">
                    In a full implementation, LaTeX content would be processed by a library like KaTeX or MathJax for proper display.
                </p>
            </div>
        )}
      </div>
    </article>
  );
}

export async function generateMetadata({ params }: ThinkTankArticlePageProps) {
  const article = MOCK_THINK_TANK_ARTICLES.find((a) => a.slug === params.slug);
  if (!article) {
    return { title: "Article Not Found | Nocturnal Codex" };
  }
  return {
    title: `${article.title} | Think Tank | Nocturnal Codex`,
    description: article.abstract,
  };
}
