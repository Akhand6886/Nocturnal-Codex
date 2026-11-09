import { memo } from 'react';

const LegendNode = () => {
  return (
    <div className="p-3.5 rounded-xl border border-border bg-card shadow-xs select-none text-[11px] space-y-2 w-[180px]">
      <div className="font-bold text-foreground text-xs uppercase tracking-wider mb-2 font-mono">
        Map Legend
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block flex-shrink-0" />
        <span className="text-muted-foreground font-medium">Recommended</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block flex-shrink-0" />
        <span className="text-muted-foreground font-medium">Alternative</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground inline-block flex-shrink-0" />
        <span className="text-muted-foreground font-medium">Optional / Extra</span>
      </div>
    </div>
  );
};

export default memo(LegendNode);

