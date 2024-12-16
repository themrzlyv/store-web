import { JSONContent } from "@tiptap/react";
import { Post } from "@prisma/client";

export type PostEntity = Omit<Post, "content"> & { content: JSONContent };
