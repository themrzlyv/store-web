import Button from "@/ui/button";
import { Typography } from "../typography/typography";

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
    title: string;
    onClick: () => void;
  };
};

function SectionHeader({
  title,
  action,
}: React.PropsWithChildren<SectionHeaderProps>) {
  return (
    <div className="flex justify-between items-center">
      <Typography element="h4" variant="section-title">
        {title}
      </Typography>
      {action && (
        <Button
          variant="primary"
          size="sm"
          className="font-bold flex items-center gap-1"
          onClick={() => action.onClick()}
        >
          {action.icon && <action.icon width={18} height={18} />}
          <Typography element="p" variant="menu-text">
            {action.title}
          </Typography>
        </Button>
      )}
    </div>
  );
}

function SectionBody({ children }: React.PropsWithChildren) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

export const Section = Object.assign(SectionContainer, {
  Header: SectionHeader,
  Body: SectionBody,
});
