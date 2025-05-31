
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarDays, UserCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {format} from 'date-fns';
import type { BlogPost as ContentLayerBlogPost } from 'contentlayer/generated';

// Use a type that is compatible with ContentLayer's BlogPost but allows for flexibility if some fields are optional in your data
// This is an adapter type. Ideally, your actual data passed to this component should fully match ContentLayerBlogPost.
interface BlogPostCardProps {
  post: Pick<ContentLayerBlogPost, 'slug' | 'title' | 'date' | 'author' | 'excerpt' | 'tags' | 'imageUrl' | 'dataAiHint'>;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-primary/30 border border-border/50 hover:border-primary/60 transition-all duration-300 ease-in-out bg-card group rounded-xl">
      {post.imageUrl && (
        <div className="relative h-52 w-full overflow-hidden rounded-t-xl">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill // layout="fill" is deprecated, use fill
            style={{objectFit: "cover"}} // objectFit becomes a style property
            className="group-hover:scale-105 transition-transform duration-300 ease-in-out"
            data-ai-hint={post.dataAiHint || "blog image"}
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/10 transition-colors duration-300"></div>
        </div>
      )}
      <CardHeader className="pt-5">
        <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors duration-200 ease-in-out">
          <CardTitle className="text-xl font-semibold leading-tight group-hover:text-primary">{post.title}</CardTitle>
        </Link>
        <div className="text-xs text-muted-foreground flex items-center space-x-4 pt-2">
          <div className="flex items-center space-x-1.5">
            <UserCircle className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <CalendarDays className="h-4 w-4" />
            <span>{format(new Date(post.date), "MMMM d, yyyy")}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow py-3">
        <CardDescription className="text-foreground/80">{post.excerpt}</CardDescription>
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
          <Link href={`/blog/${post.slug}`}>
            Read More <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
