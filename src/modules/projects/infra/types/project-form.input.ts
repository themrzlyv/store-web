import { z } from "zod";
import { projectFormSchema } from "../../interface/data/form-schemas";

export type ProjectFormInputType = z.infer<typeof projectFormSchema>;
