import { PostDetails } from "@/modules/blog/interface/ui/post-details/post-details";
import React from "react";

interface PageProps {
  params: { slug: string };
}

export default function Page({ params }: PageProps) {
  const { slug } = params;
  return <PostDetails slug={slug} />;
}
