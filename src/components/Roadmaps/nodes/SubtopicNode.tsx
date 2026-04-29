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
      style={{
        background: '#FFF',
        border: '2px solid #000',
        borderRadius: 4,
        minWidth: 110,
        padding: '4px 12px',
        textAlign: 'center',
        cursor: 'pointer',
        boxShadow: selected ? '0 0 0 2px #3b82f6' : '2px 2px 0px #000',
        position: 'relative',
        transition: 'transform 0.15s ease',
      }}
      className="hover:-translate-y-px"
    >
      {badge && (
        <span
          style={{
            position: 'absolute',
            top: -6,
            left: -6,
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: badge.bg,
            border: `1.5px solid ${badge.border}`,
            display: 'block',
          }}
        />
      )}

      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="target" position={Position.Left} id="left" style={{ opacity: 0 }} isConnectable={false} />

      <span className="roadmap-font font-semibold text-[13px] text-[#000] leading-tight">
        {data.label}
      </span>

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="source" position={Position.Right} id="right" style={{ opacity: 0 }} isConnectable={false} />
    </div>
  );
};

export default memo(SubtopicNode);
