import { z } from "zod";
import { experienceFormSchema } from "../../interface/data/form-schemas";

export type ExperienceFormInputType = z.infer<typeof experienceFormSchema>;
