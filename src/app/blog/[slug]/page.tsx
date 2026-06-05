
import Link from "next/link";
import type { Metadata } from 'next';
import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchBlogPosts, fetchBlogPostBySlug } from "@/lib/contentful";
import { ContentfulRichTextRenderer } from "@/components/contentful/rich-text-renderer";
import { draftMode } from 'next/headers';
import { format } from 'date-fns';
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const defaultOgImage = `${siteUrl}/images/og-default.png`; 

// Corrected interface - params is a plain object
interface PageProps {
  params: Promise<{ slug: string }>;
}

// generateStaticParams return type is correct
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
    console.warn("Contentful env-vars missing at build-time – ISR paths for blog posts will not be generated.");
    return [];
  }
  const posts = await fetchBlogPosts({ limit: 50 }); 
  if (!posts) return [];
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Page component
export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const post = await fetchBlogPostBySlug(slug, isEnabled);
  
  if (!post) {
    notFound();
  }

  const formattedDate = post.date ? format(new Date(post.date), "MMMM d, yyyy") : null;

  return (
    <main className="min-h-screen">
      <article className="editorial-article">
        {/* Back link */}
        <Link href="/blog" className="editorial-back-link">
          <ArrowLeft className="h-4 w-4" />
          Back to posts
        </Link>

        {/* Category breadcrumb */}
        {post.category && (
          <div className="editorial-breadcrumb">
            <span>Blog</span>
            <span className="separator">·</span>
            <span>{post.category}</span>
          </div>
        )}

        {/* Headline */}
        <h1 className="editorial-headline">{post.title}</h1>

        {/* Deck / subtitle */}
        {post.shortDescription && (
          <p className="editorial-deck">{post.shortDescription}</p>
        )}

        {/* Meta: author + date */}
        <div className="editorial-meta">
          {post.author && <span className="author">{post.author}</span>}
          {post.author && formattedDate && <span className="separator-dot" />}
          {formattedDate && <time dateTime={post.date}>{formattedDate}</time>}
        </div>

        {/* Featured image */}
        {post.featuredImage && (
          <div className="editorial-hero-image">
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt}
              width={post.featuredImage.width}
              height={post.featuredImage.height}
              className="object-cover w-full"
              data-ai-hint={post.featuredImage.dataAiHint || "blog banner"}
              priority
            />
          </div>
        )}

        {/* Article body */}
        {post.content && (
          <div className="editorial-body">
            <ContentfulRichTextRenderer content={post.content} />
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="editorial-tags">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs font-semibold px-3 py-1">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </article>
    </main>
  );
}

// generateMetadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const post = await fetchBlogPostBySlug(slug, isEnabled);

  if (!post) {
    return { 
      title: "Post Not Found",
      description: "The blog post you are looking for could not be found." 
    };
  }
  
  const postImageUrlForMeta = post.featuredImage?.url || defaultOgImage;
  const publishedDate = new Date(post.date);

  return {
    title: post.title,
    description: post.shortDescription,
    alternates: {
      canonical: post.url,
    },
    openGraph: {
      title: post.title,
      description: post.shortDescription,
      url: `${siteUrl}${post.url}`,
      type: 'article',
      publishedTime: publishedDate.toISOString(),
      authors: [post.author || "The Nocturnist"], 
      images: [
        {
          url: postImageUrlForMeta,
          width: 1200, 
          height: 630,
          alt: post.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.shortDescription,
      images: [postImageUrlForMeta],
    },
  };
}
