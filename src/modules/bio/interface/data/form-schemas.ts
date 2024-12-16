import { z } from "zod";

export const bioInformationFormSchema = z.object({
  firstName: z.string().min(3).optional(),
  lastName: z.string().min(3).optional(),
  profession: z.string().max(50).min(3).optional(),
  image: z.string().optional(),
  bio: z.string().optional(),
  about: z
    .object({
      type: z.string().optional(),
      content: z.array(z.any()).optional(),
    })
    .nullable()
    .optional(),
  skill: z.string().min(3).max(15).optional(),
  skillId: z.number().optional(),
  social: z
    .object({
      github: z.string().optional(),
      linkedin: z.string().optional(),
      instagram: z.string().optional(),
      mail: z.string().optional(),
    })
    .optional(),
});
