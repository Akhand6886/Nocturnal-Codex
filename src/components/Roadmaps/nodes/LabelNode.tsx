import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { memo } from 'react';

type LabelNodeData = {
  label: string;
};

type LabelNodeType = Node<LabelNodeData, 'label'>;

const LabelNode = ({ data, selected }: NodeProps<LabelNodeType>) => {
  return (
    <div className={`
      relative px-2 py-0.5 min-w-[80px] text-center
      bg-background
      transition-transform duration-200
    `}>
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-1.5 h-1.5 !bg-transparent border-none rounded-full" 
        isConnectable={false}
      />
      
      <div className="roadmap-font font-medium text-xs text-foreground tracking-wide">
        {data.label}
      </div>

      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-1.5 h-1.5 !bg-transparent border-none rounded-full" 
        isConnectable={false}
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        id="right"
        className="w-1.5 h-1.5 !bg-transparent border-none rounded-full" 
        isConnectable={false}
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        id="left"
        className="w-1.5 h-1.5 !bg-transparent border-none rounded-full" 
        isConnectable={false}
      />
    </div>
  );
};

export default memo(LabelNode);
