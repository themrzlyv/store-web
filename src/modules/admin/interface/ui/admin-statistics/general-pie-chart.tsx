"use client";
import { useGetPageViewsQuery } from "@/modules/admin/infra/reports.api";
import { menuRoutes } from "@/shared/data/routes";
import { QueryTypes } from "@/shared/query-types/query-types";
import { useMemo } from "react";
import {
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

type RenderLabelParams = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
};

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: RenderLabelParams) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={14}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const COLORS = ["#0A5EB0", "#D91656", "#EB5B00", "#FCC737"];

export function GeneralPieChart() {
  const { data: pageViews } = useGetPageViewsQuery({});


  const pieData = useMemo(() => {
    if (!pageViews || pageViews.data.length === 0) return [];

    return [...pageViews.data]
      .filter(item =>
        ["/", ...menuRoutes.map(route => route.path)].includes(item.x)
      )
      .map(item => ({
        name: item.x === "/" ? "home" : item.x.slice(1),
        value: item.y,
      }));
  }, [pageViews]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={800} height={800}>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={entry =>
            renderCustomizedLabel({
              ...entry,
              name: entry.name,
              value: entry.value,
            })
          }
          outerRadius={140}
          innerRadius={85}
          fill="#8884d8"
          dataKey="value"
          paddingAngle={3}
          stroke="none"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip wrapperClassName="capitalize" />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
