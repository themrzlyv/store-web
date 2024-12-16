import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBaseQuery } from "@/lib/custom-fetch-base-query";
import { ProjectEntity } from "../domain/entities/project.entity";
import { DeleteProjectsInput } from "./types/delete-projects.input";
import { ProjectFormInputType } from "./types/project-form.input";

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: customFetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  }),
  tagTypes: ["GetProjects"],
  endpoints: builder => ({
    createProject: builder.mutation<{ message: string }, ProjectFormInputType>({
      query: input => ({
        url: "/project",
        method: "POST",
        body: input,
      }),
      invalidatesTags: ["GetProjects"],
    }),

    deleteProjects: builder.mutation<{ message: string }, DeleteProjectsInput>({
      query: input => ({
        url: "/project",
        method: "DELETE",
        body: input,
      }),
      invalidatesTags: ["GetProjects"],
    }),

    updateProject: builder.mutation<{ message: string }, ProjectFormInputType>({
      query: input => ({
        url: `/project`,
        method: "PUT",
        body: input,
      }),
      invalidatesTags: ["GetProjects"],
    }),

    getProjects: builder.query<
      { projects: ProjectEntity[] },
      { isPublished?: boolean }
    >({
      query: arg => ({
        url: `/project${arg.isPublished ? "?isPublished=true" : ""}`,
        method: "GET",
      }),
      providesTags: ["GetProjects"],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useGetProjectsQuery,
  useDeleteProjectsMutation
} = projectApi;
