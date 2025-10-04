import Link from "next/link";
import type { Metadata } from 'next';
import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchBlogPosts, fetchBlogPostBySlug } from "@/lib/contentful";
import { ContentfulRichTextRenderer } from "@/components/contentful/rich-text-renderer";

export const revalidate = 60; 

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const defaultOgImage = `${siteUrl}/images/og-default.png`; 

// Updated interface - params is now a Promise
interface PageProps {
  params: Promise<{ slug: string }>;
}

// generateStaticParams return type stays the same (no Promise)
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

// Page component - await params
export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;  // Await params here
  const post = await fetchBlogPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/blog" className="hover:underline text-primary"> 
        ← Back to posts
      </Link>
      {post.featuredImage && (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
            <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            width={post.featuredImage.width}
            height={post.featuredImage.height}
            className="object-cover"
            data-ai-hint={post.featuredImage.dataAiHint || "blog banner"}
            priority
            />
        </div>
      )}
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-muted-foreground mb-4">Published: {new Date(post.date).toLocaleDateString()}</p>
      {post.content && <ContentfulRichTextRenderer content={post.content} />}
    </main>
  );
}

// generateMetadata - await params
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;  // Await params here
  const post = await fetchBlogPostBySlug(slug);

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
