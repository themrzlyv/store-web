import { createApi } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/shared/data/constants";
import { SignInFormType } from "./types/sign-in-form";
import { customFetchBaseQuery } from "@/lib/custom-fetch-base-query";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customFetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
  }),
  endpoints: builder => ({
    userLogout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/sign-out",
        method: "POST",
      }),
    }),
    loginUser: builder.mutation<{ message: string }, SignInFormType>({
      query: data => ({
        url: "/auth/sign-in",
        method: "POST",
        body: data,
      }),
    }),
    // registerUser: builder.mutation<void, RegisterUserInputType>({
    //   query: data => ({
    //     url: "/auth/sign-up",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
  }),
});

export const {
  useUserLogoutMutation,
  useLoginUserMutation,
} = authApi;
