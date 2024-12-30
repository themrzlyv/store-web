import { generateMetadata as createMeta } from "@/lib/generate-metadata";
import { PostEntity } from "@/modules/blog/domain/entities/post.entity";
import { PostDetails } from "@/modules/blog/interface/ui/post-details/post-details";
import { Metadata } from "next";
import React from "react";

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post?isPublished=true`,
    { method: "GET" }
  );
  const { posts } = (await response.json()) as { posts: PostEntity[] };
  return posts.map(post => ({ params: { slug: post.slug } }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/${slug}`,
    { method: "GET" }
  );
  const { post } = await response.json();

  const metadata = createMeta({
    title: `${post.title}`,
    description: post.title || "Blog post by Samir Mirzaliyev",
    exactUrl: `https://themirzaliyev.store/blog/${slug}`,
  });

  return {
    ...metadata,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  return <PostDetails slug={slug} />;
}
