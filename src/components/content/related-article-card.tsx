
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, FileText, Brain, BookOpen } from 'lucide-react'; 

export interface RelatedArticle {
  title: string;
  slug: string;
  type: 'blog' | 'think-tank' | 'wiki';
  excerpt?: string; 
}

interface RelatedArticleCardProps {
  article: RelatedArticle;
}

const typeIconMap = {
  blog: <FileText className="h-5 w-5 text-primary" />,
  'think-tank': <Brain className="h-5 w-5 text-accent" />,
  wiki: <BookOpen className="h-5 w-5 text-primary" />,
};

export function RelatedArticleCard({ article }: RelatedArticleCardProps) {
  const href = `/${article.type}/${article.slug}`;

  return (
    <Link href={href} className="group block h-full">
      <Card className="h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:border-primary/50 cursor-pointer bg-card hover:bg-muted/30 flex flex-col">
        <CardHeader className="flex-row items-center space-x-3 pb-3 pt-4">
          {typeIconMap[article.type]}
          <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors">
            {article.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow pt-0 pb-4">
            {article.excerpt && (
                <p className="text-xs text-muted-foreground line-clamp-2">{article.excerpt}</p>
            )}
        </CardContent>
        <CardContent className="pt-0 pb-3 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
            Read More <ArrowRight className="ml-1 h-3 w-3"/>
        </CardContent>
      </Card>
    </Link>
  );
}
