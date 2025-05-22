
import type { ThinkTankArticle } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, CalendarDays, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {format} from 'date-fns';

interface ThinkTankArticleCardProps {
  article: ThinkTankArticle;
}

export function ThinkTankArticleCard({ article }: ThinkTankArticleCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-accent/30 border border-border/50 hover:border-accent/60 transition-all duration-300 ease-in-out bg-card group rounded-xl">
      {article.imageUrl && (
        <div className="relative h-60 w-full overflow-hidden rounded-t-xl">
          <Image
            src={article.imageUrl}
            alt={article.title}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-105 transition-transform duration-300 ease-in-out"
            data-ai-hint={article.dataAiHint || "research image"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/10 transition-colors duration-300"></div>
        </div>
      )}
      <CardHeader className="pt-5">
        <Link href={`/think-tank/${article.slug}`} className="hover:text-primary transition-colors duration-200 ease-in-out">
          <CardTitle className="text-xl font-semibold leading-tight group-hover:text-primary">{article.title}</CardTitle>
        </Link>
        <div className="text-xs text-muted-foreground pt-2 space-y-1.5">
          <div className="flex items-center space-x-1.5">
            <Users className="h-4 w-4" />
            <span>{article.authors.join(", ")}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <CalendarDays className="h-4 w-4" />
            <span>{format(new Date(article.date), "MMMM d, yyyy")}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow py-3">
        <CardDescription className="italic text-foreground/80">{article.abstract}</CardDescription>
        {article.tags && article.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            <Tag className="h-4 w-4 text-muted-foreground inline-block mr-0.5" />
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs font-medium">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="pb-5">
        <Button asChild variant="link" className="text-primary p-0 h-auto group-hover:underline group-hover:text-accent transition-all duration-200 ease-in-out font-medium">
          <Link href={`/think-tank/${article.slug}`}>
            Read Full Article <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
