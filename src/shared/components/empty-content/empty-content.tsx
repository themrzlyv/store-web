import { EmptyIcon } from "@/shared/icons";
import { Typography } from "../typography/typography";

type Props = {
  title: string;
  description?: string;
};

export function EmptyContent({ title, description }: Props) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center">
        <EmptyIcon />
        <Typography
          element="p"
          variant="section-title"
          className="text-primary-400"
        >
          {title}
        </Typography>
        {description && (
          <Typography
            element="p"
            variant="content-text"
            className="text-gray-500"
          >
            {description}
          </Typography>
        )}
      </div>
    </div>
  );
}
