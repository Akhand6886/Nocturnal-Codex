
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Layers } from 'lucide-react';
import type { WikiArticle } from '@/lib/data';

interface WikiArticleCardProps {
  article: WikiArticle;
}

export function WikiArticleCard({ article }: WikiArticleCardProps) {
  return (
    <Link href={`/wiki/${article.slug}`} className="group block h-full">
      <Card className="h-full flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-primary/25 transition-all duration-300 ease-in-out transform hover:-translate-y-1.5 bg-card border border-border/50 hover:border-primary/60 rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">{article.title}</CardTitle>
          <CardDescription className="pt-2 text-sm text-foreground/70 line-clamp-3">{article.excerpt}</CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col items-start gap-4">
            <Badge variant="secondary" className="text-xs px-2 py-1 flex items-center gap-1.5">
                <Layers className="h-3 w-3" />
                {article.category}
            </Badge>
            <div className="text-primary font-semibold text-sm flex items-center group-hover:text-accent transition-all duration-200 ease-in-out opacity-0 group-hover:opacity-100">
                Learn More <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
