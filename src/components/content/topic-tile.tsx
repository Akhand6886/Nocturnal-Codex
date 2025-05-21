
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
      <Card className="h-full overflow-hidden shadow-lg hover:shadow-accent/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-card border border-transparent hover:border-accent/60">
        {topic.imageUrl && (
          <div className="relative h-40 w-full overflow-hidden">
            <Image
              src={topic.imageUrl}
              alt={topic.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105 ease-in-out"
              data-ai-hint={topic.dataAiHint || "abstract topic"}
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors duration-200 ease-in-out">
            {topic.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm text-muted-foreground mb-4 min-h-[3em]">
            {topic.description}
          </CardDescription>
          <div className="flex items-center text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
            Explore <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
