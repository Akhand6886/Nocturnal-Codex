
import { allBlogPosts } from "contentlayer/generated";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";

export const metadata = {
  title: "All Tags | Nocturnal Codex",
  description: "Browse content by tags on Nocturnal Codex.",
};

export default async function TagsPage() {
  const allTags = Array.from(
    new Set(allBlogPosts.flatMap((post) => post.tags || []))
  ).sort((a, b) => a.localeCompare(b));

  return (
    <div className="space-y-10">
      <header className="pb-6 border-b border-border">
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center text-foreground">
          <Tag className="mr-4 h-10 w-10 text-primary" />
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
