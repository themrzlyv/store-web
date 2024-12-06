import React from "react";
import { Img } from "@/ui";
import { cn } from "@/lib/utils";

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
        "flex gap-4 relative group cursor-pointer p-3 h-32 rounded-xl hover:bg-light-dark/50 dark:hover:bg-dark-lighter/50",
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
  <div className="h-full overflow-hidden flex flex-col items-center">
    <Img src={src} width={width} height={height} alt={alt} />
    {line && <div className="w-[1px] h-full z-[-1] absolute bg-gray-400" />}
  </div>
);

const CardContent = ({
  title,
  content,
  subContent,
}: {
  title: string | React.ReactNode;
  content: string;
  subContent?: React.ReactNode | JSX.Element | JSX.Element[];
}) => (
  <div
    className={cn(
      subContent ? "justify-between" : "justify-center",
      "flex flex-col h-full"
    )}
  >
    {title && (
      <h4 className="text-xl flex items-center group-hover:underline font-medium dark:text-light-default">
        {title}
      </h4>
    )}
    {content && (
      <p className="text-lg text-pretty dark:text-dark-light-gray">{content}</p>
    )}
    {subContent && <div className="flex items-center gap-2">{subContent}</div>}
  </div>
);

export const Card = Object.assign(CardContainer, {
  Image: CardImage,
  Content: CardContent,
});
