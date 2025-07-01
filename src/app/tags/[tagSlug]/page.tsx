
import { BlogPostCard } from "@/components/content/blog-post-card";
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { Tag as TagIcon } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';
import { fetchBlogPosts } from "@/lib/contentful";
import type { BlogPost } from "@/types";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await fetchBlogPosts();
  const tags = posts.flatMap(post => post.tags || []);
  const uniqueTags = Array.from(new Set(tags.filter(Boolean)));
  
  return uniqueTags.map((tag) => ({
    tagSlug: encodeURIComponent(tag.toLowerCase()),
  }));
}

interface TagPageProps {
  params: { tagSlug: string };
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tagName = decodeURIComponent(params.tagSlug);
  const capitalizedTagName = tagName.charAt(0).toUpperCase() + tagName.slice(1);
  return {
    title: `Posts tagged "${capitalizedTagName}" | Nocturnal Codex`,
    description: `Find all blog posts tagged with "${capitalizedTagName}" on Nocturnal Codex.`,
  };
}

async function getPostsByTag(tagSlug: string): Promise<BlogPost[]> {
  const tagName = decodeURIComponent(tagSlug);
  const allPosts = await fetchBlogPosts();
  const posts = allPosts.filter(post => 
    post.tags?.some(tag => tag.toLowerCase() === tagName.toLowerCase())
  );
  return posts;
}

export default async function TagPage({ params }: TagPageProps) {
  const { tagSlug } = params;
  const postsWithTag = await getPostsByTag(tagSlug);
  const tagName = decodeURIComponent(tagSlug);
  const capitalizedTagName = tagName.charAt(0).toUpperCase() + tagName.slice(1);

  if (postsWithTag.length === 0) {
    notFound();
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Tags", href: "/tags" },
    { label: capitalizedTagName },
  ];

  return (
    <div className="container mx-auto px-4 py-10 md:py-12 space-y-10">
      <Breadcrumbs items={breadcrumbItems} />
      <header className="pb-6 border-b border-border">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center text-foreground">
          <TagIcon className="mr-3 h-8 w-8 text-primary flex-shrink-0" />
          Posts tagged with: {capitalizedTagName}
        </h1>
      </header>

      {postsWithTag.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {postsWithTag.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-10">
          No blog posts found for the tag "{capitalizedTagName}".
        </p>
      )}
    </div>
  );
}
