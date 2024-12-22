import { cn } from "@/lib/utils";
import { useGetStatisticsQuery } from "@/modules/admin/infra/reports.api";
import { QueryTypes } from "@/shared/query-types/query-types";
import { useMemo } from "react";
import { Typography } from "../typography/typography";

export function Statistics() {
  const { data: statsData } = useGetStatisticsQuery(QueryTypes.STATISTICS);

  const statistics = useMemo(() => {
    if (!statsData) return [];

    const { pageviews, visitors, visits } = statsData;

    return [
      {
        label: "Total Views",
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

  return (
    <>
      {statistics.map((item, index) => (
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
            className={cn(item.color)}
          >
            {item.view.value}
          </Typography>
        </div>
      ))}
    </>
  );
}
