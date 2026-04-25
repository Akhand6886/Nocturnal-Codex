import { BaseEdge, EdgeProps, getSmoothStepPath, getBezierPath } from '@xyflow/react';

export default function DottedEdge({
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
  // Using Bezier for dotted lines as they often curve more smoothly into subtopics in the image
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
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
          strokeDasharray: '4 4', // Creates the dotted effect
        }}
        className="roadmap-edge-dotted transition-all duration-300 hover:stroke-[3px]"
      />
    </>
  );
}
