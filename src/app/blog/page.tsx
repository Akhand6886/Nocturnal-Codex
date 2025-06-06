
import { BlogPostCard } from "@/components/content/blog-post-card";
import { FileText } from "lucide-react";
import { allBlogPosts, type BlogPost } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import type { Metadata } from 'next';

export const revalidate = 60; // Revalidate every 60 seconds

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: "Blog",
  description: "Read the latest articles, insights, and musings from the custodians of the Nocturnal Codex.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Nocturnal Codex",
    description: "Read the latest articles and insights from Nocturnal Codex.",
    url: `${siteUrl}/blog`,
    type: 'website', // or 'blog' if it's primarily a blog listing
  },
};

export default async function BlogPage() {
  const sortedPosts = allBlogPosts.sort((a, b) => 
    compareDesc(new Date(a.date), new Date(b.date))
  );

  const blogPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog", // Or CollectionPage if more appropriate
    "name": "Nocturnal Codex Blog",
    "description": "Insights, articles, and musings from the custodians of the Nocturnal Codex.",
    "url": `${siteUrl}/blog`,
    "publisher": {
        "@type": "Organization",
        "name": "Nocturnal Codex",
        "logo": {
            "@type": "ImageObject",
            "url": `${siteUrl}/images/logo.png` // Replace with your actual logo URL
        }
    },
    "blogPost": sortedPosts.map(post => ({
        "@type": "BlogPosting",
        "mainEntityOfPage": `${siteUrl}/blog/${post.slug}`,
        "headline": post.title,
        "image": post.imageUrl ? `${siteUrl}${post.imageUrl}` : undefined,
        "datePublished": new Date(post.date).toISOString(),
        "author": {
            "@type": "Person",
            "name": post.author
        }
    }))
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
            Insights, articles, and musings from the custodians of the Nocturnal Codex.
          </p>
        </header>
        
        {sortedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} /> 
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-10">No blog posts yet. Check back soon!</p>
        )}
      </div>
    </>
  );
}
