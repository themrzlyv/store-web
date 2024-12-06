import React, { ButtonHTMLAttributes } from "react";
import { tv, VariantProps } from "tailwind-variants";

export const buttonVariants = tv({
  base: "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  variants: {
    variant: {
      primary: "bg-primary-500 text-white hover:bg-primary-600 ",
      secondary:
        "bg-secondary-default text-white hover:bg-secondary-default/80 ",
      outline:
        "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
      ghost: "bg-transparent text-gray-700 dark:text-dark-light-gray hover:bg-gray-100 dark:hover:bg-dark-lighter  focus:ring-0 focus:ring-offset-0",
    },
    size: {
      sm: "px-3 py-1 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-5 py-3 text-lg",
    },
    isFullWidth: {
      true: "w-full",
      false: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    isFullWidth: false,
  },
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  size,
  isFullWidth,
  className,
  isLoading,
  ...props
}) => {
  return (
    <button
    {...props}
      className={buttonVariants({ variant, size, isFullWidth, className })}
      disabled={props.disabled || isLoading}
    >
      {isLoading && (
        <div className="h-5 w-5 border-2 border-t-transparent border-white  rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
};

export default Button;
