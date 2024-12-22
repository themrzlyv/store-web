import { Typography } from "@/shared/components/typography/typography";
import { ProjectForm } from "@/modules/projects/interface/ui/project-form/project-form";

export function CreateProjectPage() {
  return (
    <div className="flex flex-col space-y-4">
      <Typography element="h2" variant="section-title">
        Add a new project
      </Typography>
      <ProjectForm />
    </div>
  );
}
