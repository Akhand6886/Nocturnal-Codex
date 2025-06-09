
import { client, type SanityPost } from "@/lib/sanity";
import { BlogPostCard } from "@/components/content/blog-post-card";
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { Tag as TagIcon } from "lucide-react"; // Renamed to avoid conflict with HTML tag
import { notFound } from "next/navigation";
import { compareDesc } from "date-fns"; // For sorting, though Sanity query can also sort
import type { Metadata } from 'next';

export const revalidate = 60;

export async function generateStaticParams() {
  const query = `array::unique(*[_type == "post" && defined(tags) && count(tags) > 0].tags[])`;
  const tags = await client.fetch<string[]>(query);
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

async function getPostsByTag(tagSlug: string): Promise<SanityPost[]> {
  const tagName = decodeURIComponent(tagSlug);
  // Sanity array matching is case-sensitive. We store tags as they are entered.
  // To make this robust, we might need to query for various casings or normalize tags on input.
  // For now, we assume the slug matches the case-sensitive tag or a lowercase version.
  const postsQuery = `*[_type == "post" && ($tagName in tags || $lowercaseTagName in tags)] | order(publishedAt desc) {
    _id, title, slug, publishedAt, author, excerpt, mainImage{asset, alt, dataAiHint}, tags, category
  }`;
  const posts = await client.fetch<SanityPost[]>(postsQuery, { tagName: tagName, lowercaseTagName: tagName.toLowerCase() });
  return posts;
}

export default async function TagPage({ params }: TagPageProps) {
  const { tagSlug } = params;
  const postsWithTag = await getPostsByTag(tagSlug);
  const tagName = decodeURIComponent(tagSlug);
  const capitalizedTagName = tagName.charAt(0).toUpperCase() + tagName.slice(1);

  // Consider if a tag page should 404 if no posts are found or if the tag is not in a global list
  // For now, if postsWithTag is empty, it will show a message.

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
          <TagIcon className="mr-3 h-8 w-8 text-primary flex-shrink-0" />
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
