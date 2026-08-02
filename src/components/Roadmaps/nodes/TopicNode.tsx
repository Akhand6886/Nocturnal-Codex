import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { memo } from 'react';
import { CheckCircle2, Clock } from 'lucide-react';

export type NodeStatus = 'recommended' | 'alternative' | 'not-required' | 'done' | 'in-progress' | 'skip' | 'learning' | 'pending';

type TopicNodeData = {
  label: string;
  status?: NodeStatus;
  userStatus?: 'done' | 'learning' | 'pending';
  isHighlighted?: boolean;
};

type TopicNodeType = Node<TopicNodeData, 'topic'>;

const TopicNode = ({ data, selected }: NodeProps<TopicNodeType>) => {
  const userStatus = data.userStatus || (data.status === 'done' ? 'done' : data.status === 'in-progress' ? 'learning' : undefined);

  const isDone = userStatus === 'done';
  const isLearning = userStatus === 'learning';
  const isHighlighted = data.isHighlighted;
  const isRecommended = data.status === 'recommended';

  return (
    <div
      className={`
        relative w-[220px] h-[56px] px-3.5 py-2 rounded-xl text-center cursor-pointer transition-all duration-200 ease-out select-none
        border backdrop-blur-md text-foreground shadow-sm flex items-center justify-center gap-2 box-border overflow-hidden
        hover:shadow-md hover:border-primary/70 hover:-translate-y-0.5
        ${
          isDone
            ? 'bg-emerald-500/15 border-emerald-500/80 text-emerald-950 dark:text-emerald-300 font-bold shadow-emerald-500/10'
            : isLearning
              ? 'bg-amber-500/15 border-amber-500/80 text-amber-950 dark:text-amber-300 font-bold shadow-amber-500/10'
              : isRecommended
                ? 'bg-card/95 border-purple-500/60 dark:border-purple-500/50 dark:bg-zinc-900/90'
                : 'bg-card/90 border-border/80 dark:bg-zinc-900/90 dark:border-zinc-800'
        }
        ${isHighlighted ? 'ring-2 ring-cyan-400 ring-offset-2 scale-105 shadow-cyan-500/40' : ''}
        ${selected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
      `}
    >
      {/* Recommended Pill Indicator */}
      {isRecommended && !isDone && !isLearning && (
        <span className="absolute -top-1.5 left-3 px-1.5 py-0.2 bg-purple-600 text-[9px] font-mono font-bold text-white rounded-full uppercase tracking-wider shadow-sm z-10">
          Rec
        </span>
      )}

      {/* Completion Icon Badges */}
      {isDone && (
        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
      )}

      {isLearning && (
        <Clock className="w-4 h-4 text-amber-500 flex-shrink-0 animate-pulse" />
      )}

      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="target" position={Position.Left} id="left" style={{ opacity: 0 }} isConnectable={false} />

      <span className="roadmap-font font-bold text-xs tracking-wider leading-tight uppercase block text-foreground truncate max-w-full px-1">
        {data.label}
      </span>

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="source" position={Position.Right} id="right" style={{ opacity: 0 }} isConnectable={false} />
    </div>
  );
};

export default memo(TopicNode);
