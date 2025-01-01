import { generateMetadata as createMeta } from "@/lib/generate-metadata";
import prisma from "@/lib/prisma";
import { PostDetails } from "@/modules/blog/interface/ui/post-details/post-details";
import { Metadata } from "next";
import React from "react";

export async function generateStaticParams() {
  const posts = await prisma.post.findMany();
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });

  const metadata = createMeta({
    title: `${post?.title}`,
    description: post?.title || "Blog post by Samir Mirzaliyev",
    exactUrl: `https://themirzaliyev.store/blog/${slug}`,
    image: post?.image || "https://themirzaliyev.store/opengraph-image.png",
  });

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: post?.createdAt.toISOString(),
    },
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
