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

      <div className="relative inline-block">
        {/* Subtle decorative line */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <span
          className="roadmap-font font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60 bg-clip-text text-transparent text-[26px] block"
        >
          {data.label}
        </span>
      </div>

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="source" position={Position.Right} id="right" style={{ opacity: 0 }} isConnectable={false} />
    </div>
  );
};

export default memo(SectionNode);
