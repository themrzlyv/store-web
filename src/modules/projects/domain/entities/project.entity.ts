import { Project, Skill } from "@prisma/client";

export type ProjectEntity = Project & {
  techStack: Skill[];
};
