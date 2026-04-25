import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { memo } from 'react';

type TopicNodeData = {
  label: string;
  status?: 'done' | 'learning' | 'pending';
};

type TopicNodeType = Node<TopicNodeData, 'topic'>;

const TopicNode = ({ data, selected }: NodeProps<TopicNodeType>) => {
  let bgClass = "bg-[hsl(var(--rm-topic-bg))]";
  let borderClass = "border-[2px] border-[hsl(var(--rm-topic-border))]";
  let textClass = "text-[hsl(var(--rm-topic-text))]";

  if (data.status === 'done') {
    bgClass = "bg-[hsl(var(--rm-subtopic-bg))]";
  }

  return (
    <div className={`
      relative px-6 py-2.5 min-w-[150px] text-center
      rounded-[4px]
      transition-transform duration-200 hover:-translate-y-0.5
      ${bgClass} ${borderClass} ${selected ? 'ring-2 ring-primary ring-offset-2' : ''}
    `}>
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-2 h-2 !bg-[hsl(var(--rm-edge))] border-none rounded-full" 
        isConnectable={false}
      />
      
      <div className={`roadmap-font font-bold text-sm tracking-wide ${textClass}`}>
        {data.label}
      </div>

      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-2 h-2 !bg-[hsl(var(--rm-edge))] border-none rounded-full" 
        isConnectable={false}
      />
      {/* For horizontal connections, also add left/right handles */}
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

export default memo(TopicNode);
