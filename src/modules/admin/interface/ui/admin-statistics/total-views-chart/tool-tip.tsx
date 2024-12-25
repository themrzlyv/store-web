import { Typography } from "@/shared/components/typography/typography";
import { Dot } from "lucide-react";
import { TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

export function ToolTip({ active, payload }: TooltipProps<ValueType, NameType>) {
  if (active && payload && payload.length) {
    const { rawDate, sessions, pageviews } = payload[0].payload;

    const formattedTime = rawDate.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
    const formattedDate = rawDate.toLocaleDateString([], {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return (
      <div className="bg-dark-default text-white flex flex-col items-center bg-opacity-90 rounded-md p-3">
        <Typography element="p" className="p-0" variant="small-text">
          {formattedTime} - {formattedDate}
        </Typography>
        <Typography
          element="p"
          variant="small-text"
          className="p-0 flex items-center gap-1"
        >
          {`${pageviews} views`}
          <Dot width={16} height={16} className="text-green-500" />
          {`${sessions} visitors`}
        </Typography>
      </div>
    );
  }

  return null;
}
