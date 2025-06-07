
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarDays, UserCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import type { SanityPost } from '@/lib/sanity'; // Import the SanityPost type
import { urlFor } from '@/lib/sanity'; // Import urlFor for Sanity images

interface BlogPostCardProps {
  post: Pick<SanityPost, 'slug' | 'title' | 'publishedAt' | 'author' | 'excerpt' | 'tags' | 'mainImage'> & { _id: string };
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const postSlug = post.slug?.current;
  const imageUrl = post.mainImage ? urlFor(post.mainImage)?.width(400).height(300).auto('format').url() : "https://placehold.co/400x300.png";
  const imageAlt = post.mainImage?.alt || post.title || "Blog post image";
  const dataAiHint = post.mainImage?.dataAiHint || "blog image";

  if (!postSlug) {
    // Handle cases where slug might be undefined, though it should be required by schema
    return (
      <Card className="flex flex-col overflow-hidden shadow-lg bg-card group rounded-xl border border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive-foreground">Error: Post slug missing</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>This blog post cannot be displayed due to missing information.</CardDescription>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-primary/30 border border-border/50 hover:border-primary/60 transition-all duration-300 ease-in-out bg-card group rounded-xl">
      <div className="relative h-52 w-full overflow-hidden rounded-t-xl">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          style={{objectFit: "cover"}}
          className="group-hover:scale-105 transition-transform duration-300 ease-in-out"
          data-ai-hint={dataAiHint}
          placeholder={post.mainImage ? urlFor(post.mainImage)?.width(20).blur(5).url() : undefined}
          blurDataURL={post.mainImage ? urlFor(post.mainImage)?.width(20).blur(5).url() : undefined}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/10 transition-colors duration-300"></div>
      </div>
      <CardHeader className="pt-5">
        <Link href={`/blog/${postSlug}`} className="hover:text-primary transition-colors duration-200 ease-in-out">
          <CardTitle className="text-xl font-semibold leading-tight group-hover:text-primary">{post.title}</CardTitle>
        </Link>
        <div className="text-xs text-muted-foreground flex items-center space-x-4 pt-2">
          {post.author && (
            <div className="flex items-center space-x-1.5">
              <UserCircle className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
          )}
          {post.publishedAt && (
            <div className="flex items-center space-x-1.5">
              <CalendarDays className="h-4 w-4" />
              <span>{format(new Date(post.publishedAt), "MMMM d, yyyy")}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow py-3">
        {post.excerpt && <CardDescription className="text-foreground/80">{post.excerpt}</CardDescription>}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs font-medium">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="pb-5">
        <Button asChild variant="link" className="text-primary p-0 h-auto group-hover:underline group-hover:text-accent transition-all duration-200 ease-in-out font-medium">
          <Link href={`/blog/${postSlug}`}>
            Read More <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
