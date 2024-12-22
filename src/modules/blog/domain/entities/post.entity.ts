import { JSONContent } from "@tiptap/react";
import { Post } from "@prisma/client";

export type PostEntity = Omit<Post, "content" | "views"> & {
  content: JSONContent;
  views: { value: number; prev: number };
};
