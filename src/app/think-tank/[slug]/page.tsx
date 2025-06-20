
import { MOCK_THINK_TANK_ARTICLES } from "@/lib/data";
import type { ThinkTankArticle } from "@/lib/data";
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { MarkdownRenderer } from "@/components/content/markdown-renderer";
import Image from "next/image";
import { Users, CalendarDays, Tag as TagIcon, FileText, Sigma, Link as LinkIconLucide } from "lucide-react"; // Renamed Tag and Link
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {format} from 'date-fns';
import Link from "next/link";
import { RelatedArticleCard, type RelatedArticle } from '@/components/content/related-article-card';
import { client, type SanityPost } from '@/lib/sanity'; // Import Sanity client
import type { Metadata } from 'next';

export const revalidate = 60; // Revalidate every 60 seconds

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

  const relatedArticles: RelatedArticle[] = [];
  if (article.tags && article.tags.length > 0) {
    // Related Think Tank articles (mock data)
    MOCK_THINK_TANK_ARTICLES.forEach(otherArticle => {
      if (otherArticle.id !== article.id && otherArticle.tags && otherArticle.tags.some(tag => article.tags!.includes(tag))) {
        if (relatedArticles.length < 2 && !relatedArticles.find(ra => ra.slug === otherArticle.slug && ra.type === 'think-tank')) { // Limit to 2 from mock
          relatedArticles.push({ title: otherArticle.title, slug: otherArticle.slug, type: 'think-tank', excerpt: otherArticle.abstract });
        }
      }
    });

    // Related Blog posts (from Sanity)
    const sanityBlogQuery = `*[_type == "post" && count(tags[@ in $articleTags]) > 0 && _id != $currentArticleId] | order(publishedAt desc) [0...3] {
      title, "slug": slug.current, excerpt
    }`;
    const relatedSanityPosts = await client.fetch<Array<Pick<SanityPost, 'title' | 'slug' | 'excerpt'>>>(
      sanityBlogQuery, 
      { articleTags: article.tags, currentArticleId: "" } // currentArticleId isn't relevant for blog posts, but Sanity needs defined params
    );

    relatedSanityPosts.forEach(otherPost => {
      if (relatedArticles.length < 5 && otherPost.slug) { // Ensure slug exists
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

        {article.imageUrl && (
          <div className="relative w-full aspect-[16/7] rounded-lg overflow-hidden shadow-lg my-8">
            <Image 
              src={article.imageUrl} 
              alt={article.title} 
              fill 
              style={{objectFit: "cover"}} 
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
          {article.content.includes("$$") && ( 
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
  const article = MOCK_THINK_TANK_ARTICLES.find((a) => a.slug === params.slug);
  if (!article) {
    return { title: "Article Not Found | Nocturnal Codex" };
  }
  return {
    title: `${article.title} | Think Tank | Nocturnal Codex`,
    description: article.abstract,
  };
}
