
import type { BlogSeries } from "@/lib/data"; // Keep for series type if needed
import { MOCK_BLOG_SERIES, MOCK_THINK_TANK_ARTICLES } from "@/lib/data"; 
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import Image from "next/image";
import { CalendarDays, UserCircle, Tag, Link as LinkIcon, ListOrdered, CheckCircle2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {format, compareDesc} from 'date-fns';
import Link from "next/link";
import { RelatedArticleCard, type RelatedArticle } from '@/components/content/related-article-card';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { allBlogPosts, type BlogPost } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const revalidate = 60; // Revalidate every 60 seconds

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const defaultOgImage = `${siteUrl}/images/og-default.png`; 

export async function generateStaticParams() {
  return allBlogPosts.map((post) => ({
    slug: post.slug,
  }));
}

interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = allBlogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title },
  ];
  
  const allPostsForSeriesAndRelated = allBlogPosts.sort((a, b) => 
    compareDesc(new Date(a.date), new Date(b.date))
  );

  const relatedArticles: RelatedArticle[] = [];
  if (post.tags && post.tags.length > 0) {
    allPostsForSeriesAndRelated.forEach(otherPost => { 
      if (otherPost.id !== post.id && otherPost.tags && otherPost.tags.some(tag => post.tags!.includes(tag))) {
        if (relatedArticles.length < 3 && !relatedArticles.find(ra => ra.slug === otherPost.slug && ra.type === 'blog')) {
          relatedArticles.push({ title: otherPost.title, slug: otherPost.slug, type: 'blog', excerpt: otherPost.excerpt });
        }
      }
    });
    MOCK_THINK_TANK_ARTICLES.forEach(otherArticle => {
       if (otherArticle.tags && post.tags && otherArticle.tags.some(tag => post.tags!.includes(tag))) {
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
      seriesPosts = allPostsForSeriesAndRelated
        .filter(p => p.seriesId === post.seriesId)
        .sort((a, b) => (a.seriesOrder ?? Infinity) - (b.seriesOrder ?? Infinity) || compareDesc(new Date(a.date), new Date(b.date)));
    }
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article", // Could also be BlogPosting
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`
    },
    "headline": post.title,
    "description": post.excerpt,
    "image": post.imageUrl ? `${siteUrl}${post.imageUrl}` : defaultOgImage,
    "datePublished": new Date(post.date).toISOString(),
    "dateModified": new Date(post.date).toISOString(), // Use a more specific modification date if available
    "author": {
      "@type": "Person", // Or Organization if appropriate
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Nocturnal Codex",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/images/logo.png` // Replace with your actual logo URL
      }
    }
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
                fill 
                style={{objectFit: "cover"}} 
                priority 
                data-ai-hint={post.dataAiHint || "blog header"}
              />
            </div>
          )}

          <div 
              className="prose dark:prose-invert max-w-none markdown-content" 
              dangerouslySetInnerHTML={{ __html: post.body.html }} 
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
                            Part {seriesPost.seriesOrder || index + 1}: {seriesPost.title}
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
    </>
  );
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = allBlogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return { 
      title: "Post Not Found",
      description: "The blog post you are looking for could not be found." 
    };
  }

  const postImageUrl = post.imageUrl ? `${siteUrl}${post.imageUrl}` : defaultOgImage;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/blog/${post.slug}`,
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: new Date(post.date).toISOString(), // Or a more specific modification date
      authors: [post.author], // Can be an array of author names or URLs
      images: [
        {
          url: postImageUrl,
          width: post.imageUrl ? 1200 : undefined, // Provide dimensions if known
          height: post.imageUrl ? 630 : undefined,
          alt: post.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [postImageUrl],
    },
  };
}
