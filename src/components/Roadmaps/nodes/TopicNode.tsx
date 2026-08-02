import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { memo } from 'react';
import { CheckCircle2, Clock, Sparkles } from 'lucide-react';

export type NodeStatus = 'recommended' | 'alternative' | 'not-required' | 'done' | 'in-progress' | 'skip' | 'learning' | 'pending';

type TopicNodeData = {
  label: string;
  status?: NodeStatus;
  userStatus?: 'done' | 'learning' | 'pending';
  isHighlighted?: boolean;
};

type TopicNodeType = Node<TopicNodeData, 'topic'>;

const STATUS_BADGE: Record<string, { bg: string; border: string; label: string }> = {
  recommended:  { bg: '#a855f7', border: '#7e22ce', label: 'Recommended' },
  alternative:  { bg: '#22c55e', border: '#15803d', label: 'Alternative' },
  'not-required': { bg: '#94a3b8', border: '#64748b', label: 'Not Required' },
  done:         { bg: '#22c55e', border: '#15803d', label: 'Mastered' },
  learning:     { bg: '#f59e0b', border: '#d97706', label: 'In Progress' },
};

const TopicNode = ({ data, selected }: NodeProps<TopicNodeType>) => {
  const userStatus = data.userStatus || (data.status === 'done' ? 'done' : data.status === 'in-progress' ? 'learning' : undefined);
  const badge = data.status ? STATUS_BADGE[data.status] : null;

  const isDone = userStatus === 'done';
  const isLearning = userStatus === 'learning';
  const isHighlighted = data.isHighlighted;

  return (
    <div
      className={`
        relative min-w-[150px] px-4 py-3 rounded-xl text-center cursor-pointer transition-all duration-300 ease-out select-none
        border backdrop-blur-md text-foreground shadow-sm
        hover:shadow-md hover:border-primary/60 hover:-translate-y-1
        ${
          isDone
            ? 'bg-emerald-500/15 border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.25)] text-emerald-950 dark:text-emerald-300'
            : isLearning
              ? 'bg-amber-500/15 border-amber-500/80 shadow-[0_0_20px_rgba(245,158,11,0.25)] text-amber-950 dark:text-amber-300'
              : 'bg-card/90 border-border/80 dark:bg-zinc-900/90 dark:border-zinc-800'
        }
        ${isHighlighted ? 'ring-2 ring-cyan-400 ring-offset-2 scale-105 shadow-cyan-500/40' : ''}
        ${selected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
      `}
    >
      {/* Category status badge indicator */}
      {badge && !isDone && !isLearning && (
        <span className="absolute -top-1.5 -left-1.5 flex h-3.5 w-3.5" title={badge.label}>
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ backgroundColor: badge.bg }}
          />
          <span
            className="relative inline-flex rounded-full h-3.5 w-3.5 border shadow-sm"
            style={{
              backgroundColor: badge.bg,
              borderColor: badge.border,
            }}
          />
        </span>
      )}

      {/* Completion Icon Badges */}
      {isDone && (
        <div className="absolute -top-2 -right-2 bg-emerald-500 text-slate-950 rounded-full p-0.5 shadow-lg border border-emerald-400">
          <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
        </div>
      )}

      {isLearning && (
        <div className="absolute -top-2 -right-2 bg-amber-500 text-slate-950 rounded-full p-0.5 shadow-lg border border-amber-400">
          <Clock className="w-4 h-4 stroke-[2.5]" />
        </div>
      )}

      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="target" position={Position.Left} id="left" style={{ opacity: 0 }} isConnectable={false} />

      <span className="roadmap-font font-bold text-xs tracking-wider leading-tight uppercase block text-card-foreground">
        {data.label}
      </span>

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="source" position={Position.Right} id="right" style={{ opacity: 0 }} isConnectable={false} />
    </div>
  );
};

export default memo(TopicNode);
