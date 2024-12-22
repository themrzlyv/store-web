import { Typography } from "@/shared/components/typography/typography";
import { ExperienceForm } from "@/modules/experiences/interface/ui/experience-form/experience-form";

export function CreateExperiencePage() {
  return (
    <div className="flex flex-col space-y-4">
      <Typography element="h2" variant="section-title">
        Add a new experience
      </Typography>
      <ExperienceForm />
    </div>
  );
}
