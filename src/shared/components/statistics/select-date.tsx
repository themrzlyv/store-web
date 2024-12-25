import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { addHours, getTime, startOfHour, subDays } from "date-fns";
import { Dispatch, SetStateAction } from "react";

enum SelectOptionsEnum {
  LAST_24_HOURS = "last_24_hours",
  ALL_TIME = "all_time",
}

type Props = {
  queryParams: {
    startAt?: string;
    endAt?: string;
  };
  setQueryParams: Dispatch<
    SetStateAction<{
      startAt?: string;
      endAt?: string;
    }>
  >;
  isLoading: boolean;
};

export function SelectDate({ queryParams, setQueryParams, isLoading }: Props) {
  const handleChangeDateRange = (value: SelectOptionsEnum) => {
    if (value === SelectOptionsEnum.LAST_24_HOURS) {
      const currentDate = new Date();
      const endAt = startOfHour(currentDate).setMinutes(59, 59, 999);

      const last24Hours = subDays(currentDate, 1);
      const startAt = addHours(startOfHour(last24Hours), 1);

      setQueryParams({
        ...queryParams,
        startAt: getTime(startAt).toString(),
        endAt: getTime(endAt).toString(),
      });
    }

    if (value === SelectOptionsEnum.ALL_TIME) {
      setQueryParams({});
    }
  };

  return (
    <Select
      defaultValue={SelectOptionsEnum.ALL_TIME}
      onValueChange={handleChangeDateRange}
      disabled={isLoading}
    >
      <SelectTrigger className="max-w-[180px]">
        <SelectValue placeholder="Select date" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={SelectOptionsEnum.ALL_TIME}>All time</SelectItem>
          <SelectItem value={SelectOptionsEnum.LAST_24_HOURS}>
            Last 24 hours
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
