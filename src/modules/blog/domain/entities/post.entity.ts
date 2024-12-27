import { JSONContent } from "@tiptap/react";
import { Post } from "@prisma/client";
import { StatisticItemType } from "@/lib/types";

export type PostEntity = Omit<Post, "content" | "views"> & {
  content: JSONContent;
  views: StatisticItemType;
  isLiked: boolean;
  likes: number;
};
