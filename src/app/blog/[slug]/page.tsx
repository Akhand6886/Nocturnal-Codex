
import type { BlogPost, BlogSeries } from "@/lib/data";
import { MOCK_BLOG_SERIES, MOCK_THINK_TANK_ARTICLES, MOCK_BLOG_POSTS as MOCK_FALLBACK_BLOG_POSTS } from "@/lib/data"; // Keep MOCK_BLOG_POSTS for series linking if needed
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { MarkdownRenderer } from "@/components/content/markdown-renderer";
import Image from "next/image";
import { CalendarDays, UserCircle, Tag, Link as LinkIcon, ListOrdered, CheckCircle2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {format} from 'date-fns';
import Link from "next/link";
import { RelatedArticleCard, type RelatedArticle } from '@/components/content/related-article-card';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllPostSlugs, getPostData, getSortedPostsData } from '@/lib/blog'; // Added getSortedPostsData

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostData(params.slug);

  if (!post) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold">Post Not Found</h1>
        <p className="text-muted-foreground">The requested blog post could not be found.</p>
         <Link href="/blog" className="text-primary hover:underline mt-4 inline-block">
          Back to Blog
        </Link>
      </div>
    );
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title },
  ];

  const allBlogPosts = getSortedPostsData(); // Get all posts for series and related articles

  const relatedArticles: RelatedArticle[] = [];
  if (post.tags && post.tags.length > 0) {
    allBlogPosts.forEach(otherPost => { 
      if (otherPost.id !== post.id && otherPost.tags.some(tag => post.tags.includes(tag))) {
        if (relatedArticles.length < 3 && !relatedArticles.find(ra => ra.slug === otherPost.slug && ra.type === 'blog')) {
          relatedArticles.push({ title: otherPost.title, slug: otherPost.slug, type: 'blog', excerpt: otherPost.excerpt });
        }
      }
    });
    // You can keep or modify the Think Tank related logic as needed
    MOCK_THINK_TANK_ARTICLES.forEach(otherArticle => {
       if (otherArticle.tags && otherArticle.tags.some(tag => post.tags.includes(tag))) {
        if (relatedArticles.length < 5 && !relatedArticles.find(ra => ra.slug === otherArticle.slug && ra.type === 'think-tank')) {
           relatedArticles.push({ title: otherArticle.title, slug: otherArticle.slug, type: 'think-tank', excerpt: otherArticle.abstract });
        }
      }
    });
  }
  
  let seriesPosts: BlogPost[] = [];
  let currentSeries: BlogSeries | undefined;
  if (post.seriesId) {
    currentSeries = MOCK_BLOG_SERIES.find(s => s.id === post.seriesId);
    if (currentSeries) {
      seriesPosts = allBlogPosts
        .filter(p => p.seriesId === post.seriesId)
        .sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0));
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <article className="space-y-8">
        <Breadcrumbs items={breadcrumbItems} />
        
        <header className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1.5">
              <UserCircle className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CalendarDays className="h-4 w-4" />
              <span>{format(new Date(post.date), "MMMM d, yyyy")}</span>
            </div>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>
          )}
        </header>

        {post.imageUrl && (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg my-8">
            <Image 
              src={post.imageUrl} 
              alt={post.title} 
              layout="fill" 
              objectFit="cover" 
              priority 
              data-ai-hint={post.dataAiHint || "blog header"}
            />
          </div>
        )}

        {/* Content is now HTML, directly rendered */}
        <div 
            className="prose dark:prose-invert max-w-none markdown-content" 
            dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </article>

      {currentSeries && seriesPosts.length > 0 && (
        <section className="mt-12 pt-8 border-t border-border">
          <Card className="bg-card shadow-md border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-primary flex items-center">
                <ListOrdered className="mr-3 h-6 w-6" />
                Part of Series: {currentSeries.title}
              </CardTitle>
              {currentSeries.description && <p className="text-sm text-muted-foreground mt-1">{currentSeries.description}</p>}
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {seriesPosts.map((seriesPost, index) => (
                  <li key={seriesPost.id} className={`p-3 rounded-md transition-colors ${seriesPost.id === post.id ? 'bg-primary/10 border-primary/50 border' : 'hover:bg-accent/10'}`}>
                    <Link href={`/blog/${seriesPost.slug}`} className="flex items-center justify-between group">
                      <div>
                        <span className={`font-medium ${seriesPost.id === post.id ? 'text-primary' : 'text-foreground/90 group-hover:text-primary'}`}>
                          Part {index + 1}: {seriesPost.title}
                        </span>
                        {seriesPost.id === post.id && (
                          <span className="text-xs text-primary ml-2 inline-flex items-center">
                            <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> (You are here)
                          </span>
                        )}
                      </div>
                      {seriesPost.id !== post.id && <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all transform group-hover:translate-x-1" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      )}

      {relatedArticles.length > 0 && (
        <section className="mt-16 pt-8 border-t border-border">
          <h2 className="text-2xl font-semibold mb-6 text-foreground flex items-center">
            <LinkIcon className="h-6 w-6 mr-3 text-primary" />
            Related Content
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedArticles.slice(0,4).map(article => (
              <RelatedArticleCard key={`${article.type}-${article.slug}`} article={article} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getPostData(params.slug);
  if (!post) {
    return { title: "Post Not Found | Nocturnal Codex" };
  }
  return {
    title: `${post.title} | Nocturnal Codex`,
    description: post.excerpt,
  };
}
