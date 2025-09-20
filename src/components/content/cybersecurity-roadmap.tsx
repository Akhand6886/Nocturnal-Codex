// src/components/content/cybersecurity-roadmap.tsx
'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { allTutorialPosts } from 'contentlayer/generated';
import type { TopicPost } from 'contentlayer/generated';
import { ArrowDown } from 'lucide-react';

// Define the types for the roadmap data structure based on the new content model
interface RoadmapNode {
  title: string;
  slug: string;
  description?: string;
  isPrimary?: boolean;
  isOptional?: boolean;
}

interface RoadmapSection {
  title: string;
  nodes: RoadmapNode[];
}

interface RoadmapColumn {
  title: string;
  sections: RoadmapSection[];
  isMainPath?: boolean;
}

// Helper to find tutorial URL
const getTutorialUrl = (slug: string) => {
    const tutorial = allTutorialPosts.find(p => p.language === 'cybersecurity' && p.slug === slug);
    return tutorial?.url;
};

// Node Component
const Node = ({ node }: { node: RoadmapNode }) => {
    const url = getTutorialUrl(node.slug);

    const cardContent = (
        <Card className={cn(
            "w-full text-center transition-all duration-300 ease-in-out cursor-pointer shadow-md border-border/60",
            node.isPrimary && "bg-primary/10 border-primary/50 hover:bg-primary/20 hover:border-primary/80",
            !node.isPrimary && "bg-card hover:bg-muted/50",
            node.isOptional && "border-dashed"
        )}>
            <CardContent className="p-3">
                <h4 className={cn(
                    "font-semibold text-sm",
                    node.isPrimary ? "text-primary-foreground" : "text-card-foreground"
                )}>
                    {node.title}
                </h4>
                {node.description && <p className="text-xs text-muted-foreground mt-1">{node.description}</p>}
            </CardContent>
        </Card>
    );

    if (url) {
        return <Link href={url} className="block">{cardContent}</Link>;
    }
    return <div className="block cursor-not-allowed">{cardContent}</div>;
};


// Section Component
const Section = ({ section, isMainPath }: { section: RoadmapSection; isMainPath?: boolean }) => (
    <div className={cn("mb-6", isMainPath && "flex flex-col items-center")}>
        <h3 className="text-lg font-bold text-foreground mb-4">{section.title}</h3>
        <div className={cn("space-y-3", isMainPath && "flex flex-col items-center")}>
            {section.nodes.map((node, index) => (
                <div key={index} className={cn("w-full", isMainPath && "md:w-64")}>
                    <Node node={node} />
                </div>
            ))}
        </div>
    </div>
);

// Main Component
export function CybersecurityRoadmap({ topic }: { topic: TopicPost }) {
    // This is a placeholder. The actual data structure will come from the updated .md file.
    const roadmapData: RoadmapColumn[] = (topic as any).roadmapColumns || [];
    
    if (!roadmapData || roadmapData.length === 0) {
        return <p className="text-muted-foreground">The roadmap data for this topic is not available yet.</p>;
    }
    
    const mainPath = roadmapData.find(col => col.isMainPath);
    const sidePaths = roadmapData.filter(col => !col.isMainPath);

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Main Path */}
                {mainPath && (
                    <div className="flex-1 w-full md:w-1/3">
                        {mainPath.sections.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="flex flex-col items-center">
                                <Section section={section} isMainPath />
                                {sectionIndex < mainPath.sections.length - 1 && (
                                    <ArrowDown className="my-4 h-8 w-8 text-muted-foreground" />
                                )}
                            </div>
                        ))}
                    </div>
                )}
                 {/* Side Paths */}
                {sidePaths.length > 0 && sidePaths.map((column, colIndex) => (
                    <div key={colIndex} className="flex-1 w-full md:w-1/3">
                        <h2 className="text-xl font-bold text-center mb-6 text-primary">{column.title}</h2>
                        {column.sections.map((section, sectionIndex) => (
                             <Section key={sectionIndex} section={section} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
