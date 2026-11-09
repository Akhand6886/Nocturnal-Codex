import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { memo } from 'react';
import { CheckCircle2, Clock } from 'lucide-react';

export type NodeStatus = 'recommended' | 'alternative' | 'not-required' | 'done' | 'in-progress' | 'skip' | 'learning' | 'pending';

type TopicNodeData = {
  label: string;
  status?: NodeStatus;
  userStatus?: 'done' | 'learning' | 'pending';
  isHighlighted?: boolean;
};

type TopicNodeType = Node<TopicNodeData, 'topic'>;

const TopicNode = ({ data, selected }: NodeProps<TopicNodeType>) => {
  const userStatus = data.userStatus || (data.status === 'done' ? 'done' : data.status === 'in-progress' ? 'learning' : undefined);

  const isDone = userStatus === 'done';
  const isLearning = userStatus === 'learning';
  const isHighlighted = data.isHighlighted;
  const isRecommended = data.status === 'recommended';

  return (
    <div
      className={`
        relative w-[220px] h-[56px] px-3.5 py-2 rounded-lg text-center cursor-pointer transition-all duration-200 ease-archive select-none
        border text-foreground flex items-center justify-center gap-2 box-border overflow-hidden
        hover:border-[#383838]
        ${
          isDone
            ? 'bg-[#181818] border-emerald-500/50 text-emerald-400 font-medium'
            : isLearning
              ? 'bg-[#181818] border-[#E5A93C]/50 text-[#E5A93C] font-medium'
              : isRecommended
                ? 'bg-[#181818] border-[#E5A93C]/40 text-foreground font-medium'
                : 'bg-[#181818] border-[#272727] text-foreground'
        }
        ${isHighlighted ? 'ring-1 ring-[#E5A93C] border-[#E5A93C]' : ''}
        ${selected ? 'ring-1 ring-[#E5A93C] ring-offset-1 ring-offset-black' : ''}
      `}
    >
      {/* Recommended Pill Indicator */}
      {isRecommended && !isDone && !isLearning && (
        <span className="absolute -top-1 left-3 px-1.5 py-0.2 bg-[#E5A93C] text-[9px] font-mono font-semibold text-black rounded uppercase tracking-wider z-10">
          Rec
        </span>
      )}

      {/* Completion Icon Badges */}
      {isDone && (
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
      )}

      {isLearning && (
        <Clock className="w-3.5 h-3.5 text-[#E5A93C] flex-shrink-0 animate-pulse" />
      )}

      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="target" position={Position.Left} id="left" style={{ opacity: 0 }} isConnectable={false} />

      <span className="font-mono text-xs tracking-wide leading-tight uppercase block text-foreground truncate max-w-full px-1">
        {data.label}
      </span>

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} isConnectable={false} />
      <Handle type="source" position={Position.Right} id="right" style={{ opacity: 0 }} isConnectable={false} />
    </div>
  );
};

export default memo(TopicNode);
