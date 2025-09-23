
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import { MarkdownRenderer } from "@/components/content/markdown-renderer";
import type { TopicPost, TutorialPost } from 'contentlayer/generated';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Fragment } from "react";

interface CybersecurityRoadmapProps {
  topic: TopicPost;
  tutorials: TutorialPost[];
  breadcrumbs: BreadcrumbItem[];
}

export function CybersecurityRoadmap({ topic, tutorials, breadcrumbs }: CybersecurityRoadmapProps) {

  const subtopicsByCategory: Record<string, any[]> = {};
  if (topic.subtopics) {
    topic.subtopics.forEach(sub => {
      const category = sub.slug || "General";
      if (!subtopicsByCategory[category]) {
        subtopicsByCategory[category] = [];
      }
      subtopicsByCategory[category].push(sub);
    });
  }

  const renderTutorialsForSubtopic = (subtopicSlug: string) => {
    return tutorials
      .filter(t => t.category === subtopicSlug)
      .sort((a, b) => a.order - b.order)
      .map(t => (
        <Link href={t.url} key={t.slug} className="block text-sm text-primary hover:underline p-2 rounded-md hover:bg-muted/50">
          {t.title}
        </Link>
      ));
  };


  return (
    <div className="container mx-auto max-w-7xl px-4 py-10 md:py-12 space-y-12">
        <Breadcrumbs items={breadcrumbs} />
        
        <header className="space-y-4">
            {topic.imageUrl && (
            <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden shadow-lg border border-border/20">
                <Image src={topic.imageUrl} alt={topic.name} fill className="object-cover" data-ai-hint={topic.dataAiHint || "topic banner"} priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            )}
            <div className="border-b border-border pb-6">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                    {topic.name}
                </h1>
                <div className="mt-4 prose dark:prose-invert max-w-none">
                    <MarkdownRenderer content={topic.body.raw} />
                </div>
            </div>
        </header>

        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2 text-foreground/90">Cybersecurity Learning Path</h2>
            <p className="text-muted-foreground max-w-4xl mx-auto">
                Follow this structured path to build your cybersecurity knowledge from the ground up. This roadmap outlines the fundamental skills and knowledge domains required in the field.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topic.subtopics?.map(subtopic => (
            <Card key={subtopic.id} className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>{subtopic.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                  <p className="text-muted-foreground text-sm mb-4">{subtopic.description}</p>
                  <div className="space-y-1">
                      {renderTutorialsForSubtopic(subtopic.slug)}
                  </div>
              </CardContent>
            </Card>
          ))}
        </div>
    </div>
  );
}
