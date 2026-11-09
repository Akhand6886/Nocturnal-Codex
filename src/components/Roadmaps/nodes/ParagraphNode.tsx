import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { memo } from 'react';

type ParagraphNodeData = {
  label: string;
};

type ParagraphNodeType = Node<ParagraphNodeData, 'paragraph'>;

const ParagraphNode = ({ data }: NodeProps<ParagraphNodeType>) => {
  return (
    <div className="max-w-[320px] p-3 text-left select-none pointer-events-none text-muted-foreground text-xs leading-relaxed font-sans">
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="target" position={Position.Left} id="left" style={{ opacity: 0 }} isConnectable={false} />

      <p className="bg-card p-2.5 rounded-lg border border-border text-foreground/80 text-xs font-mono shadow-xs">
        {data.label}
      </p>

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="source" position={Position.Right} id="right" style={{ opacity: 0 }} isConnectable={false} />
    </div>
  );
};

export default memo(ParagraphNode);

