import { BaseEdge, EdgeProps, getSmoothStepPath } from '@xyflow/react';

export default function RoadmapEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 16,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: 3,
          stroke: 'hsl(var(--rm-edge))',
        }}
        className="roadmap-edge-path transition-all duration-300 hover:stroke-primary hover:stroke-[4px]"
      />
    </>
  );
}
