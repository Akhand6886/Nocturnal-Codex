import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { memo } from 'react';

type SectionNodeData = {
  label: string;
};

type SectionNodeType = Node<SectionNodeData, 'section'>;

const SectionNode = ({ data }: NodeProps<SectionNodeType>) => {
  return (
    <div
      style={{
        background: 'transparent',
        border: 'none',
        textAlign: 'center',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="target" position={Position.Left} id="left" style={{ opacity: 0 }} isConnectable={false} />

      <span
        className="roadmap-font font-extrabold text-[#1a1a1a] dark:text-white"
        style={{ fontSize: 28, letterSpacing: '-0.5px' }}
      >
        {data.label}
      </span>

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="source" position={Position.Right} id="right" style={{ opacity: 0 }} isConnectable={false} />
    </div>
  );
};

export default memo(SectionNode);
