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
        border-2
        bg-amber-100/90 text-stone-900 border-stone-950 shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5
        dark:bg-amber-500/10 dark:text-amber-200 dark:border-amber-500/50 dark:shadow-[0_0_15px_rgba(245,158,11,0.08)] dark:hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] dark:hover:border-amber-400
        ${selected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
      `}
    >
      {badge && (
        <span
          className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 rounded-full border shadow-sm"
          style={{
            background: badge.bg,
            borderColor: badge.border,
          }}
          title={badge.label}
        />
      )}

      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="target" position={Position.Left} id="left" style={{ opacity: 0 }} isConnectable={false} />

      <span className="roadmap-font font-bold text-xs tracking-wide leading-tight uppercase block">
        {data.label}
      </span>

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="source" position={Position.Right} id="right" style={{ opacity: 0 }} isConnectable={false} />
    </div>
  );
};

export default memo(TopicNode);
