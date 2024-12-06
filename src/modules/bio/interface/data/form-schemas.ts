import { z } from "zod";
import { zfd } from "zod-form-data";

export const bioInformationFormSchema = zfd.formData({
  firstName: z.string().min(3).optional(),
  lastName: z.string().min(3).optional(),
  profession: z.string().max(50).min(3).optional(),
  image: zfd
    .file()
    .refine(file => file.size < 5000000, {
      message: "File can't be bigger than 5MB.",
    })
    .optional(),
  imageUrl: z.string().optional(),
  bio: z.string().optional(),
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
