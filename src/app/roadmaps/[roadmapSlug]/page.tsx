
// src/app/roadmaps/[roadmapSlug]/page.tsx
import { notFound } from 'next/navigation';
import { allRoadmapPosts } from 'contentlayer/generated';
import { InteractiveRoadmap } from '@/components/roadmap/InteractiveRoadmap';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
      (p) => p.slug === params.roadmapSlug
    );
  
    if (!roadmap) {
      notFound();
    }
  
    // This function will fetch the JSON blueprint for interactive roadmaps
    const blueprint = await loadRoadmapFlowData(params.roadmapSlug);
  
    // If a blueprint exists, render the interactive roadmap view
    if (blueprint) {
      return (
        <InteractiveRoadmap
          roadmapData={roadmap}
          flowData={blueprint}
          slug={params.roadmapSlug}
        />
      );
    }
  
    // --- FALLBACK FOR STATIC ROADMAPS ---
    // This code runs only if no JSON blueprint is found
  
    const pageTitle = roadmap.title || roadmap.name;
    const breadcrumbItems: BreadcrumbItem[] = [
      { label: "Home", href: "/" },
      { label: "Roadmaps", href: "/roadmaps" },
      { label: pageTitle },
    ];
  
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
        
        {/* Static content rendering for non-interactive roadmaps */}
      </div>
    );
  }

export const revalidate = 60;
