
import type { ThinkTankArticle } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, CalendarDays, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {format} from 'date-fns';
import { richTextToPlainText } from "@/lib/utils";

interface ThinkTankArticleCardProps {
  article: ThinkTankArticle;
}

export function ThinkTankArticleCard({ article }: ThinkTankArticleCardProps) {
  const imageUrl = article.featuredImage?.url || "/images/default-post-card.png";
  const imageAlt = article.featuredImage?.alt || article.title;
  const dataAiHint = article.featuredImage?.dataAiHint || "research image";
  
  return (
    <Link href={article.url} className="group block h-full">
        <Card className="flex h-full flex-col overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 ease-out bg-card hover:shadow-md rounded-xl">
        {imageUrl && (
            <div className="relative h-44 w-full overflow-hidden bg-muted">
            <Image
                src={imageUrl}
                alt={imageAlt}
                width={800}
                height={450}
                className="object-cover w-full h-full group-hover:scale-102 transition-all duration-300 ease-out"
                data-ai-hint={dataAiHint}
            />
            </div>
        )}
        <CardHeader className="p-5 pb-2">
            <CardTitle className="text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors duration-200">{article.title}</CardTitle>
            <div className="text-[11px] font-mono text-muted-foreground pt-2 flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-1">
                <Users className="h-3.5 w-3.5" />
                <span>{article.authors.join(", ")}</span>
            </div>
            <div className="flex items-center space-x-1">
                <CalendarDays className="h-3.5 w-3.5" />
                <span>{format(new Date(article.date), "MMM d, yyyy")}</span>
            </div>
            </div>
        </CardHeader>
        <CardContent className="px-5 py-2 flex-grow">
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{richTextToPlainText(article.abstract)}</p>
            {article.tags && article.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
                {article.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted border border-border text-muted-foreground">{tag}</span>
                ))}
            </div>
            )}
        </CardContent>
        <CardFooter className="px-5 pt-3 pb-4 border-t border-border/60 mt-auto">
            <div className="text-muted-foreground font-mono text-xs flex items-center group-hover:text-primary transition-colors duration-200">
                View paper <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
        </CardFooter>
        </Card>
    </Link>
  );
}
