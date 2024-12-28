"use client";
import { useGetPostsQuery } from "@/modules/blog/infra/post.api";
import { PostItem } from "../post-item/post-item";
import { useMemo } from "react";
import { groupPostsMapper } from "@/modules/blog/infra/mappers/group-posts.mapper";
import { Typography } from "@/shared/components/typography/typography";
import { PostEntity } from "@/modules/blog/domain/entities/post.entity";
import { GroupedPostValueObject } from "@/modules/blog/domain/value-objects/groupped-post.value-object";
import { Skeleton } from "@/ui/skeleton";
import { PostItemSkeleton } from "@/shared/components/post-item-skeleton/post-item-skeleton";
import { EmptyContent } from "@/shared/components/empty-content/empty-content";

type Props = {
  groupped?: boolean;
  showEmptyText?: boolean;
};

export function Posts({ groupped = false, showEmptyText = true }: Props) {
  const { data, isLoading } = useGetPostsQuery({ isPublished: true });

  const posts = useMemo(() => {
    if (!data?.posts?.length) return [];

    if (!groupped) return data.posts;

    return groupPostsMapper(data.posts);
  }, [data?.posts, groupped]);

  if (!data || isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {groupped && (
          <div className="flex items-end gap-2 w-full">
            <Skeleton className="w-16 h-6" />
            <Skeleton className="flex-1 h-1" />
          </div>
        )}
        {Array.from({ length: 3 }).map((_, index) => (
          <PostItemSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (posts.length === 0 && showEmptyText) {
    return <EmptyContent title="Sorry, there are no posts yet." />;
  }

  if (!groupped) {
    return (
      <>
        {(posts as PostEntity[]).slice(0,3).map((post, index) => (
          <PostItem key={index} post={post} />
        ))}
      </>
    );
  }

  return (
    <>
      {(posts as GroupedPostValueObject[]).map(
        ({ year, posts: postsInYear }, index) => (
          <div key={index} className="flex flex-col gap-4 ">
            <div className="flex items-end gap-4 w-full">
              <Typography
                element="h4"
                variant="section-title"
                className="font-bold"
              >
                {year}
              </Typography>
              <div className="w-full h-[1px] bg-dark-light-gray" />
            </div>
            {postsInYear.map(post => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        )
      )}
    </>
  );
}
