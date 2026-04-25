import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { memo } from 'react';

type BlueNodeData = {
  label: string;
};

type BlueNodeType = Node<BlueNodeData, 'blue'>;

const BlueNode = ({ data, selected }: NodeProps<BlueNodeType>) => {
  return (
    <div className={`
      relative px-4 py-2 min-w-[120px] text-center
      rounded-[4px] border-[2px] border-black bg-[hsl(var(--rm-blue-bg))]
      transition-transform duration-200 hover:-translate-y-0.5
      ${selected ? 'ring-2 ring-primary ring-offset-1' : ''}
    `}>
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-1.5 h-1.5 !bg-black border-none rounded-full" 
        isConnectable={false}
      />
      
      <div className="roadmap-font font-semibold text-xs tracking-wide text-[hsl(var(--rm-blue-text))]">
        {data.label}
      </div>

      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-1.5 h-1.5 !bg-black border-none rounded-full" 
        isConnectable={false}
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        id="right"
        className="w-1.5 h-1.5 !bg-black border-none rounded-full" 
        isConnectable={false}
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        id="left"
        className="w-1.5 h-1.5 !bg-black border-none rounded-full" 
        isConnectable={false}
      />
    </div>
  );
};

export default memo(BlueNode);
