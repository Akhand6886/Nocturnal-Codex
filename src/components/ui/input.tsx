import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-[#272727] bg-[#181818] px-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors duration-200 focus-visible:outline-none focus-visible:border-[#E5A93C] focus-visible:ring-1 focus-visible:ring-[#E5A93C]/30 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
