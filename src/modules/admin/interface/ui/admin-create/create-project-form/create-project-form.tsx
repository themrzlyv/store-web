import { Typography } from "@/shared/components/typography/typography";
import { ProjectForm } from "@/modules/projects/interface/ui/project-form/project-form";

export function CreateProjectForm() {
  return (
    <div className="flex flex-col space-y-4 items-center p-5">
      <Typography element="h2" variant="section-title">
        Create a new project
      </Typography>
      <ProjectForm />
    </div>
  );
}
