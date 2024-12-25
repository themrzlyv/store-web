"use client";
import { useGetPageViewsQuery } from "@/modules/admin/infra/reports.api";
import { Typography } from "@/shared/components/typography/typography";
import { menuRoutes } from "@/shared/data/routes";
import { Dot } from "lucide-react";
import { useMemo } from "react";
import {
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  LegendProps,
} from "recharts";
import { Payload } from "recharts/types/component/DefaultLegendContent";

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

const CustomLegend = (props: LegendProps) => {
  const { payload } = props;
  return (
    <ul className="flex items-center justify-center gap-2 mt-3">
      {payload && payload.map((entry: Payload, index: number) => (
        <li
          key={`item-${index}`}
          style={{ color: entry.color }}
          className="flex items-center justify-center"
        >
          <Dot style={{ color: entry.color }} />
          <Typography element="p" variant="small-bold" className="capitalize">
            {entry.value}
          </Typography>
        </li>
      ))}
    </ul>
  );
};

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
    <ResponsiveContainer width="100%" height="80%">
      <PieChart width={400} height={400}>
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
          outerRadius={100}
          innerRadius={60}
          fill="#8884d8"
          dataKey="value"
          paddingAngle={3}
          stroke="none"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip wrapperClassName="capitalize text-sm" />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );
}
