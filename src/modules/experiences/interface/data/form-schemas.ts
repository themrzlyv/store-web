import { z } from "zod";

export const experienceFormSchema = z.object({
  id: z.number().optional(),
  company: z.string().min(3),
  position: z.string().max(50).min(3),
  image: z.string().optional(),
  companyUrl: z.string(),
  startDate: z.date().optional(),
  endDate: z.date().optional().nullable(),
  present: z.boolean().default(false).optional(),
});
