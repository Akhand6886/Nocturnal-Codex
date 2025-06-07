
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { FolderArchive } from "lucide-react";
import { client } from '@/lib/sanity';
import type { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: "All Categories | Nocturnal Codex",
  description: "Browse blog posts by category on Nocturnal Codex.",
};

async function getAllCategories(): Promise<string[]> {
  const query = `*[_type == "post" && defined(category)].category`;
  const categories = await client.fetch<string[]>(query);
  // Filter out null/undefined and remove duplicates
  return Array.from(new Set(categories.filter(Boolean))).sort((a, b) => a.localeCompare(b));
}

export default async function CategoriesPage() {
  const allCategories = await getAllCategories();

  return (
    <div className="space-y-10">
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
            <Link key={category} href={`/categories/${encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-'))}`}>
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
