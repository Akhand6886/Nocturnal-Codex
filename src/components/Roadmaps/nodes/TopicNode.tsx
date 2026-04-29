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
      style={{
        background: '#FEF015',
        border: '2px solid #000',
        borderRadius: 4,
        minWidth: 140,
        padding: '6px 16px',
        textAlign: 'center',
        cursor: 'pointer',
        boxShadow: selected ? '0 0 0 2px #3b82f6' : '4px 4px 0px #000',
        position: 'relative',
        transition: 'transform 0.15s ease',
      }}
      className="hover:-translate-y-px"
    >
      {badge && (
        <span
          style={{
            position: 'absolute',
            top: -7,
            left: -7,
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: badge.bg,
            border: `1.5px solid ${badge.border}`,
            display: 'block',
          }}
        />
      )}

      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="target" position={Position.Left} id="left" style={{ opacity: 0 }} isConnectable={false} />

      <span className="roadmap-font font-bold text-[14px] text-[#000] leading-tight">
        {data.label}
      </span>

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="source" position={Position.Right} id="right" style={{ opacity: 0 }} isConnectable={false} />
    </div>
  );
};

export default memo(TopicNode);
