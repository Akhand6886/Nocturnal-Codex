
import { BlogPostCard } from "@/components/content/blog-post-card";
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { FolderArchive } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';
import { fetchBlogPosts } from "@/lib/contentful";
import type { BlogPost } from "@/types";

export const revalidate = 60;

const slugifyCategory = (categoryName: string) => encodeURIComponent(categoryName.toLowerCase().replace(/\s+/g, '-'));
const deslugifyCategory = (slug: string) => {
  const name = decodeURIComponent(slug).replace(/-/g, ' ');
  return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export async function generateStaticParams() {
  const posts = await fetchBlogPosts();
  const categories = posts.map(post => post.category);
  const uniqueCategories = Array.from(new Set(categories.filter(Boolean)));
  
  return uniqueCategories.map((category) => ({
    categorySlug: slugifyCategory(category),
  }));
}

// Corrected interface - params is a plain object
interface CategoryPageProps {
  params: { categorySlug: string };
}

// generateMetadata - no await on params
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = params;
  const originalCategoryName = deslugifyCategory(categorySlug);
  return {
    title: `Posts in category "${originalCategoryName}" | Nocturnal Codex`,
    description: `Find all blog posts in the category "${originalCategoryName}" on Nocturnal Codex.`,
  };
}

async function getPostsByCategory(categorySlug: string): Promise<{ posts: BlogPost[], actualCategoryName: string }> {
  const allPosts = await fetchBlogPosts();
  let actualCategoryName = '';
  
  const posts = allPosts.filter(post => {
      const postCategorySlug = slugifyCategory(post.category);
      if (postCategorySlug === categorySlug) {
          actualCategoryName = post.category;
          return true;
      }
      return false;
  });

  if (!actualCategoryName) {
      actualCategoryName = deslugifyCategory(categorySlug);
  }
  
  return { posts, actualCategoryName };
}

// Page component - no await on params
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = params;
  const { posts: postsInCategory, actualCategoryName } = await getPostsByCategory(categorySlug);

  if (postsInCategory.length === 0) {
    notFound();
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
    { label: actualCategoryName },
  ];

  return (
    <div className="container mx-auto px-4 py-10 md:py-12 space-y-10">
      <Breadcrumbs items={breadcrumbItems} />
      <header className="pb-6 border-b border-border">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center text-foreground">
          <FolderArchive className="mr-3 h-8 w-8 text-primary flex-shrink-0" />
          Posts in category: {actualCategoryName}
        </h1>
      </header>

      {postsInCategory.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {postsInCategory.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-10">
          No blog posts found in the category "{actualCategoryName}".
        </p>
      )}
    </div>
  );
}
