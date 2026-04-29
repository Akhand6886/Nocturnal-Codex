import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { memo } from 'react';

type LabelNodeData = {
  label: string;
};

type LabelNodeType = Node<LabelNodeData, 'label'>;

const LabelNode = ({ data }: NodeProps<LabelNodeType>) => {
  return (
    <div
      style={{
        background: 'transparent',
        border: 'none',
        textAlign: 'center',
        pointerEvents: 'none',
      }}
    >
      <Handle type="target" position={Position.Left} id="left" style={{ opacity: 0 }} isConnectable={false} />

      <span
        className="roadmap-font font-semibold text-[11px] italic"
        style={{ color: '#64748b', whiteSpace: 'nowrap' }}
      >
        {data.label}
      </span>

      <Handle type="source" position={Position.Right} id="right" style={{ opacity: 0 }} isConnectable={false} />
    </div>
  );
};

export default memo(LabelNode);
