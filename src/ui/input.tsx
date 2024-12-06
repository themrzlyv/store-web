import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export const Input = forwardRef(function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>,
  ref?: React.Ref<HTMLInputElement>
) {
  const { className, ...rest } = props;
  return (
    <input
      ref={ref}
      className={cn(
        "ring-1 ring-primary-600/10 dark:ring-primary-200/15 outline-none px-3 py-3 placeholder:text-gray-400 file:border-0 file:bg-transparent rounded-lg max-w-md w-full mx-auto",
        className
      )}
      {...rest}
    />
  );
});
