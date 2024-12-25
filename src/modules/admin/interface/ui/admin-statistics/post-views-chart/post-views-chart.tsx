"use client";
import { useGetPageViewsQuery } from "@/modules/admin/infra/reports.api";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ToolTip } from "./tool-tip";

export function PostViewsChart() {
  const { data: posts } = useGetPageViewsQuery({ page: "/blog/" });

  const chartData = useMemo(() => {
    if (!posts || posts.data.length === 0) return [];

    return [...posts.data].map(post => ({
      name: post.x.split("/")[2],
      views: post.y,
    }));
  }, [posts]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#F6D466" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#F6D466" stopOpacity={1} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12, fill: "#999" }}
          tickLine={false}
        />
        <YAxis
          width={30}
          tickLine={false}
          tick={{ fontSize: 12, fill: "#999" }}
        />
        <Tooltip cursor={{ fill: "transparent" }} content={<ToolTip />} />
        <Bar
          type="monotone"
          dataKey="views"
          fill="url(#gradient1)"
          stroke="#F6D466"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
