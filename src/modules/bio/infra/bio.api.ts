import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBaseQuery } from "@/lib/custom-fetch-base-query";
import { BioEntity } from "../domain/entities/bio.entity";

export const bioApi = createApi({
  reducerPath: "bioApi",
  baseQuery: customFetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  }),
  tagTypes: ["GetBioInformation"],
  endpoints: builder => ({
    updateBio: builder.mutation<{ message: string }, FormData>({
      query: input => ({
        url: `/bio`,
        method: "PUT",
        body: input,
      }),
      invalidatesTags: ["GetBioInformation"],
    }),

    getBioInformation: builder.query<{ bio: BioEntity }, string>({
      query: () => ({
        url: `/bio`,
        method: "GET",
      }),
      providesTags: ["GetBioInformation"],
    }),
  }),
});

export const { useUpdateBioMutation, useGetBioInformationQuery } = bioApi;
