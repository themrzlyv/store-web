"use client";
import { useGetPostsQuery } from "@/modules/blog/infra/post.api";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function PostsChart() {
  const { data: posts } = useGetPostsQuery({});

  const formatMonthYear = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
    };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
  };

  const postData = useMemo(() => {
    if (!posts) return [];

    return [...posts.posts].reduce<Record<string, number>>((acc, post) => {
      const monthYear = formatMonthYear(String(post.createdAt));
      acc[monthYear] = (acc[monthYear] || 0) + post.views;
      return acc;
    }, {});
  }, [posts]);

  const chartData = Object.entries(postData).map(([month, totalViews]) => ({
    month,
    views: totalViews,
  }));

  const calculateMiddleTicks = (data: { views: number }[]) => {
    const allViews = data.map(item => item.views);
    const min = Math.min(...allViews);
    const max = Math.max(...allViews);

    if (allViews.length < 2) return [];

    const tick1 = Math.round(min + (max - min) / 3);
    const tick2 = Math.round(min + ((max - min) * 2) / 3);

    return [tick1, tick2];
  };

  const calculateXTicks = (data: { month: string }[]) => {
    if (data.length <= 3) return data.map(d => d.month); // Show all if <= 3
    const step = Math.floor(data.length / 2); // Divide into 2 parts for 3 ticks
    return [data[0].month, data[step].month, data[data.length - 1].month];
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData}>
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: "#999" }}
          ticks={calculateXTicks(chartData)}
          axisLine={false} // Hides the axis line
          tickLine={false}
          reversed
        />
        <YAxis
          ticks={calculateMiddleTicks(chartData)}
          tickMargin={0}
          tick={{ fontSize: 12, fill: "#999" }}
          axisLine={false} // Hides the axis line
          tickLine={false}
          width={20}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="views"
          stroke="#64D6EE"
          fill="#64D6EE"
          fillOpacity={0.1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
