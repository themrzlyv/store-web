"use client";
import { useGetProjectsQuery } from "@/modules/projects/infra/project.api";
import { Projects } from "@/modules/projects/interface/ui/projects/projects";
import { Section } from "@/shared/components/section/section";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function RecentProjects() {
  const router = useRouter();
  const { data } = useGetProjectsQuery({ isPublished: true });

  if (!data?.projects || data.projects.length === 0) return null;

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
        <Projects />
      </Section.Body>
    </Section>
  );
}
