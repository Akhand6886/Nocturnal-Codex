
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import { MarkdownRenderer } from "@/components/content/markdown-renderer";
import type { TopicPost, TutorialPost } from 'contentlayer/generated';
import { allTutorialPosts } from 'contentlayer/generated';
import { Fragment } from "react";

interface RoadmapNodeProps {
    id: string;
    title: string;
    description: string;
    slug: string;
    isMainPath?: boolean;
    isGroup?: boolean;
    items?: RoadmapNodeProps[];
}

const Node = ({ node }: { node: RoadmapNodeProps }) => {
    // The slug from the roadmap data might not be a full tutorial slug.
    // We find the *first* tutorial that matches the category of the node.
    const tutorial = allTutorialPosts.find(p => node.slug && p.category.includes(node.slug));
    const href = tutorial?.url || '#';
    const isClickable = !!tutorial;

    const NodeContent = () => (
        <div className={`p-3 rounded-lg border-2 w-full h-full flex flex-col justify-center text-center ${node.isMainPath ? 'bg-primary/10 border-primary/40' : 'bg-muted/30 border-border'} ${isClickable ? 'group-hover:border-primary/70 group-hover:bg-primary/20' : ''} transition-colors`}>
            <h3 className={`font-semibold text-sm ${isClickable ? 'group-hover:text-primary' : ''}`}>{node.title}</h3>
            {node.description && <p className="text-xs text-muted-foreground mt-1">{node.description}</p>}
        </div>
    );
    
    if (isClickable) {
        return <Link href={href} className="group block h-full">{NodeContent()}</Link>;
    }
    
    return <div className="h-full">{NodeContent()}</div>;
};

const NodeGroup = ({ node }: { node: RoadmapNodeProps }) => (
    <div className="border-2 border-border/50 rounded-lg p-3 space-y-3 bg-card/50">
        <h4 className="text-center font-bold text-foreground/80 text-sm">{node.title}</h4>
        <div className={`grid grid-cols-${node.items && node.items.length > 3 ? '4' : '3'} gap-2`}>
            {node.items?.map(item => <Node key={item.id} node={item} />)}
        </div>
    </div>
);


interface CybersecurityRoadmapProps {
  topic: TopicPost;
  breadcrumbs: BreadcrumbItem[];
}

export function CybersecurityRoadmap({ topic, breadcrumbs }: CybersecurityRoadmapProps) {
  if (!topic.roadmapColumns) {
    return <div>Roadmap data is missing.</div>;
  }
  
  const { left, main, right } = topic.roadmapColumns;

  const renderColumn = (nodes: RoadmapNodeProps[]) => (
    <div className="space-y-6 flex flex-col items-stretch">
        {nodes.map(node => (
            <Fragment key={node.id}>
                {node.isGroup ? <NodeGroup node={node} /> : <Node node={node} />}
            </Fragment>
        ))}
    </div>
  );

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
                Follow this structured path to build your cybersecurity knowledge from the ground up. This roadmap, inspired by <a href="https://roadmap.sh/cyber-security" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">roadmap.sh</a>, outlines the fundamental skills and knowledge domains. The main path is in the center, with related specializations and tools on the sides.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-12 relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-border -z-10 hidden lg:block" />
            
            {/* Left Column */}
            {renderColumn(left || [])}
            
            {/* Center Column - Main Learning Path */}
            <div className="lg:border-x-2 lg:border-dashed lg:border-border/50 lg:px-8">
                {renderColumn(main || [])}
            </div>

            {/* Right Column */}
            {renderColumn(right || [])}
        </div>
    </div>
  );
}

