"use client";

import type { ComponentProps, PropsWithChildren } from "react";
import { memo } from "react";

import { cn } from "@/lib/utils";

type BaseNodeProps = PropsWithChildren<{
  label?: string;
  variant?: "default" | "primary" | "secondary" | "purple";
  className?: string;
}>;

const variantClasses = {
  default:
    "bg-orange-100 text-orange-900 border-orange-200 dark:bg-yellow-900/30 dark:text-yellow-200 dark:border-yellow-800/50",
  primary:
    "bg-yellow-300 text-yellow-900 border-yellow-400/80 dark:bg-yellow-500 dark:text-yellow-950 dark:border-yellow-600",
  secondary:
    "bg-white text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700",
  purple:
    "bg-purple-200 text-purple-900 border-purple-300 dark:bg-purple-900/50 dark:text-purple-200 dark:border-purple-800/60",
};

export const BaseNode = memo(
  ({
    label,
    variant = "default",
    children,
    className,
  }: BaseNodeProps) => {
    return (
      <div
        className={cn(
          "rounded-lg border p-2.5 text-center text-xs font-medium shadow-sm sm:text-sm",
          variantClasses[variant],
          className
        )}
      >
        {label || children}
      </div>
    );
  }
);

BaseNode.displayName = "BaseNode";
