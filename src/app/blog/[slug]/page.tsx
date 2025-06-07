
import type { BlogSeries } from "@/lib/data"; 
import { MOCK_BLOG_SERIES, MOCK_THINK_TANK_ARTICLES } from "@/lib/data"; 
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import Image from "next/image";
import { CalendarDays, UserCircle, Tag, Link as LinkIcon, ListOrdered, CheckCircle2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {format, compareDesc} from 'date-fns';
import Link from "next/link";
import { RelatedArticleCard, type RelatedArticle } from '@/components/content/related-article-card';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { client, urlFor, type SanityPost } from '@/lib/sanity'; // Import Sanity client, urlFor, and SanityPost type
import { PortableTextBlock } from '@/components/content/PortableTextBlock'; // Import PortableTextBlock

export const revalidate = 60; // Revalidate every 60 seconds

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const defaultOgImage = `${siteUrl}/images/og-default.png`; 

export async function generateStaticParams() {
  const query = `*[_type == "post" && defined(slug.current)][].slug.current`;
  const slugs = await client.fetch<string[]>(query);
  return slugs.map((slug) => ({
    slug,
  }));
}

interface BlogPostPageProps {
  params: { slug: string };
}

async function getPost(slug: string): Promise<SanityPost | null> {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    publishedAt,
    "updatedDate": _updatedAt, // Use Sanity's _updatedAt for modified date
    author,
    excerpt,
    mainImage {
      asset,
      alt,
      dataAiHint,
      caption
    },
    tags,
    category,
    seriesId,
    seriesOrder,
    featured,
    body
  }`;
  const post = await client.fetch<SanityPost>(query, { slug });
  return post || null;
}

async function getRelatedPosts(currentPost: SanityPost): Promise<SanityPost[]> {
  if (!currentPost.tags || currentPost.tags.length === 0) return [];
  const query = `*[_type == "post" && _id != $currentPostId && count(tags[@ in $currentPostTags]) > 0] | order(publishedAt desc) [0...3] {
    _id, title, slug, excerpt, mainImage, publishedAt, author, tags
  }`;
  return client.fetch<SanityPost[]>(query, {
    currentPostId: currentPost._id,
    currentPostTags: currentPost.tags,
  });
}

async function getSeriesPosts(seriesId?: string): Promise<SanityPost[]> {
  if (!seriesId) return [];
  const query = `*[_type == "post" && seriesId == $seriesId] | order(seriesOrder asc, publishedAt desc) {
    _id, title, slug, seriesOrder, publishedAt
  }`;
  return client.fetch<SanityPost[]>(query, { seriesId });
}


export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug);

  if (!post || !post.slug?.current) {
    notFound();
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title },
  ];
  
  const relatedSanityPosts = await getRelatedPosts(post);
  const relatedArticles: RelatedArticle[] = relatedSanityPosts.map(p => ({
    title: p.title,
    slug: p.slug.current,
    type: 'blog',
    excerpt: p.excerpt || undefined
  }));

  // Mix with Think Tank articles if needed, ensuring not too many duplicates from tags
  MOCK_THINK_TANK_ARTICLES.forEach(otherArticle => {
     if (otherArticle.tags && post.tags && otherArticle.tags.some(tag => post.tags!.includes(tag))) {
      if (relatedArticles.length < 5 && !relatedArticles.find(ra => ra.slug === otherArticle.slug && ra.type === 'think-tank')) {
         relatedArticles.push({ title: otherArticle.title, slug: otherArticle.slug, type: 'think-tank', excerpt: otherArticle.abstract });
      }
    }
  });
  
  let seriesPosts: SanityPost[] = [];
  let currentSeries: BlogSeries | undefined; // Keep MOCK_BLOG_SERIES for title/description for now
  if (post.seriesId) {
    currentSeries = MOCK_BLOG_SERIES.find(s => s.id === post.seriesId); // This might need to come from Sanity if series are managed there
    if (currentSeries) {
      seriesPosts = await getSeriesPosts(post.seriesId);
    }
  }

  const publishedDate = new Date(post.publishedAt);
  const modifiedDate = post.updatedDate ? new Date(post.updatedDate) : publishedDate;
  const postImageUrl = post.mainImage ? urlFor(post.mainImage)?.url() : defaultOgImage;
  const postImageAlt = post.mainImage?.alt || post.title;
  const postImageDataAiHint = post.mainImage?.dataAiHint;


  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article", 
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug.current}`
    },
    "headline": post.title,
    "description": post.excerpt,
    "image": postImageUrl,
    "datePublished": publishedDate.toISOString(),
    "dateModified": modifiedDate.toISOString(),
    "author": {
      "@type": "Person", 
      "name": post.author || "The Nocturnist"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Nocturnal Codex",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/images/logo.png` 
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
              {post.author && (
                <div className="flex items-center space-x-1.5">
                  <UserCircle className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
              )}
              <div className="flex items-center space-x-1.5">
                <CalendarDays className="h-4 w-4" />
                <span>
                  Published: {format(publishedDate, "MMMM d, yyyy")}
                  {post.updatedDate && modifiedDate.getTime() !== publishedDate.getTime() && (
                    <span className="ml-1 text-xs">(Updated: {format(modifiedDate, "MMMM d, yyyy")})</span>
                  )}
                </span>
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

          {post.mainImage && postImageUrl && (
            <figure className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg my-8">
              <Image 
                src={postImageUrl}
                alt={postImageAlt}
                fill 
                style={{objectFit: "cover"}} 
                priority 
                data-ai-hint={postImageDataAiHint || "blog header"}
                placeholder={urlFor(post.mainImage)?.width(20).blur(5).url()}
                blurDataURL={urlFor(post.mainImage)?.width(20).blur(5).url()}
              />
              {post.mainImage.caption && <figcaption className="absolute bottom-0 left-0 right-0 p-2 bg-black/50 text-white text-xs text-center">{post.mainImage.caption}</figcaption>}
            </figure>
          )}
          
          {post.body && <PortableTextBlock value={post.body} />}

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
                    <li key={seriesPost._id} className={`p-3 rounded-md transition-colors ${seriesPost._id === post._id ? 'bg-primary/10 border-primary/50 border' : 'hover:bg-accent/10'}`}>
                      <Link href={`/blog/${seriesPost.slug.current}`} className="flex items-center justify-between group">
                        <div>
                          <span className={`font-medium ${seriesPost._id === post._id ? 'text-primary' : 'text-foreground/90 group-hover:text-primary'}`}>
                            Part {seriesPost.seriesOrder || index + 1}: {seriesPost.title}
                          </span>
                          {seriesPost._id === post._id && (
                            <span className="text-xs text-primary ml-2 inline-flex items-center">
                              <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> (You are here)
                            </span>
                          )}
                        </div>
                        {seriesPost._id !== post._id && <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all transform group-hover:translate-x-1" />}
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
  const post = await getPost(params.slug);

  if (!post) {
    return { 
      title: "Post Not Found",
      description: "The blog post you are looking for could not be found." 
    };
  }

  const postImageUrl = post.mainImage ? urlFor(post.mainImage)?.width(1200).height(630).url() : defaultOgImage;
  const publishedDate = new Date(post.publishedAt);
  const modifiedDate = post.updatedDate ? new Date(post.updatedDate) : publishedDate;

  return {
    title: post.title,
    description: post.excerpt || "A blog post from Nocturnal Codex.",
    alternates: {
      canonical: `/blog/${post.slug.current}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || "A blog post from Nocturnal Codex.",
      url: `${siteUrl}/blog/${post.slug.current}`,
      type: 'article',
      publishedTime: publishedDate.toISOString(),
      modifiedTime: modifiedDate.toISOString(), 
      authors: [post.author || "The Nocturnist"], 
      images: [
        {
          url: postImageUrl,
          width: 1200, 
          height: 630,
          alt: post.mainImage?.alt || post.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || "A blog post from Nocturnal Codex.",
      images: [postImageUrl],
    },
  };
}
