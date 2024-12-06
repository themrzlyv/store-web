import { z } from "zod";
import { postFormSchema } from "../../interface/data/form-schemas";

export type PostFormInputType = z.infer<typeof postFormSchema>;
