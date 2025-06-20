
import { BlogPostCard } from "@/components/content/blog-post-card";
import { FileText } from "lucide-react";
import { client, type SanityPost, urlFor } from '@/lib/sanity'; // Import Sanity client, Post type, and urlFor
import type { Metadata } from 'next';

export const revalidate = 60; // Revalidate every 60 seconds

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const defaultLogoUrl = `${siteUrl}/images/logo.png`; // Define a default logo URL

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog | Nocturnal Codex",
    description: "Read the latest articles, insights, and musings from the custodians of the Nocturnal Codex, powered by Sanity CMS.",
    alternates: {
      canonical: "/blog",
    },
    openGraph: {
      title: "Blog | Nocturnal Codex",
      description: "Read the latest articles and insights from Nocturnal Codex.",
      url: `${siteUrl}/blog`,
      type: 'website',
    },
  };
}

async function getBlogPosts(): Promise<SanityPost[]> {
  const query = `*[_type == "post"] | order(publishedAt desc) [0...10] {
    _id,
    title,
    slug,
    publishedAt,
    author,
    excerpt,
    mainImage {
      ..., // Include all fields from mainImage
      asset-> // Resolve the asset reference
    },
    tags,
    category
  }`;
  const posts = await client.fetch<SanityPost[]>(query);
  return posts;
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  const blogPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Nocturnal Codex Blog",
    "description": "Insights, articles, and musings from the custodians of the Nocturnal Codex.",
    "url": `${siteUrl}/blog`,
    "publisher": {
        "@type": "Organization",
        "name": "Nocturnal Codex",
        "logo": {
            "@type": "ImageObject",
            "url": defaultLogoUrl 
        }
    },
    "blogPost": posts.map(post => {
      const imageUrl = post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined;
      return {
        "@type": "BlogPosting",
        "mainEntityOfPage": `${siteUrl}/blog/${post.slug?.current}`,
        "headline": post.title,
        "image": imageUrl, // Use urlFor for image
        "datePublished": new Date(post.publishedAt).toISOString(),
        "author": {
            "@type": "Person",
            "name": post.author || "The Nocturnist"
        }
      }
    })
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPageJsonLd) }}
      />
      <div className="space-y-10">
        <header className="pb-6 border-b border-border">
          <h1 className="text-4xl font-extrabold tracking-tight flex items-center text-foreground">
            <FileText className="mr-4 h-10 w-10 text-primary" />
            Blog
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Insights, articles, and musings from the custodians of the Nocturnal Codex. Now powered by Sanity.
          </p>
        </header>
        
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogPostCard key={post._id} post={post} /> 
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-10">No blog posts yet. Check back soon!</p>
        )}
      </div>
    </>
  );
}
