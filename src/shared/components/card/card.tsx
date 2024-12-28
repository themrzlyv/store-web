import React from "react";
import { Img } from "@/ui";
import { cn } from "@/lib/utils";
import { Typography } from "../typography/typography";

type CardContainerProps<T extends React.ElementType> = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  element?: T;
} & React.ComponentProps<T>;

function CardContainer<T extends React.ElementType = "div">({
  children,
  className,
  onClick,
  element,
  ...rest
}: CardContainerProps<T>) {
  const Element = element || "div";

  return (
    <Element
      onClick={onClick}
      className={cn(
        "flex gap-4 relative group cursor-pointer p-3 md:h-32 rounded-xl hover:bg-light-dark/50 dark:hover:bg-dark-lighter/50",
        className
      )}
      {...rest}
    >
      {children}
    </Element>
  );
}

const CardImage = ({
  src,
  width,
  height,
  alt,
  line,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  line?: boolean;
}) => (
  <div className="h-full w-full max-w-[110px]  flex flex-col items-center overflow-hidden">
    <Img
      src={src}
      width={width}
      height={height}
      alt={alt}
      className="rounded-md"
    />
    {line && <div className="w-[1px] h-full z-[-1] absolute bg-gray-400" />}
  </div>
);

const CardContent = ({
  title,
  content,
  subContent,
  className,
}: {
  title: string | React.ReactNode;
  content: string;
  subContent?: React.ReactNode | JSX.Element | JSX.Element[];
  className?: string;
}) => (
  <div
    className={cn(
      "flex flex-col h-full overflow-hidden",
      subContent ? "justify-between" : "",
      className,
    )}
  >
    {title && (
      <Typography
        element="h6"
        variant="card-title"
        className="flex items-center group-hover:underline dark:text-light-default"
      >
        {title}
      </Typography>
    )}
    {content && (
      <Typography element="p" variant="small-text" className="text-pretty">
        {content}
      </Typography>
    )}
    {subContent && <div className="flex items-center gap-2">{subContent}</div>}
  </div>
);

export const Card = Object.assign(CardContainer, {
  Image: CardImage,
  Content: CardContent,
});
