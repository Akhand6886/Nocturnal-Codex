import { MOCK_BLOG_POSTS } from "@/lib/data";
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { MarkdownRenderer } from "@/components/content/markdown-renderer";
import Image from "next/image";
import { CalendarDays, UserCircle, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {format} from 'date-fns';
import Link from "next/link";

export async function generateStaticParams() {
  return MOCK_BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = MOCK_BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold">Post Not Found</h1>
        <p className="text-muted-foreground">The requested blog post could not be found.</p>
         <Link href="/blog" className="text-primary hover:underline mt-4 inline-block">
          Back to Blog
        </Link>
      </div>
    );
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title },
  ];

  return (
    <article className="max-w-3xl mx-auto py-8 space-y-8">
      <Breadcrumbs items={breadcrumbItems} />
      
      <header className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1.5">
            <UserCircle className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <CalendarDays className="h-4 w-4" />
            <span>{format(new Date(post.date), "MMMM d, yyyy")}</span>
          </div>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>
        )}
      </header>

      {post.imageUrl && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg my-8">
          <Image 
            src={post.imageUrl} 
            alt={post.title} 
            layout="fill" 
            objectFit="cover" 
            priority 
            data-ai-hint={post.dataAiHint || "blog header"}
          />
        </div>
      )}

      <div className="prose dark:prose-invert max-w-none">
         <MarkdownRenderer content={post.content} />
      </div>
    </article>
  );
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = MOCK_BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) {
    return { title: "Post Not Found | Nocturnal Codex" };
  }
  return {
    title: `${post.title} | Nocturnal Codex`,
    description: post.excerpt,
  };
}
