"use client";
import { Posts } from "@/modules/blog/interface/ui/posts/posts";
import { Section } from "@/shared/components/section/section";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function RecentPosts() {
  const router = useRouter();
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
        <Posts showEmptyText={false} />
      </Section.Body>
    </Section>
  );
}
