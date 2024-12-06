"use client";
import { Posts } from "@/modules/blog/interface/ui/posts/posts";
import { Section } from "@/shared/components/section/section";
import Button from "@/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function RecentPosts() {
  const router = useRouter();

  return (
    <Section>
      <Section.Header
        title="Recent Posts"
        action={
          <Button
            variant="primary"
            size="lg"
            className="font-bold flex items-center gap-2"
            onClick={() => router.push("/blog")}
          >
            <ArrowRight />
            View all
          </Button>
        }
      />
      <Section.Body>
        <Posts />
      </Section.Body>
    </Section>
  );
}
