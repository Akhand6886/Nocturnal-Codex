
import type { Topic } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface TopicTileProps {
  topic: Topic;
}

export function TopicTile({ topic }: TopicTileProps) {
  return (
    <Link href={`/topics/${topic.slug}`} className="group block">
      <Card className="h-full overflow-hidden shadow-lg hover:shadow-primary/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1.5 bg-card border border-border/50 hover:border-primary/60 rounded-xl">
        {topic.imageUrl && (
          <div className="relative h-44 w-full overflow-hidden rounded-t-xl">
            <Image
              src={topic.imageUrl}
              alt={topic.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105 ease-in-out"
              data-ai-hint={topic.dataAiHint || "abstract topic"}
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/5 transition-colors duration-300"></div>
          </div>
        )}
        <CardHeader className="pt-5">
          <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors duration-200 ease-in-out">
            {topic.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-5">
          <CardDescription className="text-sm text-muted-foreground mb-4 min-h-[3.5em] line-clamp-3">
            {topic.description}
          </CardDescription>
          <div className="flex items-center text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out font-medium">
            Explore <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
