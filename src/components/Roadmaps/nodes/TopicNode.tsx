import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { memo } from 'react';

export type NodeStatus = 'recommended' | 'alternative' | 'not-required' | 'done' | 'in-progress' | 'skip';

type TopicNodeData = {
  label: string;
  status?: NodeStatus;
};

type TopicNodeType = Node<TopicNodeData, 'topic'>;

const STATUS_BADGE: Record<string, { bg: string; border: string; label: string }> = {
  recommended:  { bg: '#a855f7', border: '#7e22ce', label: 'Recommended' },
  alternative:  { bg: '#22c55e', border: '#15803d', label: 'Alternative' },
  'not-required': { bg: '#94a3b8', border: '#64748b', label: 'Not Required' },
  done:         { bg: '#a855f7', border: '#7e22ce', label: 'Done' },
  'in-progress':{ bg: '#f59e0b', border: '#d97706', label: 'In Progress' },
  skip:         { bg: '#94a3b8', border: '#64748b', label: 'Skip' },
};

const TopicNode = ({ data, selected }: NodeProps<TopicNodeType>) => {
  const badge = data.status ? STATUS_BADGE[data.status] : null;

  return (
    <div
      className={`
        min-w-[140px] px-4 py-2.5 rounded-xl text-center cursor-pointer transition-all duration-300 ease-out select-none
        border bg-card/85 backdrop-blur-md text-foreground border-border/70 shadow-sm
        hover:shadow-md hover:shadow-primary/5 hover:border-primary/50 hover:-translate-y-1
        dark:bg-zinc-900/85 dark:border-zinc-800/80 dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]
        dark:hover:border-primary/50 dark:hover:shadow-[0_4px_25px_rgba(168,85,247,0.15)]
        ${selected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
      `}
    >
      {badge && (
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
