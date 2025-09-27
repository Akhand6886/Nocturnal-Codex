
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import { MarkdownRenderer } from "@/components/content/markdown-renderer";
import type { RoadmapPost, TutorialPost } from 'contentlayer/generated';
import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, GitCommit, Settings, ShieldCheck, Ship, PlayCircle, Search, Monitor, Users, GitBranch, Terminal } from "lucide-react";

interface DevOpsRoadmapProps {
  roadmap: RoadmapPost;
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

const stageIcons: { [key: string]: React.ReactNode } = {
    'devops-plan': <GitCommit className="h-5 w-5" />,
    'devops-code': <GitBranch className="h-5 w-5" />,
    'devops-build': <Settings className="h-5 w-5" />,
    'devops-test': <ShieldCheck className="h-5 w-5" />,
    'devops-release': <PlayCircle className="h-5 w-5" />,
    'devops-deploy': <Ship className="h-5 w-5" />,
    'devops-operate': <Terminal className="h-5 w-5" />,
    'devops-monitor': <Monitor className="h-5 w-5" />,
}

const RoadmapNode = ({ node, tutorials }: { node: RoadmapNodeData, tutorials: TutorialPost[] }) => {
    const tutorial = node.slug ? tutorials.find(t => t.slug === node.slug) : undefined;
    const href = tutorial?.url;
  
    const content = (
      <div className={cn(
        "p-3 rounded-lg w-full text-center text-sm font-semibold flex items-center justify-center gap-2",
        "bg-card border border-border shadow-sm",
        href ? "group-hover:bg-primary/10 group-hover:border-primary/50 transition-all" : "cursor-default",
      )}>
        {stageIcons[node.id] || <div className="h-5 w-5" />}
        {node.title}
        {href && <CheckCircle className="h-4 w-4 text-green-500" />}
      </div>
    );

    if (href) {
        return <Link href={href} className="group block w-full">{content}</Link>;
    }
    return content;
};

const GroupNode = ({ node }: { node: RoadmapNodeData }) => (
    <div className="w-full p-4 bg-muted/30 rounded-lg border border-dashed border-border/50 text-center">
        <h4 className="font-bold text-sm text-foreground/90 mb-2">{node.title}</h4>
        <div className="flex flex-wrap justify-center gap-2">
            {node.items?.map(item => (
                <div key={item.id} className="text-xs bg-background/50 border border-border/50 rounded-full px-3 py-1 font-medium text-muted-foreground">
                    {item.title}
                </div>
            ))}
        </div>
    </div>
);

export function DevOpsRoadmap({ roadmap, tutorials, breadcrumbs }: DevOpsRoadmapProps) {

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10 md:py-12 space-y-12">
        <Breadcrumbs items={breadcrumbs} />
        
        <header className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                {roadmap.name}
            </h1>
            <div className="mt-4 prose dark:prose-invert max-w-3xl mx-auto">
                <MarkdownRenderer content={roadmap.body.raw} />
            </div>
        </header>

        <div className="relative p-4 md:p-8 border border-border/50 rounded-xl bg-card/50 shadow-inner">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 overflow-x-auto pb-4">
                {roadmap.roadmapColumns?.[0]?.main?.map((node, index) => (
                    <Fragment key={node.id}>
                        <div className="flex-shrink-0 w-48">
                            <RoadmapNode node={node} tutorials={tutorials} />
                        </div>
                        {index < (roadmap.roadmapColumns?.[0]?.main?.length || 0) - 1 && (
                            <div className="hidden md:block h-px w-full bg-border border-dashed" />
                        )}
                    </Fragment>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            {roadmap.roadmapColumns?.[0]?.left?.map(node => <GroupNode key={node.id} node={node} />)}
            {roadmap.roadmapColumns?.[0]?.right?.map(node => <GroupNode key={node.id} node={node} />)}
        </div>
    </div>
  );
}
