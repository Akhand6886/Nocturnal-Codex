import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { memo } from 'react';

type InfoNodeData = {
  label: string;
};

type InfoNodeType = Node<InfoNodeData, 'info'>;

const InfoNode = ({ data }: NodeProps<InfoNodeType>) => {
  return (
    <div
      className="
        max-w-[220px] p-3.5 rounded-xl border text-left pointer-events-none select-none shadow-sm backdrop-blur-md
        bg-muted/40 text-muted-foreground border-border/50
        dark:bg-zinc-900/40 dark:text-zinc-400 dark:border-zinc-800/40
      "
    >
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="target" position={Position.Left} id="left" style={{ opacity: 0 }} isConnectable={false} />

      <span className="font-sans text-[11px] leading-relaxed block">
        {data.label}
      </span>

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="source" position={Position.Right} id="right" style={{ opacity: 0 }} isConnectable={false} />
    </div>
  );
};

export default memo(InfoNode);
