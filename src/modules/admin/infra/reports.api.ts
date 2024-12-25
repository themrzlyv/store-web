import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBaseQuery } from "@/lib/custom-fetch-base-query";
import {
  PageViewsEntity,
  StatisticEntity,
  TotalViewsEntity,
  VisitorSessionsEntity,
} from "@/lib/types";

export const reportsApi = createApi({
  reducerPath: "reportsApi",
  baseQuery: customFetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  }),
  endpoints: builder => ({
    getStatistics: builder.query<
      StatisticEntity,
      { pageUrl?: string; startAt?: string; endAt?: string }
    >({
      query: ({ pageUrl, startAt, endAt }) => {
        
        const queryParams = new URLSearchParams({
          ...(pageUrl && { pageUrl }),
          ...(startAt && { startAt }),
           ...(endAt && { endAt }),
        }).toString();

        return {
          url: `/statistics${queryParams ? `?${queryParams}` : ""}`,
          method: "GET",
        };
      },
    }),

    getPageViews: builder.query<
      { data: PageViewsEntity },
      { page?: string; type?: string }
    >({
      query: ({ page, type }) => {
        const queryParams = new URLSearchParams({
          ...(page && { page }),
          ...(type && { type }),
        }).toString();

        return {
          url: `/page-views${queryParams ? `?${queryParams}` : ""}`,
          method: "GET",
        };
      },
    }),

    getTotalViews: builder.query<TotalViewsEntity, string>({
      query: () => ({
        url: "/total-views",
        method: "GET",
      }),
    }),

    getSessions: builder.query<VisitorSessionsEntity, string>({
      query: () => ({
        url: "/sessions",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetStatisticsQuery,
  useGetPageViewsQuery,
  useGetTotalViewsQuery,
  useGetSessionsQuery,
} = reportsApi;
