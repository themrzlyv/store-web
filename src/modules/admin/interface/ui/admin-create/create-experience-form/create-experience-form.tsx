import { Typography } from "@/shared/components/typography/typography";
import { ExperienceForm } from "@/modules/experiences/interface/ui/experience-form/experience-form";

export function CreateExperienceForm() {
  return (
    <div className="flex flex-col space-y-4 items-center p-5">
      <Typography element="h2" variant="section-title">
        Create a new experience
      </Typography>
      <ExperienceForm />
    </div>
  );
}
