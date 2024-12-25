import { Typography } from "@/shared/components/typography/typography";
import { Dot } from "lucide-react";
import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

export function ToolTip({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) {
  if (active && payload && payload.length) {
    const { name, views } = payload[0].payload;

    return (
      <div className="bg-dark-default text-white flex flex-col items-center bg-opacity-90 rounded-md p-3">
        <Typography element="p" variant="small-text">
          {name && name.slice(0, 10) + "..."}
        </Typography>
        <Typography
          element="p"
          variant="small-text"
          className="p-0 flex items-center gap-1"
        >
          <Dot width={16} height={16} className="text-green-500" />
          {`${views} views`}
        </Typography>
      </div>
    );
  }

  return null;
}
