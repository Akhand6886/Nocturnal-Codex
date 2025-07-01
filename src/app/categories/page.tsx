
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { FolderArchive } from "lucide-react";
import type { Metadata } from 'next';
import { fetchBlogPosts } from "@/lib/contentful";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "All Categories | Nocturnal Codex",
  description: "Browse blog posts by category on Nocturnal Codex.",
};

const slugifyCategory = (categoryName: string) => encodeURIComponent(categoryName.toLowerCase().replace(/\s+/g, '-'));

async function getAllCategories(): Promise<string[]> {
  const posts = await fetchBlogPosts();
  const categories = posts.map(post => post.category);
  const uniqueCategories = Array.from(new Set(categories));
  return uniqueCategories.filter(Boolean).sort((a, b) => a.localeCompare(b));
}

export default async function CategoriesPage() {
  const allCategories = await getAllCategories();

  return (
    <div className="container mx-auto px-4 py-10 md:py-12 space-y-10">
      <header className="pb-6 border-b border-border">
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center text-foreground">
          <FolderArchive className="mr-4 h-10 w-10 text-primary" />
          All Categories
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Explore blog posts by specific categories.
        </p>
      </header>

      {allCategories.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {allCategories.map((category) => (
            <Link key={category} href={`/categories/${slugifyCategory(category)}`}>
              <Badge 
                variant="secondary" 
                className="text-sm px-4 py-2 hover:bg-primary/20 hover:text-primary transition-colors duration-200 cursor-pointer"
              >
                {category}
              </Badge>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-10">No categories found.</p>
      )}
    </div>
  );
}
