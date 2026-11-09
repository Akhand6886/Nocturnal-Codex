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
        border text-foreground flex items-center justify-center gap-2 box-border overflow-hidden shadow-xs
        hover:border-primary/60 hover:shadow-sm
        ${
          isDone
            ? 'bg-emerald-500/15 border-emerald-500/70 text-emerald-900 dark:text-emerald-300 font-bold'
            : isLearning
              ? 'bg-amber-500/15 border-amber-500/70 text-amber-900 dark:text-amber-300 font-bold'
              : isRecommended
                ? 'bg-card border-primary/70 text-foreground font-semibold'
                : 'bg-card border-border text-foreground'
        }
        ${isHighlighted ? 'ring-2 ring-primary border-primary' : ''}
        ${selected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
      `}
    >
      {/* Recommended Pill Indicator */}
      {isRecommended && !isDone && !isLearning && (
        <span className="absolute -top-1 left-3 px-1.5 py-0.2 bg-primary text-[9px] font-mono font-bold text-primary-foreground rounded uppercase tracking-wider z-10 shadow-xs">
          Rec
        </span>
      )}

      {/* Completion Icon Badges */}
      {isDone && (
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
      )}

      {isLearning && (
        <Clock className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 animate-pulse" />
      )}

      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="target" position={Position.Left} id="left" style={{ opacity: 0 }} isConnectable={false} />

      <span className="font-mono text-xs tracking-wide leading-tight uppercase block text-foreground truncate max-w-full px-1">
        {data.label}
      </span>

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="source" position={Position.Right} id="right" style={{ opacity: 0 }} isConnectable={false} />
    </div>
  );
};

export default memo(TopicNode);
