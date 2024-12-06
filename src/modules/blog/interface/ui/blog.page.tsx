import { Section } from "@/shared/components/section/section";
import { Posts } from "./posts/posts";

export function BlogPage() {
  return (
    <Section>
      <Section.Header title="Blog" />
      <div className="flex flex-col gap-10">
        <Posts groupped />
      </div>
    </Section>
  );
}
