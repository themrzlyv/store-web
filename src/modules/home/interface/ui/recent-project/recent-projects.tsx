"use client";
import { Projects } from "@/modules/projects/interface/ui/projects/projects";
import { Section } from "@/shared/components/section/section";
import Button from "@/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function RecentProjects() {
  const router = useRouter();

  return (
    <Section>
      <Section.Header
        title="Recent Project"
        action={
          <Button
            variant="primary"
            size="lg"
            className="font-bold flex items-center gap-2"
            onClick={() => router.push("/projects")}
          >
            <ArrowRight />
            View all
          </Button>
        }
      />
      <Section.Body>
        <Projects />
      </Section.Body>
    </Section>
  );
}
