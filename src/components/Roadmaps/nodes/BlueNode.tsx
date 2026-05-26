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
        min-w-[110px] px-3.5 py-2 rounded-xl text-center cursor-pointer transition-all duration-300 ease-out select-none
        border-2
        bg-gradient-to-br from-blue-550 to-indigo-600 text-white border-stone-950 shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5
        dark:from-blue-500/10 dark:to-indigo-500/10 dark:text-blue-200 dark:border-blue-500/50 dark:shadow-[0_0_15px_rgba(59,130,246,0.08)] dark:hover:shadow-[0_0_25px_rgba(59,130,246,0.25)] dark:hover:border-blue-400
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
