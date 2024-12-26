import { z } from "zod";

export const projectFormSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(5),
  content: z.string().min(10),
  image: z.string().optional(),
  sourceUrl: z.string().optional(),
  stars: z.number().optional(),
  published: z.boolean().optional(),
  techStack: z
    .array(z.object({ id: z.number(), name: z.string() })).max(5)
    .optional(),
});
