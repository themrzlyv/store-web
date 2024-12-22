import { Section } from "@/shared/components/section/section";
import { Projects } from "./projects/projects";

export function ProjectsPage() {
  return (
    <Section>
      <Section.Header title="Projects" />
      <div className="flex flex-col gap-2">
        <Projects />
      </div>
    </Section>
  );
}
