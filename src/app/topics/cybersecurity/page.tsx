
import { allTopicPosts, allTutorialPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { cache } from 'react';
import { Breadcrumbs, type BreadcrumbItem } from "@/components/layout/breadcrumbs";
import Image from "next/image";
import { MarkdownRenderer } from "@/components/content/markdown-renderer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, BookText } from "lucide-react";
import type { Metadata } from 'next';

// This is a custom, data-driven page specifically for the Cybersecurity topic.

export const revalidate = 60;

const getTopic = cache(() => {
  return allTopicPosts.find((t) => t.slug === 'cybersecurity');
});

export async function generateMetadata(): Promise<Metadata> {
  const topic = getTopic();
  if (!topic) {
    return { title: "Topic Not Found" };
  }
  return {
    title: `${topic.name} | Nocturnal Codex`,
    description: topic.description,
  };
}

interface RoadmapNodeProps {
    id: string;
    title: string;
    description: string;
    slug: string;
    isMainPath: boolean;
}

const RoadmapNode = ({ id, title, description, slug, isMainPath }: RoadmapNodeProps) => {
    const tutorial = allTutorialPosts.find(p => p.slug === slug);
    const href = tutorial?.url || '#';
    const isClickable = !!tutorial;

    const NodeContent = () => (
        <div className={`p-3 rounded-lg border-2 w-full h-full flex flex-col justify-center ${isMainPath ? 'bg-primary/10 border-primary/40' : 'bg-muted/30 border-border'}`}>
            <h3 className={`font-semibold ${isClickable ? 'group-hover:text-primary' : ''}`}>{title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
    );
    
    if (isClickable) {
        return (
            <Link href={href} className="group block text-center h-full">
                <NodeContent />
            </Link>
        )
    }
    
    return (
        <div className="text-center h-full">
            <NodeContent />
        </div>
    );
}


export default function CybersecurityRoadmapPage() {
    const topic = getTopic();

    if (!topic || !topic.subtopics) {
        notFound();
    }

    const breadcrumbItems: BreadcrumbItem[] = [
        { label: "Home", href: "/" },
        { label: "Topics", href: "/topics" },
        { label: topic.name },
    ];
    
    const roadmapData = topic.subtopics;

    return (
        <div className="container mx-auto max-w-7xl px-4 py-10 md:py-12 space-y-12">
            <Breadcrumbs items={breadcrumbItems} />
            
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
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Follow this structured path to build your cybersecurity knowledge from the ground up. Start with the prerequisites and move step-by-step through the core domains of security.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
                {/* Column 1 */}
                <div className="space-y-8 flex flex-col">
                    <RoadmapNode {...roadmapData[0]} isMainPath={false}/>
                    <RoadmapNode {...roadmapData[4]} isMainPath={false}/>
                </div>

                {/* Column 2 (Main Path) */}
                <div className="space-y-8 flex flex-col">
                    <RoadmapNode {...roadmapData[1]} isMainPath={true}/>
                    <RoadmapNode {...roadmapData[2]} isMainPath={true}/>
                    <RoadmapNode {...roadmapData[3]} isMainPath={true}/>
                    <RoadmapNode {...roadmapData[6]} isMainPath={true}/>
                    <RoadmapNode {...roadmapData[8]} isMainPath={true}/>
                    <RoadmapNode {...roadmapData[10]} isMainPath={true}/>
                </div>

                {/* Column 3 */}
                <div className="space-y-8 flex flex-col">
                    <RoadmapNode {...roadmapData[5]} isMainPath={false}/>
                    <RoadmapNode {...roadmapData[7]} isMainPath={false}/>
                    <RoadmapNode {...roadmapData[9]} isMainPath={false}/>
                    <RoadmapNode {...roadmapData[11]} isMainPath={false}/>
                </div>
            </div>
        </div>
    );
}
