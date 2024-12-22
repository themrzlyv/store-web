import { useGetPostDetailsQuery } from "@/modules/blog/infra/post.api";

type Props = {
  slug: string;
};

export function usePostDetails({ slug }: Props) {
  const {
    data,
    isLoading: postDetailsLoading,
    isError,
  } = useGetPostDetailsQuery({ slug });

  return {
    isLoading: postDetailsLoading,
    error: isError || !data,
    post: data?.post,
  };
}
