import { getVisitorId } from "@/lib/get-visitor-id";
import {
  useGetPostDetailsQuery,
  useLikePostMutation,
} from "@/modules/blog/infra/post.api";
import { useEffect, useState } from "react";

type Props = {
  slug: string;
};

export function usePostDetails({ slug }: Props) {
  const [visitorId, setVisitorId] = useState<string | null>(null);

  useEffect(() => {
    getVisitorId().then(id => setVisitorId(id));
  }, []);

  const {
    data,
    isLoading: postDetailsLoading,
    isError,
  } = useGetPostDetailsQuery({ slug, visitorId }, { skip: !visitorId });

  const [likePostMutation] = useLikePostMutation();

  const handleLikePost = async () => {
    if (data?.post && visitorId) {
      likePostMutation({
        postId: data?.post.id,
        isLiked: !data?.post.isLiked,
        visitorId,
      });

      return;
    }
  };

  return {
    isLoading: postDetailsLoading,
    error: isError || !data,
    post: data?.post,
    handleLikePost,
    isLiked: data?.post?.isLiked,
  };
}
