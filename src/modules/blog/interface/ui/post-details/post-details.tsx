"use client";
import { formatDate } from "@/lib/utils";
import {
  useGetPostDetailsQuery,
  useTrackingViewMutation,
} from "@/modules/blog/infra/post.api";
import { Section } from "@/shared/components/section/section";
import { Typography } from "@/shared/components/typography/typography";
import { Img } from "@/ui";
import { useEffect, useRef } from "react";

type Props = {
  slug: string;
};

export function PostDetails({ slug }: Props) {
  const hasTrackedView = useRef(false);
  const [trackingViewMutation, { data: trackingData, isLoading: trackingLoading }] =
    useTrackingViewMutation();
  const { data, isLoading, isError } = useGetPostDetailsQuery(
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

  if (isLoading || trackingLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Not found</div>;
  }

  return (
    <Section>
      <Section.Header title="Post Details" />
      <div className={`flex flex-col gap-8`}>
        <div className="w-full rounded-xl relative shadow-md overflow-hidden">
          <Img
            src={data.post.image!}
            alt={data.post.title}
            width={700}
            height={475}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
        <Typography element="h4" variant="card-title" className="text-pretty">
          {data.post.title}
        </Typography>
        <div className="flex items-center justify-between">
          <Typography
            element="p"
            variant="small-text"
            className="italic text-gray-500"
          >
            {formatDate(data.post.createdAt, true)}
          </Typography>
          <Typography
            element="p"
            variant="small-text"
            className="text-gray-500"
          >
            {data.post.views} views
          </Typography>
        </div>
        <Typography element="p" variant="content-text">
          {data.post.content}
        </Typography>
      </div>
    </Section>
  );
}
