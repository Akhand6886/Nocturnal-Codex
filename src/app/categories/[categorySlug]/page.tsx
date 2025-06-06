
import { allBlogPosts } from "contentlayer/generated";
import { BlogPostCard } from "@/components/content/blog-post-card";
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { FolderArchive } from "lucide-react";
import { notFound } from "next/navigation";
import { compareDesc } from "date-fns";

export const revalidate = 60;

export async function generateStaticParams() {
  const categories = new Set(allBlogPosts.map((post) => post.category).filter(Boolean as any as (value: string | undefined) => value is string));
  return Array.from(categories).map((category) => ({
    categorySlug: encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-')),
  }));
}

interface CategoryPageProps {
  params: { categorySlug: string };
}

export async function generateMetadata({ params }: CategoryPageProps) {
  // Find the original category name from any post that matches the slug
  // This is to ensure correct capitalization in metadata
  const categoryNameFromSlug = decodeURIComponent(params.categorySlug).replace(/-/g, ' ');
  const postWithCategory = allBlogPosts.find(post => post.category?.toLowerCase().replace(/\s+/g, '-') === params.categorySlug);
  const actualCategoryName = postWithCategory?.category || categoryNameFromSlug.charAt(0).toUpperCase() + categoryNameFromSlug.slice(1);
  
  return {
    title: `Posts in category "${actualCategoryName}" | Nocturnal Codex`,
    description: `Find all blog posts in the category "${actualCategoryName}" on Nocturnal Codex.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categorySlug = params.categorySlug;
  
  const postsInCategory = allBlogPosts
    .filter((post) =>
      post.category?.toLowerCase().replace(/\s+/g, '-') === categorySlug
    )
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  if (postsInCategory.length === 0 && !allBlogPosts.some(p => p.category?.toLowerCase().replace(/\s+/g, '-') === categorySlug)) {
    // Only call notFound if the category slug itself doesn't correspond to any known category
     notFound();
  }
  
  // For display, try to get the original capitalization
  const originalCategoryName = postsInCategory[0]?.category || decodeURIComponent(categorySlug).replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');


  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
    { label: originalCategoryName },
  ];

  return (
    <div className="space-y-10">
      <Breadcrumbs items={breadcrumbItems} />
      <header className="pb-6 border-b border-border">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center text-foreground">
          <FolderArchive className="mr-3 h-8 w-8 text-primary flex-shrink-0" />
          Posts in category: {originalCategoryName}
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
          No blog posts found in the category "{originalCategoryName}".
        </p>
      )}
    </div>
  );
}
