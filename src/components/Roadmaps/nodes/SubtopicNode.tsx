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
        min-w-[110px] px-3.5 py-2 rounded-xl text-center cursor-pointer transition-all duration-300 ease-out select-none
        border-2
        bg-yellow-50/95 text-stone-800 border-stone-950 shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5
        dark:bg-yellow-500/5 dark:text-yellow-100/90 dark:border-yellow-600/40 dark:shadow-[0_0_10px_rgba(234,179,8,0.04)] dark:hover:shadow-[0_0_15px_rgba(234,179,8,0.18)] dark:hover:border-yellow-500/80
        ${selected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
      `}
    >
      {badge && (
        <span
          className="absolute -top-1.5 -left-1.5 w-3 h-3 rounded-full border shadow-sm"
          style={{
            background: badge.bg,
            borderColor: badge.border,
          }}
        />
      )}

      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="target" position={Position.Left} id="left" style={{ opacity: 0 }} isConnectable={false} />

      <span className="roadmap-font font-semibold text-xs leading-tight block">
        {data.label}
      </span>

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="source" position={Position.Right} id="right" style={{ opacity: 0 }} isConnectable={false} />
    </div>
  );
};

export default memo(SubtopicNode);
