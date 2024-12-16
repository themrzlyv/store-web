import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Braces,
  Code,
  Italic,
  List,
  ListOrdered,
  Underline,
} from "lucide-react";

export const tools = [
  {
    task: "bold",
    icon: <Bold size={20} />,
  },
  {
    task: "italic",
    icon: <Italic size={20} />,
  },
  {
    task: "underline",
    icon: <Underline size={20} />,
  },
  {
    task: "code",
    icon: <Code size={20} />,
  },
  {
    task: "codeBlock",
    icon: <Braces size={20} />,
  },
  {
    task: "left",
    icon: <AlignLeft size={20} />,
  },
  {
    task: "center",
    icon: <AlignCenter size={20} />,
  },
  {
    task: "right",
    icon: <AlignRight size={20} />,
  },
  {
    task: "bulletList",
    icon: <List size={20} />,
  },
  {
    task: "orderedList",
    icon: <ListOrdered size={20} />,
  },
] as const;

export const headingOptions = [
  { task: "p", value: "Paragraph" },
  { task: "h1", value: "Heading 1" },
  { task: "h2", value: "Heading 2" },
  { task: "h3", value: "Heading 3" },
] as const;
