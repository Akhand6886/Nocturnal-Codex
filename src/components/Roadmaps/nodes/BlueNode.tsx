import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { memo } from 'react';

type BlueNodeData = {
  label: string;
};

type BlueNodeType = Node<BlueNodeData, 'blue'>;

const BlueNode = ({ data, selected }: NodeProps<BlueNodeType>) => {
  return (
    <div
      style={{
        background: '#3b82f6',
        border: '2px solid #000',
        borderRadius: 4,
        minWidth: 110,
        padding: '5px 14px',
        textAlign: 'center',
        cursor: 'pointer',
        boxShadow: selected ? '0 0 0 2px #f59e0b' : '4px 4px 0px #000',
        transition: 'transform 0.15s ease',
      }}
      className="hover:-translate-y-px"
    >
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="target" position={Position.Left} id="left" style={{ opacity: 0 }} isConnectable={false} />

      <span className="roadmap-font font-bold text-[13px] text-white leading-tight">
        {data.label}
      </span>

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="source" position={Position.Right} id="right" style={{ opacity: 0 }} isConnectable={false} />
    </div>
  );
};

export default memo(BlueNode);
