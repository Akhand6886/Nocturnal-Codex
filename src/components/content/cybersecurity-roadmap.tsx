
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import { MarkdownRenderer } from "@/components/content/markdown-renderer";
import type { TopicPost, TutorialPost } from 'contentlayer/generated';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

interface CybersecurityRoadmapProps {
  topic: TopicPost;
  tutorials: TutorialPost[];
  breadcrumbs: BreadcrumbItem[];
}

type RoadmapNodeData = {
  id: string;
  title: string;
  slug?: string | null;
  description?: string | null;
  isMainPath?: boolean | null;
  isGroup?: boolean | null;
  items?: RoadmapNodeData[] | null;
};

const RoadmapNode = ({ node, level = 0, tutorials }: { node: RoadmapNodeData, level?: number, tutorials: TutorialPost[] }) => {
    const isParentNode = node.items && node.items.length > 0;
    
    // Find the corresponding tutorial URL if a slug is provided
    const tutorial = node.slug ? tutorials.find(t => t.slug === node.slug) : undefined;
    const href = tutorial?.url;
  
    const renderNodeContent = () => {
        const content = (
            <div className={cn(
                "p-2 rounded-md w-full text-center text-xs font-semibold flex items-center justify-center gap-1.5",
                node.isMainPath ? "bg-primary text-primary-foreground shadow-md" : "bg-card border border-border shadow-sm",
                href ? "group-hover:bg-accent group-hover:text-accent-foreground transition-colors" : "",
                isParentNode && "mb-2"
            )}>
                {node.title}
                {href && <CheckCircle className="h-3.5 w-3.5 text-green-400" />}
            </div>
        );

        if (href) {
            return <Link href={href} className="group block w-full">{content}</Link>;
        }
        return content;
    };
  
    return (
      <div className={cn("flex flex-col items-center relative my-2 w-full", isParentNode && "p-3 bg-muted/30 rounded-lg border border-dashed border-border")}>
        {renderNodeContent()}
        {isParentNode && (
          <div className="w-full grid grid-cols-2 gap-2">
            {node.items?.map(item => (
              <RoadmapNode key={item.id} node={item} level={level + 1} tutorials={tutorials} />
            ))}
          </div>
        )}
      </div>
    );
};

const RoadmapColumn = ({ title, nodes, colSpan = 1, tutorials }: { title: string, nodes: RoadmapNodeData[] | undefined | null, colSpan?: number, tutorials: TutorialPost[] }) => {
  if (!nodes) return <div />;
  return (
    <div className={`flex flex-col items-center space-y-2 col-span-${colSpan}`}>
      <h3 className="font-bold text-sm uppercase text-muted-foreground tracking-wider mb-4">{title}</h3>
      {nodes.map((node, index) => (
        <Fragment key={node.id}>
          <RoadmapNode node={node} tutorials={tutorials} />
          {index < nodes.length - 1 && (
            <div className="h-6 w-px bg-border border-dashed" />
          )}
        </Fragment>
      ))}
    </div>
  );
}


export function CybersecurityRoadmap({ topic, tutorials, breadcrumbs }: CybersecurityRoadmapProps) {

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
                Follow this structured path to build your cybersecurity knowledge from the ground up. Blueprints indicate the main learning path, while side-quests offer areas for specialization. A green check indicates a completed tutorial.
            </p>
        </div>

        <div className="relative px-4">
          {(topic.roadmapColumns || []).map((column, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-x-6 items-start">
               <RoadmapColumn title="Certifications & Tools" nodes={column.left} tutorials={tutorials} />
               <div className="col-span-1 md:col-span-3">
                 <RoadmapColumn title="Main Learning Path" nodes={column.main} colSpan={3} tutorials={tutorials} />
               </div>
               <RoadmapColumn title="Fundamental Skills" nodes={column.right} tutorials={tutorials} />
            </div>
          ))}
        </div>
    </div>
  );
}

