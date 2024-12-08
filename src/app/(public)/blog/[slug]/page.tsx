import { PostDetails } from "@/modules/blog/interface/ui/post-details/post-details";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  return <PostDetails slug={slug} />;
}
