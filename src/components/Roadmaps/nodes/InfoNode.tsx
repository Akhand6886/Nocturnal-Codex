import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { memo } from 'react';

type InfoNodeData = {
  label: string;
};

type InfoNodeType = Node<InfoNodeData, 'info'>;

const InfoNode = ({ data }: NodeProps<InfoNodeType>) => {
  return (
    <div
      style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: 8,
        maxWidth: 220,
        padding: '10px 14px',
        textAlign: 'left',
        pointerEvents: 'none',
      }}
    >
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="target" position={Position.Left} id="left" style={{ opacity: 0 }} isConnectable={false} />

      <span
        className="font-sans text-[11px] leading-relaxed"
        style={{ color: '#475569' }}
      >
        {data.label}
      </span>

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="source" position={Position.Right} id="right" style={{ opacity: 0 }} isConnectable={false} />
    </div>
  );
};

export default memo(InfoNode);
