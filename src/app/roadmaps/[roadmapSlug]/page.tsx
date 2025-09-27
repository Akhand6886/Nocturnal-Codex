
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeSnippet } from "@/components/content/code-snippet";
import Link from "next/link";
import { ArrowRight, Lightbulb, Code2, Brain } from "lucide-react";
import Image from "next/image";
import { allRoadmapPosts, allTutorialPosts } from 'contentlayer/generated';
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/content/markdown-renderer";
import type { Metadata } from 'next';
import { cache } from 'react';
import { CybersecurityRoadmap } from "@/components/content/cybersecurity-roadmap";
import { DevOpsRoadmap } from "@/components/content/devops-roadmap";

export const revalidate = 60; 

const getRoadmap = cache((slug: string) => {
  return allRoadmapPosts.find((t) => t.slug === slug);
});

export async function generateStaticParams() {
  const roadmaps = allRoadmapPosts || [];
  return roadmaps.map((roadmap) => ({
    roadmapSlug: roadmap.slug,
  }));
}

interface RoadmapPageProps {
  params: { roadmapSlug: string };
}

export async function generateMetadata({ params }: RoadmapPageProps): Promise<Metadata> {
  const roadmap = getRoadmap(params.roadmapSlug);
  if (!roadmap) {
    return { title: "Roadmap Not Found" };
  }
  return {
    title: `${roadmap.name} | Nocturnal Codex`,
    description: roadmap.description,
  };
}


export default async function RoadmapPage({ params }: RoadmapPageProps) {
  const roadmap = getRoadmap(params.roadmapSlug);

  if (!roadmap) {
    notFound();
  }
  
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Roadmaps", href: "/roadmaps" },
    { label: roadmap.name },
  ];
  
  // Special layout for Cybersecurity roadmap
  if (roadmap.slug === 'cybersecurity') {
    const tutorials = allTutorialPosts.filter(p => p.language === 'cybersecurity');
    return <CybersecurityRoadmap roadmap={roadmap} tutorials={tutorials} breadcrumbs={breadcrumbItems} />;
  }

  // Special layout for DevOps roadmap
  if (roadmap.slug === 'devops') {
    const tutorials = allTutorialPosts.filter(p => p.language === 'devops');
    return <DevOpsRoadmap roadmap={roadmap} tutorials={tutorials} breadcrumbs={breadcrumbItems} />;
  }
  
  // == DEFAULT ROADMAP PAGE LAYOUT ==
  return (
    <div className="container mx-auto max-w-6xl px-4 py-10 md:py-12 space-y-12">
      <Breadcrumbs items={breadcrumbItems} />
      
      <header className="space-y-4">
        {roadmap.imageUrl && (
          <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden shadow-lg border border-border/20">
            <Image src={roadmap.imageUrl} alt={roadmap.name} fill className="object-cover" data-ai-hint={roadmap.dataAiHint || "roadmap banner"} priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}
        <div className="border-b border-border pb-6">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                {roadmap.name}
            </h1>
            <div className="mt-4 prose dark:prose-invert max-w-none">
                <MarkdownRenderer content={roadmap.body.raw} />
            </div>
        </div>
      </header>
      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <main className="lg:col-span-2 space-y-12">

            {roadmap.codeSnippets && roadmap.codeSnippets.length > 0 && (
                <section id="code-snippets">
                <h2 className="text-2xl font-bold mb-6 flex items-center text-foreground/90">
                    <Code2 className="mr-3 h-6 w-6 text-primary" />
                    Code Examples
                </h2>
                <div className="space-y-6">
                    {roadmap.codeSnippets.map((snippet) => (
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
                
                {roadmap.references && roadmap.references.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center text-lg"><Lightbulb className="mr-2 h-5 w-5 text-primary" /> Related Wiki Articles</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {roadmap.references.map((ref) => (
                                <Link href={`/wiki/${ref.slug}`} key={ref.id} className="group flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
                                    <span className="text-sm font-medium text-foreground/90 group-hover:text-primary">{ref.title}</span>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"/>
                                </Link>
                            ))}
                        </CardContent>
                    </Card>
                )}
                {roadmap.thinkTankArticles && roadmap.thinkTankArticles.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center text-lg"><Brain className="mr-2 h-5 w-5 text-primary" /> From The Think Tank</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                        {roadmap.thinkTankArticles.map((article) => ( 
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
