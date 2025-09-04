

import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeSnippet } from "@/components/content/code-snippet";
import Link from "next/link";
import { ArrowRight, BookOpen, Lightbulb, Code2, GraduationCap, Link as LinkIcon, Brain } from "lucide-react";
import Image from "next/image";
import { allTopicPosts } from 'contentlayer/generated';
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/content/markdown-renderer";
import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import { cache } from 'react';

export const revalidate = 60; 

// Use cache to deduplicate data fetching for a single request
const getTopic = cache((slug: string) => {
  return allTopicPosts.find((t) => t.slug === slug);
});

export async function generateStaticParams() {
  const topics = allTopicPosts || [];
  return topics.map((topic) => ({
    topicSlug: topic.slug,
  }));
}

interface TopicPageProps {
  params: { topicSlug: string };
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const topic = getTopic(params.topicSlug);
  if (!topic) {
    return { title: "Topic Not Found" };
  }
  return {
    title: `${topic.name} | Nocturnal Codex`,
    description: topic.description,
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const topic = getTopic(params.topicSlug);

  if (!topic) {
    notFound();
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Topics", href: "/topics" },
    { label: topic.name },
  ];

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10 md:py-12 space-y-12">
      <Breadcrumbs items={breadcrumbItems} />
      
      <header className="space-y-4">
        {topic.imageUrl && (
          <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden shadow-lg border border-border/20">
            <Image src={topic.imageUrl} alt={topic.name} fill className="object-cover" data-ai-hint={topic.dataAiHint || "topic banner"} priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}
        <div className="border-b border-border pb-6">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">{topic.name}</h1>
            <div className="mt-4">
                <MarkdownRenderer content={topic.body.raw} />
            </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <main className="lg:col-span-2 space-y-12">
          {topic.subtopics && topic.subtopics.length > 0 && (
            <section id="subtopics">
              <h2 className="text-2xl font-bold mb-6 flex items-center text-foreground/90">
                <BookOpen className="mr-3 h-6 w-6 text-primary" />
                Key Subtopics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {topic.subtopics.map((sub) => {
                  const href = `/languages/${topic.slug}?category=${encodeURIComponent(sub.name)}`;
                  return (
                    <Link href={href} key={sub.id} className="group block h-full">
                      <Card className="h-full flex flex-col justify-between rounded-xl border text-card-foreground shadow-lg bg-card hover:bg-muted/40 transition-colors">
                        <CardHeader>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">{sub.name}</CardTitle>
                        </CardHeader>
                        {sub.description && (
                          <CardContent>
                            <p className="text-sm text-muted-foreground">{sub.description}</p>
                          </CardContent>
                        )}
                      </Card>
                    </Link>
                  )
                })}
              </div>
            </section>
          )}

          {topic.codeSnippets && topic.codeSnippets.length > 0 && (
            <section id="code-snippets">
              <h2 className="text-2xl font-bold mb-6 flex items-center text-foreground/90">
                <Code2 className="mr-3 h-6 w-6 text-primary" />
                Code Examples
              </h2>
              <div className="space-y-6">
                {topic.codeSnippets.map((snippet) => (
                  <CodeSnippet 
                    key={snippet.id} 
                    code={snippet.code} 
                    language={snippet.language as any} 
                    title={snippet.title}
                    description={snippet.description}
                  />
                ))}
              </div>
            </section>
          )}
        </main>
        
        <aside className="lg:col-span-1 space-y-8 lg:sticky lg:top-24 self-start">
            {topic.tutorials && topic.tutorials.length > 0 && (
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center text-lg"><GraduationCap className="mr-2 h-5 w-5 text-primary" /> Tutorials</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {topic.tutorials.map((tut) => (
                             <Link href={tut.url} key={tut.id} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
                                <div>
                                    <h4 className="text-sm font-medium text-foreground/90 group-hover:text-primary">{tut.title}</h4>
                                    <p className="text-xs text-muted-foreground">Source: {tut.sourceName}</p>
                                </div>
                                <LinkIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary"/>
                            </Link>
                        ))}
                    </CardContent>
                </Card>
            )}
             {topic.references && topic.references.length > 0 && (
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center text-lg"><Lightbulb className="mr-2 h-5 w-5 text-primary" /> Related Wiki Articles</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {topic.references.map((ref) => (
                            <Link href={`/wiki/${ref.slug}`} key={ref.id} className="group flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
                                <span className="text-sm font-medium text-foreground/90 group-hover:text-primary">{ref.title}</span>
                                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"/>
                            </Link>
                        ))}
                    </CardContent>
                </Card>
            )}
            {topic.thinkTankArticles && topic.thinkTankArticles.length > 0 && (
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center text-lg"><Brain className="mr-2 h-5 w-5 text-primary" /> From The Think Tank</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                       {topic.thinkTankArticles.map((article) => ( 
                           <Link href={`/think-tank/${article.slug}`} key={article.id} className="group flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
                                <span className="text-sm font-medium text-foreground/90 group-hover:text-primary">{article.title}</span>
                                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"/>
                           </Link>
                        ))}
                    </CardContent>
                </Card>
            )}
        </aside>
      </div>
    </div>
  );
}
