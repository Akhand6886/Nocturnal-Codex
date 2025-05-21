
import type { BlogPost } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarDays, UserCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {format} from 'date-fns';

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-accent/25 border border-transparent hover:border-accent/50 transition-all duration-300 ease-in-out bg-card group">
      {post.imageUrl && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={post.imageUrl}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-105 transition-transform duration-300 ease-in-out"
            data-ai-hint={post.dataAiHint || "blog image"}
          />
        </div>
      )}
      <CardHeader>
        <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors duration-200 ease-in-out">
          <CardTitle className="text-xl font-semibold leading-tight">{post.title}</CardTitle>
        </Link>
        <div className="text-xs text-muted-foreground flex items-center space-x-4 mt-2">
          <div className="flex items-center space-x-1">
            <UserCircle className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <CalendarDays className="h-4 w-4" />
            <span>{format(new Date(post.date), "MMMM d, yyyy")}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{post.excerpt}</CardDescription>
        {post.tags && post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild variant="link" className="text-primary p-0 h-auto group-hover:text-accent transition-colors duration-200 ease-in-out">
          <Link href={`/blog/${post.slug}`}>
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
