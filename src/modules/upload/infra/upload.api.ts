import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBaseQuery } from "@/lib/custom-fetch-base-query";

export const uploadApi = createApi({
  reducerPath: "uploadApi",
  baseQuery: customFetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  }),
  endpoints: builder => ({
    uploadFile: builder.mutation<{ message: string, imageUrl: string }, FormData>({
      query: input => ({
        url: "/upload",
        method: "POST",
        body: input,
      }),
    }),
  }),
});

export const { useUploadFileMutation } = uploadApi;
