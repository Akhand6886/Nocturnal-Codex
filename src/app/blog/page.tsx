
import { BlogPostCard } from "@/components/content/blog-post-card";
import { FileText } from "lucide-react";
import type { Metadata } from 'next';
import { fetchBlogPosts } from "@/lib/contentful";
import type { BlogPost } from "@/types";

import { draftMode } from 'next/headers'; 

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const defaultLogoUrl = `${siteUrl}/images/logo.png`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog | Nocturnal Codex",
    description: "Read the latest articles, insights, and musings from the custodians of the Nocturnal Codex.",
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

export default async function BlogPage() {
  const { isEnabled } = await draftMode();
  const posts: BlogPost[] = await fetchBlogPosts({ preview: isEnabled });

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
      const imageUrl = post.featuredImage?.url;
      return {
        "@type": "BlogPosting",
        "mainEntityOfPage": `${siteUrl}${post.url}`,
        "headline": post.title,
        "image": imageUrl,
        "datePublished": new Date(post.date).toISOString(),
        "author": {
            "@type": "Person",
            "name": post.author || "The Nocturnist"
        }
      }
    })
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPageJsonLd) }}
      />
      <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-8 border-b border-border">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-primary uppercase">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
            ARCHIVAL DISPATCHES // ESSAYS & ANALYSES
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.15]">
            Technical Dispatches
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            In-depth perspectives on systems architecture, compiler engineering, algorithm design, and computational philosophy.
          </p>
        </div>
      </header>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} /> 
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-border rounded-xl bg-card">
            <p className="text-xs font-mono text-muted-foreground">
              No dispatches currently published in the Contentful archive. Telemetry sync active.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
