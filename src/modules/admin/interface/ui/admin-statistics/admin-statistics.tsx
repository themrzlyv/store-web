"use client";
import { GeneralPieChart } from "./general-pie-chart";
import { PostsChart } from "./posts-chart";
import { PostViewsChart } from "./post-views-chart";
import { PostsByMonths } from "./posts-by-months";
import { Typography } from "@/shared/components/typography/typography";
import { useCurrentUserQuery } from "@/modules/user/infra/user.api";
import { DataPair } from "@/shared/components/data-pair/data-pair";

export function AdminStatistics() {
  const { data } = useCurrentUserQuery();

  const fullName = [data?.user.firstName, data?.user.lastName]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex w-full items-center gap-4">
        <div className="flex-1 flex flex-col gap-4 h-[380px] ">
          <div className="flex flex-col gap-4 p-5 dark:bg-dark-light shadow-sm rounded-lg h-1/2">
            <Typography element="p" variant="card-title">
              Admin Info
            </Typography>
            <div className="flex flex-col gap-2">
              <DataPair label="Email" value={data?.user.email || ""} />
              <DataPair label="Fullname" value={fullName} />
              <DataPair
                label="Role"
                value={data?.user.role.toLowerCase() || ""}
              />
            </div>
          </div>
          <div className="w-full h-1/2 flex flex-col gap-4 shadow-md dark:bg-dark-light px-5 py-5 rounded-lg">
            <Typography element="p" variant="card-title">
              Total Views
            </Typography>
            <PostsChart />
          </div>
        </div>
        <div className="flex-1 p-5 shadow-sm rounded-lg h-[380px] dark:bg-dark-light">
          <GeneralPieChart />
        </div>
        <div className="flex-1 shadow-sm rounded-lg h-[380px] dark:bg-dark-light">
          <PostsByMonths />
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 shadow-sm rounded-lg p-5 h-[380px] dark:bg-dark-light">
        <Typography element="p" variant="card-title">
          Last Posts Views
        </Typography>
        <PostViewsChart />
      </div>
    </div>
  );
}
