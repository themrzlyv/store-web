import Button from "@/ui/button";
import { Typography } from "../typography/typography";
import React from "react";

function SectionContainer({ children }: React.PropsWithChildren) {
  return <section className="flex flex-col gap-6">{children}</section>;
}

type SectionHeaderProps = {
  title: string;
  action?: {
    icon?: React.FC<{
      width?: number | string;
      height?: number | string;
    }>;
    title?: string;
    onClick?: () => void;
  };
  subActions?: React.ReactNode[];
};

function SectionHeader({
  title,
  action,
  subActions,
}: React.PropsWithChildren<SectionHeaderProps>) {
  return (
    <div className="flex justify-between items-center">
      <Typography element="h4" variant="section-title">
        {title}
      </Typography>
      <div className="flex items-center gap-2">
        {action && (
          <Button
            variant="primary"
            size="sm"
            type="button"
            className="font-bold flex items-center gap-1"
            onClick={() => action?.onClick && action.onClick()}
          >
            {action?.icon && <action.icon width={16} height={16} />}
            {action?.title && (
              <Typography element="p" variant="menu-text">
                {action.title}
              </Typography>
            )}
          </Button>
        )}
        {subActions &&
          subActions.map((action, index) => {
            return <React.Fragment key={index}>{action}</React.Fragment>;
          })}
      </div>
    </div>
  );
}

function SectionBody({ children }: React.PropsWithChildren) {
  return <div className="flex flex-col gap-2">{children}</div>;
}

export const Section = Object.assign(SectionContainer, {
  Header: SectionHeader,
  Body: SectionBody,
});
