import { useEffect, useRef } from "react";
import {
  useGetPostDetailsQuery,
  useTrackingViewMutation,
} from "@/modules/blog/infra/post.api";

type Props = {
  slug: string;
};

export function usePostDetails({ slug }: Props) {
  const hasTrackedView = useRef(false);
  const [
    trackingViewMutation,
    { data: trackingData, isLoading: trackingLoading },
  ] = useTrackingViewMutation();
  const {
    data,
    isLoading: postDetailsLoading,
    isError,
  } = useGetPostDetailsQuery(
    { slug },
    {
      skip: !trackingData,
    }
  );

  useEffect(() => {
    if (!hasTrackedView.current) {
      trackingViewMutation({ slug });
      hasTrackedView.current = true;
    }
  }, [slug, trackingViewMutation]);

  return {
    isLoading: postDetailsLoading || trackingLoading,
    error: isError || !data,
    post: data?.post,
  };
}
