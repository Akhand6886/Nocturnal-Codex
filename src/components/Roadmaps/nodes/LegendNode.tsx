import { memo } from 'react';

const LegendNode = () => {
  return (
    <div className="p-3 rounded-lg border border-[#272727] bg-[#181818] select-none text-[11px] space-y-1.5 w-[180px]">
      <div className="font-semibold text-foreground text-xs uppercase tracking-wider mb-2 font-mono">
        Map Legend
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#E5A93C] inline-block flex-shrink-0" />
        <span className="text-muted-foreground font-medium">Recommended</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block flex-shrink-0" />
        <span className="text-muted-foreground font-medium">Alternative</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-neutral-400 inline-block flex-shrink-0" />
        <span className="text-muted-foreground font-medium">Optional / Extra</span>
      </div>
    </div>
  );
};

export default memo(LegendNode);

