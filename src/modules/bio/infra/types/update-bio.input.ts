import { z } from "zod";
import { bioInformationFormSchema } from "../../interface/data/form-schemas";

export type BioInformationFormInputType = z.infer<typeof bioInformationFormSchema>;
