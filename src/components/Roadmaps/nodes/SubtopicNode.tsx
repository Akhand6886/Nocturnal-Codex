import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { memo } from 'react';
import { Check } from 'lucide-react';

type SubtopicNodeData = {
  label: string;
  status?: 'done' | 'learning' | 'pending';
};

type SubtopicNodeType = Node<SubtopicNodeData, 'subtopic'>;

const SubtopicNode = ({ data, selected }: NodeProps<SubtopicNodeType>) => {
  let bgClass = "bg-[hsl(var(--rm-subtopic-bg))]";
  let borderClass = "border-[2px] border-[hsl(var(--rm-subtopic-border))]";
  let textClass = "text-[hsl(var(--rm-subtopic-text))]";

  // Determine status color for the badge
  let statusColor = "";
  if (data.status === 'done') {
    statusColor = "bg-[hsl(var(--rm-done-icon))]"; // Purple
  } else if (data.status === 'learning') {
    statusColor = "bg-[hsl(var(--rm-learning-icon))]"; // Green
  }

  return (
    <div className={`
      relative px-4 py-1.5 min-w-[110px] text-center
      rounded-[4px]
      transition-transform duration-200 hover:-translate-y-0.5
      ${bgClass} ${borderClass} ${selected ? 'ring-2 ring-primary ring-offset-1' : ''}
    `}>
      {data.status && (
        <div className={`absolute -top-1.5 -left-1.5 w-4 h-4 rounded-full flex items-center justify-center border-[1.5px] border-black ${statusColor}`}>
          <Check strokeWidth={4} className="w-2.5 h-2.5 text-white" />
        </div>
      )}
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
