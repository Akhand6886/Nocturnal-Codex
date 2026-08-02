import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { memo } from 'react';

type SectionNodeData = {
  label: string;
};

type SectionNodeType = Node<SectionNodeData, 'section'>;

const SectionNode = ({ data }: NodeProps<SectionNodeType>) => {
  return (
    <div
      className="w-[400px] text-center select-none pointer-events-none"
    >
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="target" position={Position.Left} id="left" style={{ opacity: 0 }} isConnectable={false} />

      <div className="relative inline-block">
        <span
          className="roadmap-font font-black tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent text-2xl uppercase block"
        >
          {data.label}
        </span>
        <div className="mt-1.5 h-0.5 w-16 mx-auto rounded-full bg-gradient-to-r from-cyan-500 via-primary to-purple-500 opacity-80" />
      </div>

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="source" position={Position.Right} id="right" style={{ opacity: 0 }} isConnectable={false} />
    </div>
  );
};

export default memo(SectionNode);
