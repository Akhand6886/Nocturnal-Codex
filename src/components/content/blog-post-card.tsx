
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarDays, UserCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import type { BlogPost } from 'contentlayer/generated';

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const postSlug = post.slug;
  const imageUrl = post.imageUrl || "https://placehold.co/400x300.png";
  const imageAlt = post.title;
  const dataAiHint = post.dataAiHint || "blog image";

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
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-primary/30 border border-border/50 hover:border-primary/60 transition-all duration-300 ease-in-out bg-card group rounded-xl">
      <div className="relative h-52 w-full overflow-hidden rounded-t-xl">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          style={{objectFit: "cover"}}
          className="group-hover:scale-105 transition-transform duration-300 ease-in-out"
          data-ai-hint={dataAiHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/10 transition-colors duration-300"></div>
      </div>
      <CardHeader className="pt-5">
        <Link href={post.url} className="hover:text-primary transition-colors duration-200 ease-in-out">
          <CardTitle className="text-xl font-semibold leading-tight group-hover:text-primary">{post.title}</CardTitle>
        </Link>
        <div className="text-xs text-muted-foreground flex items-center space-x-4 pt-2">
          {post.author && (
            <div className="flex items-center space-x-1.5">
              <UserCircle className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
          )}
          {post.date && (
            <div className="flex items-center space-x-1.5">
              <CalendarDays className="h-4 w-4" />
              <span>{format(new Date(post.date), "MMMM d, yyyy")}</span>
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
          <Link href={post.url}>
            Read More <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
