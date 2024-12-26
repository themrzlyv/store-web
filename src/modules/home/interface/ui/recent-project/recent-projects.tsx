"use client";
import { Projects } from "@/modules/projects/interface/ui/projects/projects";
import { Section } from "@/shared/components/section/section";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function RecentProjects() {
  const router = useRouter();
  return (
    <Section>
      <Section.Header
        title="Recent Project"
        action={{
          title: "View all",
          onClick: () => router.push("/projects"),
          icon: ArrowRight,
        }}
      />
      <Section.Body>
        <Projects showEmptyText={false} />
      </Section.Body>
    </Section>
  );
}
