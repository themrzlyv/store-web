import { createApi } from "@reduxjs/toolkit/query/react";
import { UserEntity } from "../domain/entities/user.entity";
import { customFetchBaseQuery } from "@/lib/custom-fetch-base-query";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: customFetchBaseQuery({
    baseUrl: process.env.API_URL,
    credentials: "include",
  }),
  endpoints: builder => ({
    currentUser: builder.query<{ user: UserEntity }, void>({
      query: () => ({
        url: "/user/current-user",
        method: "GET",
      }),
    }),
  }),
});

export const { useCurrentUserQuery } = userApi;
