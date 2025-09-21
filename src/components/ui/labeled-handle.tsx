"use client";

import { Handle } from "@xyflow/react";
import type { ComponentProps } from "react";
import { memo } from "react";

import { cn } from "@/lib/utils";

type HandleProps = ComponentProps<typeof Handle>;

export const LabeledHandle = memo(({ id, ...props }: HandleProps) => {
  return <Handle id={id} {...props} />;
});

LabeledHandle.displayName = "LabeledHandle";
