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
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300 bg-card">
      {article.imageUrl && (
        <div className="relative h-56 w-full">
          <Image
            src={article.imageUrl}
            alt={article.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={article.dataAiHint || "research image"}
          />
        </div>
      )}
      <CardHeader>
        <Link href={`/think-tank/${article.slug}`} className="hover:text-primary transition-colors">
          <CardTitle className="text-xl font-semibold leading-tight">{article.title}</CardTitle>
        </Link>
        <div className="text-xs text-muted-foreground mt-2 space-y-1">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{article.authors.join(", ")}</span>
          </div>
          <div className="flex items-center space-x-1">
            <CalendarDays className="h-4 w-4" />
            <span>{format(new Date(article.date), "MMMM d, yyyy")}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="italic">{article.abstract}</CardDescription>
        {article.tags && article.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            <Tag className="h-4 w-4 text-muted-foreground inline-block mr-1" />
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild variant="link" className="text-primary p-0 h-auto">
          <Link href={`/think-tank/${article.slug}`}>
            Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
