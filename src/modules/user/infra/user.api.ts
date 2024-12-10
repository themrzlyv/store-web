import { createApi } from "@reduxjs/toolkit/query/react";
import { UserEntity } from "../domain/entities/user.entity";
import { customFetchBaseQuery } from "@/lib/custom-fetch-base-query";
import { API_URL } from "@/shared/data/constants";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: customFetchBaseQuery({
    baseUrl: API_URL,
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
