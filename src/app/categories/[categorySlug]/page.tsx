
import { client, type SanityPost } from "@/lib/sanity";
import { BlogPostCard } from "@/components/content/blog-post-card";
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { FolderArchive } from "lucide-react";
import { notFound } from "next/navigation";
import { compareDesc } from "date-fns"; // For sorting, though Sanity query can also sort
import type { Metadata } from 'next';

export const revalidate = 60;

// Function to slugify category names consistently
const slugifyCategory = (categoryName: string) => encodeURIComponent(categoryName.toLowerCase().replace(/\s+/g, '-'));

// Function to de-slugify category names for display (simple version)
const deslugifyCategory = (slug: string) => {
  const name = decodeURIComponent(slug).replace(/-/g, ' ');
  return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export async function generateStaticParams() {
  const query = `*[_type == "post" && defined(category)].category`;
  const categories = await client.fetch<string[]>(query);
  const uniqueCategories = Array.from(new Set(categories.filter(Boolean)));
  
  return uniqueCategories.map((category) => ({
    categorySlug: slugifyCategory(category),
  }));
}

interface CategoryPageProps {
  params: { categorySlug: string };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const originalCategoryName = deslugifyCategory(params.categorySlug);
  // Fetch one post to confirm the category exists and get its original casing, if needed for precision.
  // Or, we can rely on deslugifyCategory for a generally good display name.
  
  return {
    title: `Posts in category "${originalCategoryName}" | Nocturnal Codex`,
    description: `Find all blog posts in the category "${originalCategoryName}" on Nocturnal Codex.`,
  };
}

async function getPostsByCategory(categorySlug: string): Promise<{ posts: SanityPost[], actualCategoryName: string }> {
  // Attempt to find the original category name by matching the slug
  const allCategoriesQuery = `array::unique(*[_type == "post" && defined(category)].category)`;
  const allCategories = await client.fetch<string[]>(allCategoriesQuery);
  
  let actualCategoryName = deslugifyCategory(categorySlug); // Default if no exact match found
  let foundCategoryForQuery = actualCategoryName; // Use this for the query

  for (const cat of allCategories) {
    if (slugifyCategory(cat) === categorySlug) {
      actualCategoryName = cat; // Use original casing
      foundCategoryForQuery = cat; // Use original casing for exact match in query
      break;
    }
  }

  const postsQuery = `*[_type == "post" && category == $category] | order(publishedAt desc) {
    _id, title, slug, publishedAt, author, excerpt, mainImage{asset, alt, dataAiHint}, tags, category
  }`;
  const posts = await client.fetch<SanityPost[]>(postsQuery, { category: foundCategoryForQuery });
  
  return { posts, actualCategoryName };
}


export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = params;
  const { posts: postsInCategory, actualCategoryName } = await getPostsByCategory(categorySlug);

  if (postsInCategory.length === 0) {
    // Check if the category itself is valid even if it has no posts currently
    const allCategoriesQuery = `array::unique(*[_type == "post" && defined(category)].category)`;
    const allSanityCategories = await client.fetch<string[]>(allCategoriesQuery);
    const isValidCategory = allSanityCategories.some(cat => slugifyCategory(cat) === categorySlug);
    if (!isValidCategory) {
        notFound();
    }
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
    { label: actualCategoryName },
  ];

  return (
    <div className="space-y-10">
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
            <BlogPostCard key={post._id} post={post} />
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
