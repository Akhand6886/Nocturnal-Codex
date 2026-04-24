import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { memo } from 'react';

type SubtopicNodeData = {
  label: string;
  status?: 'done' | 'learning' | 'pending';
};

type SubtopicNodeType = Node<SubtopicNodeData, 'subtopic'>;

const SubtopicNode = ({ data, selected }: NodeProps<SubtopicNodeType>) => {
  let bgClass = "bg-[hsl(var(--rm-topic-bg))]";
  let borderClass = "border-[hsl(var(--rm-topic-border))]";
  let textClass = "text-[hsl(var(--rm-topic-text))]";

  if (data.status === 'done') {
    bgClass = "bg-[hsl(var(--rm-done-bg))]";
    borderClass = "border-[hsl(var(--rm-done-border))]";
    textClass = "text-[hsl(var(--rm-done-border))] line-through";
  } else if (data.status === 'learning') {
    bgClass = "bg-[hsl(var(--rm-learning-bg))]";
    borderClass = "border-[hsl(var(--rm-learning-border))]";
    textClass = "text-[hsl(var(--rm-learning-border))] underline";
  }

  return (
    <div className={`
      relative px-4 py-2 min-w-[120px] text-center
      border-2 rounded-full shadow-[2px_2px_0_hsl(var(--rm-edge))]
      transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_hsl(var(--rm-edge))]
      ${bgClass} ${borderClass} ${selected ? 'ring-2 ring-primary ring-offset-1' : ''}
    `}>
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-1.5 h-1.5 !bg-[hsl(var(--rm-edge))] border-none rounded-full" 
        isConnectable={false}
      />
      
      <div className={`roadmap-font font-semibold text-xs tracking-wide ${textClass}`}>
        {data.label}
      </div>

      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-1.5 h-1.5 !bg-[hsl(var(--rm-edge))] border-none rounded-full" 
        isConnectable={false}
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        id="right"
        className="w-1.5 h-1.5 !bg-[hsl(var(--rm-edge))] border-none rounded-full" 
        isConnectable={false}
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        id="left"
        className="w-1.5 h-1.5 !bg-[hsl(var(--rm-edge))] border-none rounded-full" 
        isConnectable={false}
      />
    </div>
  );
};

export default memo(SubtopicNode);
