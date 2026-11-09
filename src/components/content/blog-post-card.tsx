
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarDays, UserCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import type { BlogPost } from '@/types';

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const postSlug = post.slug;
  const imageUrl = post.featuredImage?.url || "/images/default-post-card.png";
  const imageAlt = post.featuredImage?.alt || post.title;
  const dataAiHint = post.featuredImage?.dataAiHint || "blog image";

  if (!postSlug) {
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
    <Link href={post.url} className="group block h-full">
        <Card className="flex h-full flex-col overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 ease-out bg-card hover:shadow-md rounded-xl">
            <div className="relative h-44 w-full overflow-hidden bg-muted">
                <Image
                src={imageUrl}
                alt={imageAlt}
                width={400}
                height={250}
                className="object-cover w-full h-full group-hover:scale-102 transition-all duration-300 ease-out"
                data-ai-hint={dataAiHint}
                />
            </div>
            <CardHeader className="p-5 pb-2">
                <CardTitle className="text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors duration-200">{post.title}</CardTitle>
                <div className="text-[11px] font-mono text-muted-foreground flex items-center space-x-3 pt-2">
                {post.author && (
                    <div className="flex items-center space-x-1">
                    <UserCircle className="h-3.5 w-3.5" />
                    <span>{post.author}</span>
                    </div>
                )}
                {post.date && (
                    <div className="flex items-center space-x-1">
                    <CalendarDays className="h-3.5 w-3.5" />
                    <span>{format(new Date(post.date), "MMM d, yyyy")}</span>
                    </div>
                )}
                </div>
            </CardHeader>
            <CardContent className="px-5 py-2 flex-grow">
                {post.shortDescription && <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{post.shortDescription}</p>}
                {post.tags && post.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted border border-border text-muted-foreground">{tag}</span>
                    ))}
                </div>
                )}
            </CardContent>
            <CardFooter className="px-5 pt-3 pb-4 border-t border-border/60 mt-auto">
                <div className="text-muted-foreground font-mono text-xs flex items-center group-hover:text-primary transition-colors duration-200">
                    Read article <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                </div>
            </CardFooter>
        </Card>
    </Link>
  );
}
