
import { useMemo } from 'react';
import { type Node } from '@xyflow/react';
import { type RoadmapProgress, type RoadmapNodeData } from '@/types/roadmap';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface RoadmapProgressProps {
    nodes: Node<RoadmapNodeData>[];
    progress: RoadmapProgress;
}

export function RoadmapProgress({ nodes, progress }: RoadmapProgressProps) {
    const totalNodes = useMemo(() => nodes.length, [nodes]);
    const completedNodesCount = useMemo(() => progress.completedNodes.length, [progress.completedNodes]);
    const progressPercentage = useMemo(() => {
        if (totalNodes === 0) return 0;
        return Math.round((completedNodesCount / totalNodes) * 100);
    }, [completedNodesCount, totalNodes]);

    return (
        <div className="mb-8 p-4 border rounded-lg bg-card flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
                <div className="relative w-20 h-20">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path
                            className="text-border"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none" stroke="currentColor" strokeWidth="3"
                        />
                        <path
                            className="text-primary"
                            strokeDasharray={`${progressPercentage}, 100`}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold">{progressPercentage}%</span>
                    </div>
                </div>
                <div>
                    <p className="font-semibold text-foreground">{completedNodesCount} of {totalNodes} Done</p>
                    <p className="text-sm text-muted-foreground">Track Progress</p>
                </div>
            </div>
            <div className="flex items-center gap-2 border rounded-full p-1 bg-muted">
                <Button size="sm" className="rounded-full">Roadmap</Button>
                <Button size="sm" variant="ghost" className="rounded-full">AI Tutor</Button>
            </div>
            <div>
                <Button variant="secondary" className="gap-1.5">
                    Personalize <Badge className="ml-2">New</Badge>
                </Button>
            </div>
      </div>
    );
}
