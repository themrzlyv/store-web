import { Bio, Skill, Social } from "@prisma/client";
import { JSONContent } from "@tiptap/react";

export type BioEntity = Omit<Bio, "about"> & {
  skills: Skill[];
  social: Social;
  about?: JSONContent
};
