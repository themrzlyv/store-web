import { z } from "zod";

export const postFormSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(5),
  content: z.object({
    type: z.string().optional(),
    content: z.array(z.any()).optional(),
  }),
  image: z.string().optional(),
  published: z.boolean().optional(),
});
