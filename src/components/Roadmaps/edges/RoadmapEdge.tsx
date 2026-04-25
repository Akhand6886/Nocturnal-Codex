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
    borderRadius: 8, // Smaller border radius for sharper lines like the image
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: 2,
          stroke: 'hsl(var(--rm-edge))',
        }}
        className="roadmap-edge-path transition-all duration-300 hover:stroke-[3px]"
      />
    </>
  );
}
