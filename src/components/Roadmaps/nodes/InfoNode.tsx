import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { memo } from 'react';

type InfoNodeData = {
  label: string;
};

type InfoNodeType = Node<InfoNodeData, 'info'>;

const InfoNode = ({ data, selected }: NodeProps<InfoNodeType>) => {
  return (
    <div className={`
      relative px-5 py-4 min-w-[200px] max-w-[260px] text-left
      rounded-[4px] bg-[hsl(var(--rm-info-bg))]
      transition-transform duration-200
      ${selected ? 'ring-2 ring-primary ring-offset-1' : ''}
    `}>
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-1.5 h-1.5 !bg-transparent border-none rounded-full" 
        isConnectable={false}
      />
      
      <div className="font-sans text-xs leading-relaxed text-[hsl(var(--rm-info-text))]">
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

export default memo(InfoNode);
