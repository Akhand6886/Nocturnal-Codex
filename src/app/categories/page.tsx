
import { allBlogPosts } from "contentlayer/generated";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { FolderArchive } from "lucide-react"; // Using a different icon for categories

export const metadata = {
  title: "All Categories | Nocturnal Codex",
  description: "Browse blog posts by category on Nocturnal Codex.",
};

export default async function CategoriesPage() {
  const allCategories = Array.from(
    new Set(allBlogPosts.map((post) => post.category).filter(Boolean as any as (value: string | undefined) => value is string))
  ).sort((a, b) => a.localeCompare(b));

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
