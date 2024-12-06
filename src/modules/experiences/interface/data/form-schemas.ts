import { z } from "zod";
import { zfd } from "zod-form-data";

export const experienceFormSchema = zfd.formData({
  id: z.number().optional(),
  company: z.string().min(3),
  position: z.string().max(50).min(3),
  image: zfd
    .file()
    .refine(file => file.size < 5000000, {
      message: "File can't be bigger than 5MB.",
    })
    .optional(),
  imageUrl: z.string().optional(),
  companyUrl: z.string(),
  startDate: z.date(),
  endDate: z.date().optional().nullable(),
  present: z.boolean().default(false).optional(),
});
