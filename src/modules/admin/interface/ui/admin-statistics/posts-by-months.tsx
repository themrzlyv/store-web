"use client";
import { groupPostsByYearAndMonthMapper } from "@/modules/blog/infra/mappers/group-posts-by-month.mapper";
import { useGetPostsQuery } from "@/modules/blog/infra/post.api";
import { Typography } from "@/shared/components/typography/typography";
import { Dot } from "lucide-react";
import { useMemo } from "react";

export function PostsByMonths() {
  const { data } = useGetPostsQuery({});

  const posts = useMemo(() => {
    if (!data?.posts?.length) return [];

    return groupPostsByYearAndMonthMapper(data.posts);
  }, [data?.posts]);

  return (
    <div className="w-full h-full flex flex-col gap-5  p-5">
      <Typography element="p" variant="card-title">
        Posts by Months
      </Typography>
      {posts.map(post => (
        <div key={post.year} className="flex flex-col gap-3">
          <Typography element="h6" variant="card-title">
            {post.year}
          </Typography>
          <div className="flex flex-col gap-1">
            {post.months.map((month, index) => (
              <div
                key={index}
                className="flex items-center pb-2 justify-between border-b border-gray-300"
              >
                <Typography
                  element="p"
                  variant="small-text"
                  className="flex items-center gap-1 capitalize"
                >
                  <Dot className="text-secondary-default" />
                  {month.month}
                </Typography>
                <Typography element="p" variant="small-text">
                  {month.count}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
