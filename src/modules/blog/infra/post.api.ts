import { createApi } from "@reduxjs/toolkit/query/react";
import { PostEntity } from "../domain/entities/post.entity";
import { DeletePostsInput } from "./types/delete-posts.input";
import { customFetchBaseQuery } from "@/lib/custom-fetch-base-query";
import { PostFormInputType } from "./types/post-form.input";
import { getVisitorId } from "@/lib/get-visitor-id";
import { VISITOR_ID_KEY } from "@/shared/data/constants";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: customFetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  }),
  tagTypes: ["GetPosts", "GetPostDetails"],
  endpoints: builder => ({
    createPost: builder.mutation<{ message: string }, PostFormInputType>({
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

    updatePost: builder.mutation<{ message: string }, PostFormInputType>({
      query: input => ({
        url: `/post`,
        method: "PUT",
        body: input,
      }),
      invalidatesTags: ["GetPosts"],
    }),

    likePost: builder.mutation<
      { message: string },
      { postId: number; isLiked: boolean; visitorId: string }
    >({
      query: input => ({
        url: `/post/like`,
        method: "PUT",
        body: input,
      }),
      invalidatesTags: ["GetPostDetails"],
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

    getPostDetails: builder.query<{ post: PostEntity }, { slug: string; visitorId?: string | null }>({
      query: arg => {
        const queryParam = new URLSearchParams({
          ...(arg.visitorId && { visitorId: arg.visitorId }),
        }).toString();
        return {
          url: `/post/${arg.slug}${queryParam ? `?${queryParam}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["GetPostDetails"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useDeletePostsMutation,
  useUpdatePostMutation,
  useGetPostDetailsQuery,
  useLikePostMutation,
} = postApi;
