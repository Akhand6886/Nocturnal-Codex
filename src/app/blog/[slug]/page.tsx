
import { MOCK_BLOG_POSTS, MOCK_THINK_TANK_ARTICLES } from "@/lib/data";
import type { BlogPost, ThinkTankArticle } from "@/lib/data";
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { MarkdownRenderer } from "@/components/content/markdown-renderer";
import Image from "next/image";
import { CalendarDays, UserCircle, Tag, Link as LinkIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {format} from 'date-fns';
import Link from "next/link";
import { RelatedArticleCard, type RelatedArticle } from '@/components/content/related-article-card';
import { Separator } from "@/components/ui/separator";

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

  const relatedArticles: RelatedArticle[] = [];
  if (post.tags && post.tags.length > 0) {
    // Find related blog posts
    MOCK_BLOG_POSTS.forEach(otherPost => {
      if (otherPost.id !== post.id && otherPost.tags.some(tag => post.tags.includes(tag))) {
        if (relatedArticles.length < 3 && !relatedArticles.find(ra => ra.slug === otherPost.slug && ra.type === 'blog')) {
          relatedArticles.push({ title: otherPost.title, slug: otherPost.slug, type: 'blog', excerpt: otherPost.excerpt });
        }
      }
    });
    // Find related think tank articles
    MOCK_THINK_TANK_ARTICLES.forEach(otherArticle => {
       if (otherArticle.tags && otherArticle.tags.some(tag => post.tags.includes(tag))) {
        if (relatedArticles.length < 5 && !relatedArticles.find(ra => ra.slug === otherArticle.slug && ra.type === 'think-tank')) {
           relatedArticles.push({ title: otherArticle.title, slug: otherArticle.slug, type: 'think-tank', excerpt: otherArticle.abstract });
        }
      }
    });
  }


  return (
    <div className="max-w-3xl mx-auto py-8">
      <article className="space-y-8">
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

      {relatedArticles.length > 0 && (
        <section className="mt-16 pt-8 border-t border-border">
          <h2 className="text-2xl font-semibold mb-6 text-foreground flex items-center">
            <LinkIcon className="h-6 w-6 mr-3 text-primary" />
            Related Content
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedArticles.slice(0,4).map(article => ( // Limit to 4 related articles
              <RelatedArticleCard key={`${article.type}-${article.slug}`} article={article} />
            ))}
          </div>
        </section>
      )}
    </div>
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
