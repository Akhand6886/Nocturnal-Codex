
import { allBlogPosts, type BlogPost } from "contentlayer/generated";
import { BlogPostCard } from "@/components/content/blog-post-card";
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { Tag } from "lucide-react";
import { notFound } from "next/navigation";
import { compareDesc } from "date-fns";

export const revalidate = 60;

export async function generateStaticParams() {
  const tags = new Set(allBlogPosts.flatMap((post) => post.tags || []));
  return Array.from(tags).map((tag) => ({
    tagSlug: encodeURIComponent(tag.toLowerCase()),
  }));
}

interface TagPageProps {
  params: { tagSlug: string };
}

export async function generateMetadata({ params }: TagPageProps) {
  const tagName = decodeURIComponent(params.tagSlug);
  const capitalizedTagName = tagName.charAt(0).toUpperCase() + tagName.slice(1);
  return {
    title: `Posts tagged "${capitalizedTagName}" | Nocturnal Codex`,
    description: `Find all blog posts tagged with "${capitalizedTagName}" on Nocturnal Codex.`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const tagName = decodeURIComponent(params.tagSlug);
  
  const postsWithTag = allBlogPosts
    .filter((post) =>
      post.tags?.map(t => t.toLowerCase()).includes(tagName.toLowerCase())
    )
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  if (postsWithTag.length === 0) {
    // Optionally, you could redirect to /tags or show a "no posts found" message
    // For now, let's assume if a tag page is generated, it should have posts,
    // but this check is good for robustness if generateStaticParams isn't exhaustive or tags change.
    // notFound(); 
  }
  
  const capitalizedTagName = tagName.charAt(0).toUpperCase() + tagName.slice(1);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Tags", href: "/tags" },
    { label: capitalizedTagName },
  ];

  return (
    <div className="space-y-10">
      <Breadcrumbs items={breadcrumbItems} />
      <header className="pb-6 border-b border-border">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center text-foreground">
          <Tag className="mr-3 h-8 w-8 text-primary flex-shrink-0" />
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
