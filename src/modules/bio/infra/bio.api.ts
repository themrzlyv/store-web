import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBaseQuery } from "@/lib/custom-fetch-base-query";
import { BioEntity } from "../domain/entities/bio.entity";
import { API_URL } from "@/shared/data/constants";

console.log(API_URL, "process.env.API_URL");

export const bioApi = createApi({
  reducerPath: "bioApi",
  baseQuery: customFetchBaseQuery({
    baseUrl: API_URL,
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
