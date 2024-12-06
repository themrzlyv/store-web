import { Bio, Skill, Social } from "@prisma/client";

export type BioEntity = Bio & {
  skills: Skill[];
  social: Social;
};
