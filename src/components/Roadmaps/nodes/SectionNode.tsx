import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { memo } from 'react';

type SectionNodeData = {
  label: string;
};

type SectionNodeType = Node<SectionNodeData, 'section'>;

const SectionNode = ({ data, selected }: NodeProps<SectionNodeType>) => {
  return (
    <div className={`
      relative px-8 py-4 min-w-[200px] text-center
      border-2 rounded-md shadow-[4px_4px_0_hsl(var(--rm-edge))]
      bg-[hsl(var(--rm-section-bg))] border-[hsl(var(--rm-section-border))]
      transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_hsl(var(--rm-edge))]
      ${selected ? 'ring-2 ring-primary ring-offset-2' : ''}
    `}>
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-2 h-2 !bg-[hsl(var(--rm-edge))] border-none rounded-full" 
        isConnectable={false}
      />
      
      <div className="roadmap-font font-extrabold text-base tracking-widest uppercase text-[hsl(var(--rm-section-text))]">
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
