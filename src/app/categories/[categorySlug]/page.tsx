
import { BlogPostCard } from "@/components/content/blog-post-card";
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { FolderArchive } from "lucide-react";
import { notFound } from "next/navigation";
import { compareDesc } from "date-fns";
import { client, type SanityPost } from '@/lib/sanity';
import type { Metadata } from 'next';

export const revalidate = 60;

async function getAllCategories(): Promise<string[]> {
  const query = `*[_type == "post" && defined(category)].category`;
  const categories = await client.fetch<string[]>(query);
  return Array.from(new Set(categories.filter(Boolean)));
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({
    categorySlug: encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-')),
  }));
}

interface CategoryPageProps {
  params: { categorySlug: string };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categories = await getAllCategories();
  const categoryNameFromSlug = decodeURIComponent(params.categorySlug).replace(/-/g, ' ');
  
  const actualCategoryName = categories.find(c => c.toLowerCase().replace(/\s+/g, '-') === params.categorySlug) 
    || categoryNameFromSlug.charAt(0).toUpperCase() + categoryNameFromSlug.slice(1);
  
  return {
    title: `Posts in category "${actualCategoryName}" | Nocturnal Codex`,
    description: `Find all blog posts in the category "${actualCategoryName}" on Nocturnal Codex.`,
  };
}

async function getPostsByCategory(categorySlug: string): Promise<SanityPost[]> {
  const categories = await getAllCategories();
  const targetCategory = categories.find(c => c.toLowerCase().replace(/\s+/g, '-') === categorySlug);

  if (!targetCategory) {
    return [];
  }

  const query = `*[_type == "post" && category == $category] | order(publishedAt desc) {
    _id, title, slug, publishedAt, author, excerpt, mainImage{asset, alt, dataAiHint}, tags, category
  }`;
  return client.fetch<SanityPost[]>(query, { category: targetCategory });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categorySlug = params.categorySlug;
  
  const postsInCategory = await getPostsByCategory(categorySlug);

  const allKnownCategories = await getAllCategories();
  const categoryExists = allKnownCategories.some(c => c.toLowerCase().replace(/\s+/g, '-') === categorySlug);

  if (!categoryExists && postsInCategory.length === 0) {
     notFound();
  }
  
  const originalCategoryName = postsInCategory[0]?.category 
    || allKnownCategories.find(c => c.toLowerCase().replace(/\s+/g, '-') === categorySlug)
    || decodeURIComponent(categorySlug).replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');


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
            <BlogPostCard key={post._id} post={post} />
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
