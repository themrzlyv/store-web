import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBaseQuery } from "@/lib/custom-fetch-base-query";
import { ExperienceEntity } from "../domain/entities/experience.entity";
import { DeleteExperiencesInput } from "./types/delete-experiences.input";
import { compareDesc, parseISO } from "date-fns";
import { ExperienceFormInputType } from "./types/experience-form.input";

export const experienceApi = createApi({
  reducerPath: "experienceApi",
  baseQuery: customFetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  }),
  tagTypes: ["GetExperiences"],
  endpoints: builder => ({
    createExperience: builder.mutation<
      { message: string },
      ExperienceFormInputType
    >({
      query: input => ({
        url: "/experience",
        method: "POST",
        body: input,
      }),
      invalidatesTags: ["GetExperiences"],
    }),

    deleteExperiences: builder.mutation<
      { message: string },
      DeleteExperiencesInput
    >({
      query: input => ({
        url: "/experience",
        method: "DELETE",
        body: input,
      }),
      invalidatesTags: ["GetExperiences"],
    }),

    updateExperience: builder.mutation<
      { message: string },
      ExperienceFormInputType
    >({
      query: input => ({
        url: `/experience`,
        method: "PUT",
        body: input,
      }),
      invalidatesTags: ["GetExperiences"],
    }),

    getExperiences: builder.query<{ experiences: ExperienceEntity[] }, string>({
      query: () => ({
        url: `/experience`,
        method: "GET",
      }),
      providesTags: ["GetExperiences"],
      transformResponse: (response: {
        experiences: ExperienceEntity[];
      }): { experiences: ExperienceEntity[] } => {
        const sortedExperiences = [...response.experiences].sort((a, b) => {
          const endDateA = a.endDate ? parseISO(String(a.endDate)) : new Date();
          const endDateB = b.endDate ? parseISO(String(b.endDate)) : new Date();

          const endComparison = compareDesc(endDateA, endDateB);
          if (endComparison !== 0) return endComparison;

          const startDateA = parseISO(String(a.startDate));
          const startDateB = parseISO(String(b.startDate));
          return compareDesc(startDateA, startDateB);
        });

        return { experiences: sortedExperiences };
      },
    }),
  }),
});

export const {
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useGetExperiencesQuery,
  useDeleteExperiencesMutation,
} = experienceApi;
