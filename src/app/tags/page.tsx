
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Tag as TagIcon } from "lucide-react";
import type { Metadata } from 'next';
import { allBlogPosts } from "contentlayer/generated";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "All Tags | Nocturnal Codex",
  description: "Browse content by tags on Nocturnal Codex.",
};

async function getAllTags(): Promise<string[]> {
  const tags = allBlogPosts.flatMap(post => post.tags || []);
  const uniqueTags = Array.from(new Set(tags));
  return uniqueTags.filter(Boolean).sort((a, b) => a.localeCompare(b));
}

export default async function TagsPage() {
  const allTags = await getAllTags();

  return (
    <div className="container mx-auto px-4 py-10 md:py-12 space-y-10">
      <header className="pb-6 border-b border-border">
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center text-foreground">
          <TagIcon className="mr-4 h-10 w-10 text-primary" />
          All Tags
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Explore blog posts by specific tags.
        </p>
      </header>

      {allTags.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {allTags.map((tag) => (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}>
              <Badge 
                variant="secondary" 
                className="text-sm px-4 py-2 hover:bg-primary/20 hover:text-primary transition-colors duration-200 cursor-pointer"
              >
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-10">No tags found.</p>
      )}
    </div>
  );
}
