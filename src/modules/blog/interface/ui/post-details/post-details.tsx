"use client";
import React from "react";
import { formatDate } from "@/lib/utils";
import { Section } from "@/shared/components/section/section";
import { Typography } from "@/shared/components/typography/typography";
import { Img } from "@/ui";
import { usePostDetails } from "./use-post-details";
import { Editor } from "@/shared/components/editor/editor";
import { useEditor } from "@/shared/hooks/use-editor";
import { JSONContent } from "@tiptap/react";
import { Skeleton } from "@/ui/skeleton";
import { ArchiveX } from "lucide-react";
import { EmptyIcon } from "@/shared/icons";
import { EmptyContent } from "@/shared/components/empty-content/empty-content";

type Props = {
  slug: string;
};

export function PostDetails({ slug }: Props) {
  const { isLoading, error, post } = usePostDetails({
    slug,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="w-32 h-8" />
        <Skeleton className="w-full h-48" />
        <Skeleton className="w-3/4 h-6" />
        <div className="flex w-full items-center justify-between">
          <Skeleton className="w-28 h-4" />
          <Skeleton className="w-20 h-4" />
        </div>
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-5/6 h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <EmptyContent
        title="Post couldn't found!"
        description="Please check the URL or try again later."
      />
    );
  }

  return (
    <Section>
      <Section.Header title="Post Details" />
      <div className={`flex flex-col gap-8`}>
        <div className="w-full rounded-xl relative shadow-md overflow-hidden">
          {post?.image && (
            <Img
              src={post.image!}
              alt={post.title}
              width={700}
              height={475}
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          )}
        </div>
        <Typography element="h4" variant="card-title" className="text-pretty">
          {post?.title}
        </Typography>
        <div className="flex items-center justify-between">
          {post?.createdAt && (
            <Typography
              element="p"
              variant="small-text"
              className="italic text-gray-500"
            >
              {formatDate(post.createdAt, true)}
            </Typography>
          )}
          <Typography
            element="p"
            variant="small-text"
            className="text-gray-500"
          >
            {post?.views.value || 0} views
          </Typography>
        </div>
        {post?.content && <PostContent content={post.content} />}
      </div>
    </Section>
  );
}

function PostContent({ content }: { content: JSONContent }) {
  const { editor } = useEditor({
    editable: false,
    content: content,
  });

  return <Editor editor={editor} />;
}
