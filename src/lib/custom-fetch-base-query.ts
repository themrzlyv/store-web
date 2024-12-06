import {
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import type { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query";

export const customFetchBaseQuery = (
  options: Parameters<typeof fetchBaseQuery>[0]
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  const baseQuery = fetchBaseQuery(options);

  return async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error) {
      const errorMessage =
        (result.error.data as { message?: string })?.message ||
        "An error occurred";
      toast.error(errorMessage);
    } else if ((result.data as { message?: string })?.message) {
      const successMessage = (result.data as { message?: string })?.message;
      toast.success(successMessage);
    }

    return result;
  };
};
