"use client";
import { useGetPostsQuery } from "@/modules/blog/infra/post.api";
import { useGetExperiencesQuery } from "@/modules/experiences/infra/experience.api";
import { useGetProjectsQuery } from "@/modules/projects/infra/project.api";
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
  value: string;
};

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
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
      fontSize={16}
    >
      {value}
    </text>
  );
};

const COLORS = ["#0A5EB0", "#D91656", "#EB5B00"];

export function GeneralPieChart() {
  const { data: posts } = useGetPostsQuery({});
  const { data: projects } = useGetProjectsQuery({});
  const { data: experiences } = useGetExperiencesQuery(QueryTypes.EXPERIENCES);

  const pieData = useMemo(() => {
    return [
      {
        name: "Posts",
        value: posts?.posts.length || 0,
      },
      {
        name: "Projects",
        value: projects?.projects.length || 0,
      },
      {
        name: "Experiences",
        value: experiences?.experiences.length || 0,
      },
    ];
  }, [posts, projects, experiences]);

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
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
