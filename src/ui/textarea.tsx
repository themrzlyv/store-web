import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md px-3 py-2 text-base placeholder:text-neutral-500 outline-none ring-1 ring-primary-600/10 dark:ring-primary-200/15  md:text-sm  dark:placeholder:text-neutral-400 ",
        className
      )}
      ref={ref}
      {...props}
    />
  );
})
Textarea.displayName = "Textarea"

export { Textarea }
