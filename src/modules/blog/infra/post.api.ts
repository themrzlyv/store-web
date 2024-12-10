import { createApi } from "@reduxjs/toolkit/query/react";
import { PostEntity } from "../domain/entities/post.entity";
import { DeletePostsInput } from "./types/delete-posts.input";
import { customFetchBaseQuery } from "@/lib/custom-fetch-base-query";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: customFetchBaseQuery({
    baseUrl: process.env.API_URL,
    credentials: "include",
  }),
  tagTypes: ["GetPosts", "GetPostDetails"],
  endpoints: builder => ({
    createPost: builder.mutation<{ message: string }, FormData>({
      query: input => ({
        url: "/post",
        method: "POST",
        body: input,
      }),
      invalidatesTags: ["GetPosts"],
    }),

    deletePosts: builder.mutation<{ message: string }, DeletePostsInput>({
      query: input => ({
        url: "/post",
        method: "DELETE",
        body: input,
      }),
      invalidatesTags: ["GetPosts"],
    }),

    updatePost: builder.mutation<{ message: string }, FormData>({
      query: input => ({
        url: `/post`,
        method: "PUT",
        body: input,
      }),
      invalidatesTags: ["GetPosts"],
    }),

    getPosts: builder.query<{ posts: PostEntity[] }, { isPublished?: boolean }>(
      {
        query: arg => ({
          url: `/post${arg.isPublished ? "?isPublished=true" : ""}`,
          method: "GET",
        }),
        providesTags: ["GetPosts"],
      }
    ),

    getPostDetails: builder.query<{ post: PostEntity }, { slug: string }>({
      query: arg => ({
        url: `/post/${arg.slug}`,
        method: "GET",
      }),
      providesTags: ["GetPostDetails"],
    }),

    trackingView: builder.mutation<{ post: PostEntity }, { slug: string }>({
      query: arg => ({
        url: `/post/${arg.slug}/tracking-view`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useDeletePostsMutation,
  useUpdatePostMutation,
  useGetPostDetailsQuery,
  useTrackingViewMutation,
} = postApi;
