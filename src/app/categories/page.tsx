
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
    <div className="min-h-screen bg-background text-foreground">
      <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-8 border-b border-[#272727]">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-[#E5A93C] uppercase">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E5A93C]" />
            TAXONOMY INDEX // CATEGORIES
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.15]">
            Topic Classifications
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Curated categories organizing articles, mathematical models, and technical dispatches across the repository.
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {allCategories.length > 0 ? (
          <div className="flex flex-wrap gap-2.5">
            {allCategories.map((category) => (
              <Link key={category} href={`/categories/${slugifyCategory(category)}`}>
                <span className="inline-block px-3.5 py-1.5 rounded-md text-xs font-mono bg-[#181818] border border-[#272727] text-foreground hover:border-[#383838] hover:text-[#E5A93C] transition-colors duration-200">
                  {category}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-[#272727] rounded-lg bg-[#181818]">
            <p className="text-xs font-mono text-muted-foreground">
              No categories cataloged in the active dataset.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
