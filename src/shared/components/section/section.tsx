import { Typography } from "../typography/typography";

function SectionContainer({ children }: React.PropsWithChildren) {
  return <section className="flex flex-col gap-6">{children}</section>;
}

function SectionHeader({
  title,
  action,
}: React.PropsWithChildren<{ title: string; action?: React.ReactNode }>) {
  return (
    <div className="flex justify-between items-center">
      <Typography element="h2" variant="section-title">
        {title}
      </Typography>
      {action && action}
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
