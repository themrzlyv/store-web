"use client";
import { useGetTotalViewsQuery } from "@/modules/admin/infra/reports.api";
import { QueryTypes } from "@/shared/query-types/query-types";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ToolTip } from "./tool-tip";

export function TotalViewsChart() {
  const { data: totalViews } = useGetTotalViewsQuery(QueryTypes.TOTAL_VIEWS);

  const [focusBar, setFocusBar] = useState<number | undefined>(undefined);

  const chartData = useMemo(() => {
    if (!totalViews || totalViews.pageviews.length === 0) return [];

    return totalViews.pageviews.map(view => {
      const session = totalViews.sessions.find(s => s.x === view.x);
      const dateObj = new Date(view.x);
      return {
        rawDate: dateObj,
        time: dateObj.toLocaleTimeString([], {
          hour: "numeric",
        }),
        date: dateObj.toLocaleDateString([], {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        pageviews: view.y,
        sessions: session?.y || 0,
      };
    });
  }, [totalViews]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        onMouseMove={state => {
          if (state.isTooltipActive) {
            setFocusBar(state.activeTooltipIndex);
          } else {
            setFocusBar(undefined);
          }
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          tick={{ fontSize: 12, fill: "#999" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#999" }}
          tickLine={false}
          width={20}
        />
        <Tooltip cursor={{ fill: "transparent" }} content={<ToolTip />} />

        <Bar
          dataKey="sessions"
          stroke="#F26B0F"
          fill="#F26B0F"
          stackId="a"
          fillOpacity={1}
        />
        <Bar dataKey="pageviews" stroke="#F26B0F" fill="#F26B0F" stackId="a">
          {chartData.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fillOpacity={focusBar === index ? 0.5 : 0.1}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
