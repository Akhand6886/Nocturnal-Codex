
import { BlogPostCard } from "@/components/content/blog-post-card";
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { Tag } from "lucide-react";
import { notFound } from "next/navigation";
import { compareDesc } from "date-fns";
import { client, type SanityPost } from '@/lib/sanity';
import type { Metadata } from 'next';

export const revalidate = 60;

async function getAllTags(): Promise<string[]> {
  const query = `*[_type == "post" && defined(tags)].tags[]`;
  const tags = await client.fetch<string[]>(query);
  return Array.from(new Set(tags.filter(Boolean)));
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({
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

async function getPostsByTag(tagSlug: string): Promise<SanityPost[]> {
  const tagName = decodeURIComponent(tagSlug.toLowerCase());
  // Query for posts where the tagSlug is in the post's tags array (case-insensitive for matching)
  const query = `*[_type == "post" && $tagName in tags[]] | order(publishedAt desc) {
    _id, title, slug, publishedAt, author, excerpt, mainImage{asset, alt, dataAiHint}, tags, category
  }`;
  // Sanity array matching is case-sensitive by default. To make it less sensitive,
  // we might need to fetch all tags and then filter, or rely on consistent tagging.
  // For simplicity here, assuming tags are stored consistently or we match on lowercase.
  // A more robust Sanity query for case-insensitive tag matching can be complex.
  // We'll rely on the client-side getAllTags for the exact name for display.
  
  // Fetch all posts and filter client-side for accurate case-insensitive matching (less efficient for large datasets)
  // or ensure tags are stored consistently (e.g., all lowercase).
  // For this example, let's assume tags are matched based on the query's direct string comparison.
  // If a truly case-insensitive query is needed, it would involve GROQ functions like lower() if available for array elements.
  
  // Let's refine the query for better matching, assuming tags are stored in a consistent case or we want to match the exact tag.
  // The best approach is to query for the tag as it's likely stored.
  const allTags = await getAllTags();
  const matchedTag = allTags.find(t => t.toLowerCase() === tagName);

  if (!matchedTag) return []; // If the exact tag (case-insensitive) doesn't exist in our system.

  return client.fetch<SanityPost[]>(query, { tagName: matchedTag });
}


export default async function TagPage({ params }: TagPageProps) {
  const tagSlug = params.tagSlug;
  const postsWithTag = await getPostsByTag(tagSlug);
  
  const tagName = decodeURIComponent(params.tagSlug);
  const capitalizedTagName = tagName.charAt(0).toUpperCase() + tagName.slice(1);

  const allKnownTags = await getAllTags();
  const tagExists = allKnownTags.some(t => t.toLowerCase() === tagName.toLowerCase());

  if (!tagExists && postsWithTag.length === 0) {
    notFound();
  }

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
            <BlogPostCard key={post._id} post={post} />
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
