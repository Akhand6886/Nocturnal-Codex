import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { memo } from 'react';

type SectionNodeData = {
  label: string;
};

type SectionNodeType = Node<SectionNodeData, 'section'>;

const SectionNode = ({ data, selected }: NodeProps<SectionNodeType>) => {
  return (
    <div className={`
      relative px-8 py-2 min-w-[200px] text-center
      bg-transparent border-none
      transition-transform duration-200
    `}>
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-2 h-2 !bg-[hsl(var(--rm-edge))] border-none rounded-full" 
        isConnectable={false}
      />
      
      <div className="roadmap-font font-extrabold text-2xl tracking-wide text-[hsl(var(--rm-section-text))]">
        {data.label}
      </div>

      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-2 h-2 !bg-[hsl(var(--rm-edge))] border-none rounded-full" 
        isConnectable={false}
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        id="right"
        className="w-2 h-2 !bg-[hsl(var(--rm-edge))] border-none rounded-full" 
        isConnectable={false}
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        id="left"
        className="w-2 h-2 !bg-[hsl(var(--rm-edge))] border-none rounded-full" 
        isConnectable={false}
      />
    </div>
  );
};

export default memo(SectionNode);
