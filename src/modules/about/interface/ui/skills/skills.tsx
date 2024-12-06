import { Typography } from "@/shared/components/typography/typography";
import { Skills as SkillList } from "@/shared/components/skills/skills";

export function Skills() {
  return (
    <div className="flex flex-col gap-4">
      <Typography element="h2" variant="section-title">
        Skills
      </Typography>
      <div className="flex items-center flex-wrap gap-4">
        <SkillList />
      </div>
    </div>
  );
}
