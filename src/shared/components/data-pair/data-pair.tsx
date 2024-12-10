import { Typography } from "../typography/typography";

type Props = {
  label: string;
  value: string;
};

export function DataPair({ label, value }: Props) {
  return (
    <div className="flex items-center justify-between">
      <Typography element="h6" variant="label">
        {label}
      </Typography>
      <Typography element="p" variant="small-text">
        {value}
      </Typography>
    </div>
  );
}
