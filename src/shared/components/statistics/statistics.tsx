import { cn } from "@/lib/utils";
import { useGetStatisticsQuery } from "@/modules/admin/infra/reports.api";
import { useMemo, useState } from "react";
import { Typography } from "../typography/typography";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { SelectDate } from "./select-date";
import { Skeleton } from "@/ui/skeleton";

export function Statistics() {
  const [queryParams, setQueryParams] = useState<{
    startAt?: string;
    endAt?: string;
  }>({});
  const { data: statsData, isFetching } = useGetStatisticsQuery(queryParams);

  const statistics = useMemo(() => {
    if (!statsData) return [];

    const { pageviews, visitors, visits } = statsData;

    return [
      {
        label: "Views",
        view: pageviews,
        "bg-color": "bg-green-500",
        color: "text-green-500",
      },
      {
        label: "Visitors",
        view: visitors,
        "bg-color": "bg-secondary-default",
        color: "text-secondary-default",
      },
      {
        label: "Visits",
        view: visits,
        "bg-color": "bg-cyan-500",
        color: "text-cyan-500",
      },
    ];
  }, [statsData]);

  const calculatePercentage = (item: (typeof statistics)[0]) => {
    if (item.view.prev === 0) return null;
    const difference = Math.abs(item.view.value - item.view.prev);
    const percentageChange = ((difference / item.view.prev) * 100).toFixed(1);

    const icon =
      difference > 0 ? (
        <FaArrowTrendUp size="15" />
      ) : (
        <FaArrowTrendDown size="15" />
      );

    return (
      <span className="flex items-center gap-2 text-sm">
        {icon}
        {percentageChange} %
      </span>
    );
  };

  return (
    <div className="w-full flex flex-wrap items-center justify-between">
      <div className="w-full flex justify-end mb-2">
        <SelectDate
          queryParams={queryParams}
          setQueryParams={setQueryParams}
          isLoading={isFetching}
        />
      </div>
      {isFetching
        ? Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="w-56 h-20" />
          ))
        : statistics.map((item, index) => (
            <div
              key={index}
              className={cn(
                "w-56 h-20 flex flex-col relative overflow-hidden justify-center rounded-lg p-3 bg-opacity-20",
                item["bg-color"]
              )}
            >
              <div
                className={cn(
                  "absolute top-[-25px] right-[-25px] w-14 h-14 rounded-full bg-opacity-70 backdrop-blur-sm blur-sm",
                  item["bg-color"]
                )}
              />
              <Typography element="p" variant="card-title" className="text-sm">
                {item.label}
              </Typography>
              <Typography
                element="p"
                variant="section-title"
                className={cn(item.color, "flex items-center justify-between")}
              >
                {item.view.value} {calculatePercentage(item)}
              </Typography>
            </div>
          ))}
    </div>
  );
}
