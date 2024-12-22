"use client";
import { groupPostsByYearAndMonthMapper } from "@/modules/blog/infra/mappers/group-posts-by-month.mapper";
import { useGetPostsQuery } from "@/modules/blog/infra/post.api";
import { format, parse } from "date-fns";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ToolTip } from "./tool-tip";

export function PostsByMonthsChart() {
  const { data } = useGetPostsQuery({});

  const posts = useMemo(() => {
    if (!data?.posts?.length) return [];

    return groupPostsByYearAndMonthMapper(data.posts);
  }, [data?.posts]);

  const chartData = useMemo(() => {
    return posts.flatMap(group =>
      group.months.map(month => {
        const parsedDate = parse(
          `${month.month} ${group.year}`,
          "MMMM yyyy",
          new Date()
        );
        const formattedMonth = format(parsedDate, "MMM, yyyy");

        return {
          year: group.year,
          month: formattedMonth,
          count: month.count,
        };
      })
    );
  }, [posts]);


  const calculateMiddleTicks = (data: { views: number }[]) => {
    const allViews = data.map(item => item.views);
    const min = Math.min(...allViews);
    const max = Math.max(...allViews);

    if (allViews.length < 2) return [];

    const tick1 = Math.round(min + (max - min) / 3);
    const tick2 = Math.round(min + ((max - min) * 2) / 3);

    return [tick1, tick2];
  };

  const calculateXTicks = (data: { date: number }[]) => {
    if (data.length <= 3) return data.map(d => d.date);
    const step = Math.floor(data.length / 2);
    return [data[0].date, data[step].date, data[data.length - 1].date];
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData}>
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: "#999" }}
          // ticks={calculateXTicks(chartData)}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          // ticks={calculateMiddleTicks(chartData)}
          tickMargin={0}
          tick={{ fontSize: 12, fill: "#999" }}
          axisLine={false}
          tickLine={false}
          width={20}
        />
        <Tooltip cursor={{ fill: "transparent" }} content={<ToolTip />} />
        <Area
          type="monotone"
          dataKey="count"
          stroke="#64D6EE"
          fill="#64D6EE"
          fillOpacity={0.1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
