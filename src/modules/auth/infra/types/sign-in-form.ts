import { z } from "zod";
import { loginFormSchema } from "../../interface/data/form-schemas";

export type SignInFormType = z.infer<typeof loginFormSchema>;