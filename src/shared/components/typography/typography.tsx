import React from "react";
import { tv } from "tailwind-variants";
import { cn } from "@/lib/utils";

type TypographyProps<T extends React.ElementType> = {
  variant?:
    | "content-text"
    | "link"
    | "section-title"
    | "big-heading"
    | "card-title"
    | "label"
    | "logo-text"
    | "small-text";
  element?: T;
  className?: string;
  children: React.ReactNode;
} & React.ComponentProps<T>;

const typographyVariants = tv({
  variants: {
    variant: {
      "content-text":
        "text-lg text-pretty font-normal w-fit dark:text-dark-light-gray",
      link: "text-primary-500 underline text-lg font-medium",
      "section-title": "text-2xl fond-bold dark:text-light-default",
      "big-heading": "text-4xl font-bold dark:text-dark-light-gray",
      "card-title": "text-xl font-medium dark:text-light-default",
      label: "text-lg font-medium  dark:text-dark-light-gray",
      "logo-text": "text-xl font-semibold dark:text-dark-light-gray",
      "menu-text": "text-lg font-medium dark:text-dark-light-gray",
      "small-text": "text-md font-normal dark:text-dark-light-gray"
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
