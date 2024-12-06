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

export function PostViewsChart() {
  const { data: posts } = useGetPostsQuery({});

  const chartData = useMemo(() => {
    if (!posts) return [];

    return [...posts.posts].map(post => ({
      name: post.title,
      views: post.views,
    }));
  }, [posts]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#F6D466" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#F6D466" stopOpacity={1} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#999" }} />
        <YAxis width={30} axisLine={false} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="views"
          fill="url(#gradient1)"
          stroke="#F6D466"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
