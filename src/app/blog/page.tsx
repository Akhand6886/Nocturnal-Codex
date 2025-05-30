import { BlogPostCard } from "@/components/content/blog-post-card";
import { FileText } from "lucide-react";
import { getSortedPostsData } from '@/lib/blog';
import type { BlogPost } from '@/lib/data';

export default async function BlogPage() {
  const sortedPosts: BlogPost[] = getSortedPostsData();

  return (
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
  );
}

export const metadata = {
  title: "Blog | Nocturnal Codex",
  description: "Read the latest articles and insights from Nocturnal Codex.",
};
