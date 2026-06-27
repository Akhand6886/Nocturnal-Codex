import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { memo } from 'react';

type BlueNodeData = {
  label: string;
};

type BlueNodeType = Node<BlueNodeData, 'blue'>;

const BlueNode = ({ data, selected }: NodeProps<BlueNodeType>) => {
  return (
    <div
      className={`
        relative min-w-[110px] px-3.5 py-2 rounded-xl text-center cursor-pointer transition-all duration-300 ease-out select-none
        border bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-border/40 shadow-sm
        hover:shadow-md hover:shadow-indigo-500/10 hover:border-indigo-400/80 hover:-translate-y-0.5
        dark:from-blue-950/80 dark:to-indigo-950/80 dark:text-blue-100 dark:border-indigo-900/60 dark:shadow-[0_3px_15px_rgba(0,0,0,0.3)]
        dark:hover:border-indigo-500 dark:hover:shadow-[0_3px_20px_rgba(99,102,241,0.2)]
        ${selected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
      `}
    >
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="target" position={Position.Left} id="left" style={{ opacity: 0 }} isConnectable={false} />

      <span className="roadmap-font font-bold text-xs leading-tight block">
        {data.label}
      </span>

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="source" position={Position.Right} id="right" style={{ opacity: 0 }} isConnectable={false} />
    </div>
  );
};

export default memo(BlueNode);
