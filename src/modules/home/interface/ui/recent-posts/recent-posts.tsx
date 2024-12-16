"use client";
import { useGetPostsQuery } from "@/modules/blog/infra/post.api";
import { Posts } from "@/modules/blog/interface/ui/posts/posts";
import { Section } from "@/shared/components/section/section";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function RecentPosts() {
  const router = useRouter();
  const { data } = useGetPostsQuery({ isPublished: true });

  if (!data?.posts || data.posts.length === 0) return null;

  return (
    <Section>
      <Section.Header
        title="Recent Posts"
        action={{
          title: "View all",
          onClick: () => router.push("/blog"),
          icon: ArrowRight,
        }}
      />
      <Section.Body>
        <Posts />
      </Section.Body>
    </Section>
  );
}
