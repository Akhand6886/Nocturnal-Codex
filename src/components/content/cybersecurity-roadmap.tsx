
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import { MarkdownRenderer } from "@/components/content/markdown-renderer";
import type { TopicPost, TutorialPost } from 'contentlayer/generated';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

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

const RoadmapNode = ({ node, level = 0 }: { node: RoadmapNodeData, level?: number }) => {
  const isParentNode = node.items && node.items.length > 0;
  
  const renderNodeContent = () => (
    <div className={cn(
      "p-2 rounded-md w-full text-center text-xs font-semibold",
      node.isMainPath ? "bg-yellow-300 text-black" : "bg-card border border-border",
      isParentNode && "mb-2"
    )}>
      {node.title}
    </div>
  );

  return (
    <div className={cn("flex flex-col items-center relative my-2", isParentNode && "p-3 bg-muted/30 rounded-lg border border-dashed border-border")}>
      {renderNodeContent()}
      {isParentNode && (
        <div className="w-full grid grid-cols-2 gap-2">
          {node.items?.map(item => (
            <RoadmapNode key={item.id} node={item} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const RoadmapColumn = ({ nodes, colSpan = 1 }: { nodes: RoadmapNodeData[] | undefined | null, colSpan?: number }) => {
  if (!nodes) return <div />;
  return (
    <div className={`flex flex-col items-center space-y-4 col-span-${colSpan}`}>
      {nodes.map((node, index) => (
        <Fragment key={node.id}>
          <RoadmapNode node={node} />
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
                Follow this structured path to build your cybersecurity knowledge from the ground up. This roadmap outlines the fundamental skills and knowledge domains required in the field.
            </p>
        </div>

        <div className="relative">
          {topic.roadmapColumns?.map((column, index) => (
            <div key={index} className="grid grid-cols-5 gap-x-4 items-start">
               <RoadmapColumn nodes={column.left} />
               <div className="col-span-3">
                 <RoadmapColumn nodes={column.main} colSpan={3} />
               </div>
               <RoadmapColumn nodes={column.right} />
            </div>
          ))}
        </div>
    </div>
  );
}
