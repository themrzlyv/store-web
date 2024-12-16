import { ContentNodeType } from "@prisma/client";
import { Code, Type } from "lucide-react";

export const contentDataTypes = [
  {
    type: ContentNodeType.TEXT,
    icon: <Type width={20} height={20} />,
  },
  {
    type: ContentNodeType.CODE,
    icon: <Code width={20} height={20} />,
  },
];
