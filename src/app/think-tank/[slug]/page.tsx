
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';
import { format } from 'date-fns';
import { Users, CalendarDays, Tag as TagIcon, FileText, Link as LinkIconLucide, GraduationCap, Layers, Quote, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { RelatedArticleCard, type RelatedArticle } from '@/components/content/related-article-card';
import { fetchThinkTankArticles, fetchThinkTankArticleBySlug, fetchBlogPosts } from "@/lib/contentful";
import { ContentfulRichTextRenderer } from "@/components/contentful/rich-text-renderer";
import { richTextToPlainText } from "@/lib/utils";
import { draftMode } from 'next/headers';
export async function generateStaticParams() {
  if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
    console.warn("Contentful env-vars missing at build-time – ISR paths for think tank articles will not be generated.");
    return [];
  }
  const articles = await fetchThinkTankArticles({ limit: 50 });
  if (!articles) return [];
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Corrected interface - params is a plain object
interface ThinkTankArticlePageProps {
  params: Promise<{ slug: string }>;
}

// Page component - no await on params
export default async function ThinkTankArticlePage({ params }: ThinkTankArticlePageProps) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const article = await fetchThinkTankArticleBySlug(slug, isEnabled);

  if (!article) {
    notFound();
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Think Tank", href: "/think-tank" },
    { label: article.title },
  ];

  const relatedArticles: RelatedArticle[] = [];
  if (article.tags && article.tags.length > 0) {
    const allThinkTank = (await fetchThinkTankArticles()) || [];
    allThinkTank.forEach(otherArticle => {
      if (otherArticle.id !== article.id && otherArticle.tags?.some(tag => article.tags!.includes(tag))) {
        if (relatedArticles.length < 2 && !relatedArticles.find(ra => ra.slug === otherArticle.slug && ra.type === 'think-tank')) {
          relatedArticles.push({ title: otherArticle.title, slug: otherArticle.slug, type: 'think-tank', excerpt: richTextToPlainText(otherArticle.abstract) });
        }
      }
    });

    const allBlogPosts = (await fetchBlogPosts()) || [];
    const relatedBlogPosts = allBlogPosts.filter(post => 
        post.tags?.some(tag => article.tags?.includes(tag))
    ).slice(0, 3);

    relatedBlogPosts.forEach(otherPost => {
      if (relatedArticles.length < 5 && otherPost.slug) {
         relatedArticles.push({ 
            title: otherPost.title, 
            slug: otherPost.slug, 
            type: 'blog', 
            excerpt: otherPost.shortDescription 
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
            {article.discipline && (
              <div className="flex items-center space-x-1.5">
                <GraduationCap className="h-4 w-4" />
                <span>{article.discipline}</span>
              </div>
            )}
            {article.series && (
              <div className="flex items-center space-x-1.5">
                <Layers className="h-4 w-4" />
                <span>Series: {article.series}</span>
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {article.tags && article.tags.length > 0 && (
              <>
                <TagIcon className="h-4 w-4 text-muted-foreground" />
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[10px] uppercase tracking-wider">{tag}</Badge>
                ))}
              </>
            )}
            {article.pdfUrl && (
              <Button variant="outline" size="sm" asChild className="ml-auto h-8 gap-2">
                <a href={article.pdfUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="h-3.5 w-3.5" />
                  Download PDF
                </a>
              </Button>
            )}
          </div>
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
        
        <Card className="bg-card shadow-md border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center text-xl tracking-tight"><FileText className="mr-2 h-5 w-5 text-primary"/>Abstract</CardTitle>
          </CardHeader>
          <CardContent>
            {article.abstract && <ContentfulRichTextRenderer content={article.abstract} />}
          </CardContent>
        </Card>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          {article.content && <ContentfulRichTextRenderer content={article.content} />}
        </div>

        {article.citations && (
          <section className="mt-12 p-6 bg-muted/30 rounded-lg border border-border/50">
            <h2 className="text-lg font-bold flex items-center mb-4">
              <Quote className="mr-2 h-5 w-5 text-primary" />
              Citations & References
            </h2>
            <div className="text-sm text-muted-foreground leading-relaxed">
              <ContentfulRichTextRenderer content={article.citations} />
            </div>
          </section>
        )}
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

// generateMetadata - no await on params
export async function generateMetadata({ params }: ThinkTankArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const article = await fetchThinkTankArticleBySlug(slug, isEnabled);
  if (!article) {
    return { title: "Article Not Found | Nocturnal Codex" };
  }

  const seoTitle = article.metaTitle || `${article.title} | Think Tank | Nocturnal Codex`;
  const seoDescription = article.metaDescription || richTextToPlainText(article.abstract);

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: article.title,
      description: seoDescription,
      images: article.featuredImage ? [{ url: article.featuredImage.url, width: article.featuredImage.width, height: article.featuredImage.height, alt: article.featuredImage.alt }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: plainTextDescription,
      images: article.featuredImage ? [article.featuredImage.url] : [],
    }
  };
}
