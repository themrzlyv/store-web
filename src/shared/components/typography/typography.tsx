import React from "react";
import { tv } from "tailwind-variants";
import { cn } from "@/lib/utils";

type TypographyProps<T extends React.ElementType> = {
  variant?:
    | "content-text"
    | "link"
    | "section-title"
    | "card-title"
    | "label"
    | "logo-text"
    | "small-text"
    | "small-medium"
    | "small-bold";
  element?: T;
  className?: string;
  children: React.ReactNode;
} & React.ComponentProps<T>;

const typographyVariants = tv({
  variants: {
    variant: {
      "content-text":
        "text-base text-pretty font-medium dark:text-dark-light-gray",
      link: "text-primary-500 underline text-base font-medium",
      "section-title": "text-lg font-semibold dark:text-light-default",
      "card-title": "text-base font-medium dark:text-light-default",
      label: "text-sm font-normal  dark:text-dark-light-gray",
      "logo-text": "text-base font-semibold dark:text-dark-light-gray",
      "menu-text": "text-base font-semibold dark:text-dark-light-gray",
      "small-text": "text-sm font-normal dark:text-dark-light-gray",
      "small-medium": "text-sm font-medium dark:text-dark-light-gray",
      "small-bold": "text-sm font-semibold dark:text-dark-light-gray",
    },
  },
  defaultVariants: {
    variant: "content-text",
  },
});

export function Typography<T extends React.ElementType = "p">({
  element,
  variant = "content-text",
  children,
  className,
  ...rest
}: TypographyProps<T>) {
  const Element = element || "p";
  const typographyClasses = typographyVariants({ variant });

  return (
    <Element className={cn(typographyClasses, className)} {...rest}>
      {children}
    </Element>
  );
}
