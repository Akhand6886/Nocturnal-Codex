
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import { MarkdownRenderer } from "@/components/content/markdown-renderer";
import type { TopicPost, TutorialPost } from 'contentlayer/generated';
import { allTutorialPosts } from 'contentlayer/generated';

interface RoadmapNodeProps {
    id: string;
    title: string;
    description: string;
    slug: string;
    isMainPath: boolean;
}

const RoadmapNode = ({ id, title, description, slug, isMainPath }: RoadmapNodeProps) => {
    // The slug from the roadmap data might not be a full tutorial slug.
    // We find the *first* tutorial that matches the category of the node.
    const tutorial = allTutorialPosts.find(p => p.category.includes(slug));
    const href = tutorial?.url || '#';
    const isClickable = !!tutorial;

    const NodeContent = () => (
        <div className={`p-3 rounded-lg border-2 w-full h-full flex flex-col justify-center ${isMainPath ? 'bg-primary/10 border-primary/40' : 'bg-muted/30 border-border'} ${isClickable ? 'group-hover:border-primary/70 group-hover:bg-primary/20' : ''} transition-colors`}>
            <h3 className={`font-semibold ${isClickable ? 'group-hover:text-primary' : ''}`}>{title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
    );
    
    if (isClickable) {
        return (
            <Link href={href} className="group block text-center h-full">
                <NodeContent />
            </Link>
        );
    }
    
    return (
        <div className="text-center h-full">
            <NodeContent />
        </div>
    );
};


interface CybersecurityRoadmapProps {
  topic: TopicPost;
  breadcrumbs: BreadcrumbItem[];
}

export function CybersecurityRoadmap({ topic, breadcrumbs }: CybersecurityRoadmapProps) {
  if (!topic.subtopics) {
    return <div>Roadmap data is missing.</div>;
  }
  
  const roadmapData = topic.subtopics;

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
            <p className="text-muted-foreground max-w-3xl mx-auto">
                Follow this structured path to build your cybersecurity knowledge from the ground up. Start with the prerequisites and move step-by-step through the core domains of security. The main path is in the center, with related specialized topics on the sides.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
            {/* Left Column - Specialized Topics */}
            <div className="space-y-8 flex flex-col">
                <RoadmapNode {...roadmapData[4]} isMainPath={false}/>
                <RoadmapNode {...roadmapData[5]} isMainPath={false}/>
                <RoadmapNode {...roadmapData[9]} isMainPath={false}/>
                <RoadmapNode {...roadmapData[11]} isMainPath={false}/>
            </div>

            {/* Center Column - Main Learning Path */}
            <div className="space-y-8 flex flex-col border-x-2 border-dashed border-border/50 px-8">
                <RoadmapNode {...roadmapData[0]} isMainPath={true}/>
                <RoadmapNode {...roadmapData[1]} isMainPath={true}/>
                <RoadmapNode {...roadmapData[2]} isMainPath={true}/>
                <RoadmapNode {...roadmapData[3]} isMainPath={true}/>
                <RoadmapNode {...roadmapData[6]} isMainPath={true}/>
                <RoadmapNode {...roadmapData[8]} isMainPath={true}/>
                <RoadmapNode {...roadmapData[10]} isMainPath={true}/>
            </div>

            {/* Right Column - Specialized Topics */}
            <div className="space-y-8 flex flex-col">
                <RoadmapNode {...roadmapData[7]} isMainPath={false}/>
            </div>
        </div>
    </div>
  );
}
