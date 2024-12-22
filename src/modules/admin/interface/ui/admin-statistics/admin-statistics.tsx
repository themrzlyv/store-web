"use client";
import { GeneralPieChart } from "./general-pie-chart";
import { TotalViewsChart } from "./total-views-chart/total-views-chart";
// import { PostsByMonths } from "./posts-by-months";
import { Typography } from "@/shared/components/typography/typography";
import { Statistics } from "@/shared/components/statistics/statistics";
import { SessionsTable } from "./sessions-table/sessions-table";
import { CountriesTable } from "./countries-table/countries-table";
import { PostsByMonthsChart } from "./posts-by-months-chart/posts-by-months-chart";

export function AdminStatistics() {
  return (
    <div className="w-full h-full flex flex-wrap gap-4">
      <div className="w-full flex gap-4">
        <div className="flex-1 bg-light-default dark:bg-dark-light rounded-md shadow-sm p-3">
          <div>
            <Typography element="h4" variant="card-title">
              Reports
            </Typography>
            <Typography
              element="p"
              variant="small-text"
              className="text-gray-500"
            >
              Statistics and reports for the website
            </Typography>
          </div>
          <div className="w-full flex flex-wrap justify-between gap-3 mt-3">
            <Statistics />
          </div>
          <div className="w-full h-[300px] mt-8">
            <TotalViewsChart />
          </div>
        </div>
        <div className="w-4/12 flex flex-col gap-4">
          <div className="w-full max-h-[246px] h-full bg-light-default dark:bg-dark-light rounded-md ">
            <PostsByMonthsChart />
          </div>
          <div className="w-full flex-1 overflow-scroll p-3 gap-3 flex flex-col bg-light-default dark:bg-dark-light rounded-md ">
            <CountriesTable />
          </div>
        </div>
      </div>
      <div className="w-full flex gap-4">
        <div className="flex-1 p-3 flex flex-col gap-3 bg-light-default dark:bg-dark-light rounded-md">
          <SessionsTable />
        </div>
        <div className="w-4/12 h-[400px] bg-light-default dark:bg-dark-light rounded-md">
          <GeneralPieChart />
        </div>
      </div>
    </div>
  );
}
