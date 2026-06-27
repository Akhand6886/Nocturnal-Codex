import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { memo } from 'react';
import { NodeStatus } from './TopicNode';

type SubtopicNodeData = {
  label: string;
  status?: NodeStatus;
};

type SubtopicNodeType = Node<SubtopicNodeData, 'subtopic'>;

const STATUS_BADGE: Record<string, { bg: string; border: string }> = {
  recommended:  { bg: '#a855f7', border: '#7e22ce' },
  alternative:  { bg: '#22c55e', border: '#15803d' },
  'not-required': { bg: '#94a3b8', border: '#64748b' },
  done:         { bg: '#a855f7', border: '#7e22ce' },
  'in-progress':{ bg: '#f59e0b', border: '#d97706' },
  skip:         { bg: '#94a3b8', border: '#64748b' },
};

const SubtopicNode = ({ data, selected }: NodeProps<SubtopicNodeType>) => {
  const badge = data.status ? STATUS_BADGE[data.status] : null;

  return (
    <div
      className={`
        relative min-w-[110px] px-3.5 py-2 rounded-xl text-center cursor-pointer transition-all duration-300 ease-out select-none
        border bg-card/75 backdrop-blur-md text-foreground/90 border-border/60 shadow-sm
        hover:shadow hover:shadow-primary/5 hover:border-primary/40 hover:-translate-y-0.5
        dark:bg-zinc-900/75 dark:border-zinc-800/70 dark:shadow-[0_3px_15px_rgba(0,0,0,0.25)]
        dark:hover:border-primary/45 dark:hover:shadow-[0_3px_20px_rgba(168,85,247,0.1)]
        ${selected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
      `}
    >
      {badge && (
        <span className="absolute -top-1 -left-1 flex h-3 w-3">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ backgroundColor: badge.bg }}
          />
          <span
            className="relative inline-flex rounded-full h-3 w-3 border shadow-sm"
            style={{
              backgroundColor: badge.bg,
              borderColor: badge.border,
            }}
          />
        </span>
      )}

      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="target" position={Position.Left} id="left" style={{ opacity: 0 }} isConnectable={false} />

      <span className="roadmap-font font-semibold text-xs leading-tight block text-card-foreground/90">
        {data.label}
      </span>

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="source" position={Position.Right} id="right" style={{ opacity: 0 }} isConnectable={false} />
    </div>
  );
};

export default memo(SubtopicNode);
