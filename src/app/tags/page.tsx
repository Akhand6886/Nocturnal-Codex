
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Tag as TagIcon } from "lucide-react";
import type { Metadata } from 'next';
import { fetchBlogPosts } from "@/lib/contentful";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "All Tags | Nocturnal Codex",
  description: "Browse content by tags on Nocturnal Codex.",
};

async function getAllTags(): Promise<string[]> {
  const posts = await fetchBlogPosts();
  const tags = posts.flatMap(post => post.tags || []);
  const uniqueTags = Array.from(new Set(tags));
  return uniqueTags.filter(Boolean).sort((a, b) => a.localeCompare(b));
}

export default async function TagsPage() {
  const allTags = await getAllTags();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-8 border-b border-border">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-primary uppercase">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
            TAXONOMY INDEX // TAGS
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.15]">
            Topic Tags
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Granular indexing keywords spanning algorithms, architectures, theorems, and implementation frameworks.
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {allTags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Link key={tag} href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}>
                <span className="inline-block px-3 py-1 rounded text-xs font-mono bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors duration-200">
                  #{tag}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-border rounded-lg bg-card/50">
            <p className="text-xs font-mono text-muted-foreground">
              No index tags cataloged in the active dataset.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
