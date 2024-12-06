import { z } from "zod";
import { zfd } from "zod-form-data";

export const postFormSchema = zfd.formData({
  id: z.number().optional(),
  title: z.string().min(5),
  content: z.string().min(10),
  image: zfd.file().refine(file => file.size < 5000000, {
    message: "File can't be bigger than 5MB.",
  }).optional(),
  imageUrl: z.string().optional(),
  views: z.number().optional(),
  published: z.boolean().optional(),
});
