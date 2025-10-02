
// src/app/roadmaps/[roadmapSlug]/page.tsx
import { notFound } from 'next/navigation';
import { allRoadmapPosts } from 'contentlayer/generated';
import { InteractiveRoadmap } from '@/components/roadmap/InteractiveRoadmap';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, BookOpen, Users, Star } from 'lucide-react';
import { Metadata } from 'next';
import { CybersecurityRoadmap } from '@/components/content/cybersecurity-roadmap';
import { DevOpsRoadmap } from '@/components/content/devops-roadmap';
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import Image from 'next/image';
import { allTutorialPosts } from 'contentlayer/generated';
import { MarkdownRenderer } from '@/components/content/markdown-renderer';
import { CodeSnippet } from '@/components/content/code-snippet';
import Link from 'next/link';
import { ArrowRight, Brain, Code2, Lightbulb } from 'lucide-react';
import { loadRoadmapFlowData } from '@/lib/roadmap-server-utils';

interface RoadmapPageProps {
  params: {
    roadmapSlug: string;
  };
}

export async function generateStaticParams() {
  return allRoadmapPosts.map((roadmap) => ({
    roadmapSlug: roadmap.slug,
  }));
}

export async function generateMetadata({ params }: RoadmapPageProps): Promise<Metadata> {
  const roadmap = allRoadmapPosts.find(
    (roadmap) => roadmap.slug === params.roadmapSlug
  );

  const title = roadmap?.title || roadmap?.name;

  if (!roadmap) {
    return {
      title: 'Roadmap Not Found',
      description: 'The requested roadmap could not be found.',
    };
  }

  return {
    title: `${title} - Learning Roadmap`,
    description: roadmap.description,
    openGraph: {
      title: title,
      description: roadmap.description,
      type: 'article',
      url: `/roadmaps/${roadmap.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: roadmap.description,
    },
  };
}

export default async function RoadmapPage({ params }: RoadmapPageProps) {
  const roadmap = allRoadmapPosts.find(
    (roadmap) => roadmap.slug === params.roadmapSlug
  );

  if (!roadmap) {
    notFound();
  }
  
  const pageTitle = roadmap.title || roadmap.name;

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Roadmaps", href: "/roadmaps" },
    { label: pageTitle },
  ];

  // Special layout for Cybersecurity topic
  if (roadmap.slug === 'cybersecurity' && roadmap.roadmapColumns) {
    const tutorials = allTutorialPosts.filter(p => p.language === 'cybersecurity');
    return <CybersecurityRoadmap topic={roadmap} tutorials={tutorials} breadcrumbs={breadcrumbItems} />;
  }
  
  // Special layout for DevOps topic
  if (roadmap.slug === 'devops' && roadmap.roadmapColumns) {
    const tutorials = allTutorialPosts.filter(p => p.language === 'devops');
    return <DevOpsRoadmap topic={roadmap} tutorials={tutorials} breadcrumbs={breadcrumbItems} />;
  }

  // Load interactive flow data if it exists.
  const flowData = await loadRoadmapFlowData(params.roadmapSlug);

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'intermediate':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'advanced':
        return 'bg-red-500/10 text-red-600 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  // If interactive data exists, render the interactive view
  if(flowData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl font-bold text-foreground">
                  {pageTitle}
                </h1>
                {roadmap.difficulty && (
                  <Badge 
                    variant="outline" 
                    className={getDifficultyColor(roadmap.difficulty)}
                  >
                    {roadmap.difficulty}
                  </Badge>
                )}
              </div>
              
              <p className="text-xl text-muted-foreground mb-4 max-w-3xl">
                {roadmap.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                {roadmap.estimatedTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Est. Time: {roadmap.estimatedTime}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Category: {roadmap.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Interactive Learning Path</span>
                </div>
              </div>

              {roadmap.tags && roadmap.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {roadmap.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 md:flex-row">
              <Button size="lg" className="gap-2">
                <Star className="h-4 w-4" />
                Start Learning
              </Button>
            </div>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Interactive Learning Path</CardTitle>
            <CardDescription>
              Click on any topic to learn more. Pan and zoom to explore the roadmap.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <InteractiveRoadmap
              roadmapData={roadmap}
              flowData={flowData}
              slug={roadmap.slug}
            />
          </CardContent>
        </Card>

        {roadmap.body.raw && (
          <Card>
            <CardHeader>
              <CardTitle>About This Roadmap</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: roadmap.body.html }} />
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // == DEFAULT STATIC TOPIC PAGE LAYOUT (FALLBACK) ==
  return (
    <div className="container mx-auto max-w-6xl px-4 py-10 md:py-12 space-y-12">
      <Breadcrumbs items={breadcrumbItems} />
      
      <header className="space-y-4">
        {roadmap.imageUrl && (
          <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden shadow-lg border border-border/20">
            <Image src={roadmap.imageUrl} alt={pageTitle} fill className="object-cover" data-ai-hint={roadmap.dataAiHint || "topic banner"} priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}
        <div className="border-b border-border pb-6">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                {pageTitle}
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
                {roadmap.subtopics && roadmap.subtopics.length > 0 && (
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center text-lg"><Brain className="mr-2 h-5 w-5 text-primary" /> Sub-Topics</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                        {roadmap.subtopics.map((subtopic: any) => {
                            const firstTutorial = allTutorialPosts.find(p => p.category === subtopic.slug);
                            const href = firstTutorial ? firstTutorial.url : `/roadmaps/${roadmap.slug}`;
                            return (
                                <Link href={href} key={subtopic.id} className="group flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
                                    <span className="text-sm font-medium text-foreground/90 group-hover:text-primary">{subtopic.name}</span>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"/>
                                </Link>
                            )
                        })}
                        </CardContent>
                    </Card>
                )}
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

export const revalidate = 60;
