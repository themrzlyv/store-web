import { ToolButton } from "./tool-button";
import { Editor } from "@tiptap/react";
import { TaskType } from "./types";
import { tools } from "./data";
import { chainMethods } from "@/lib/utils";
import { SelectHeading } from "./select-heading/select-heading";
import { EditorLink } from "../editor-link/editor-link";
import { useCallback } from "react";

type Props = {
  editor: Editor | null;
};

export function Tools({ editor }: Props) {
  const handleSelectTool = useCallback(
    (task: TaskType) => {
      switch (task) {
        case "bold":
          return chainMethods(editor, chain => chain.toggleBold());
        case "italic":
          return chainMethods(editor, chain => chain.toggleItalic());
        case "underline":
          return chainMethods(editor, chain => chain.toggleUnderline());
        case "code":
          return chainMethods(editor, chain => chain.toggleCode());
        case "codeBlock":
          return chainMethods(editor, chain => chain.toggleCodeBlock());
        case "orderedList":
          return chainMethods(editor, chain => chain.toggleOrderedList());
        case "bulletList":
          return chainMethods(editor, chain => chain.toggleBulletList());
        case "left":
          return chainMethods(editor, chain => chain.setTextAlign("left"));
        case "center":
          return chainMethods(editor, chain => chain.setTextAlign("center"));
        case "right":
          return chainMethods(editor, chain => chain.setTextAlign("right"));
      }
    },
    [editor]
  );

  return (
    <div className="flex items-center w-full p-2 gap-2">
      <SelectHeading editor={editor} />
      <EditorLink editor={editor} />

      {tools.map((tool, index) => (
        <ToolButton
          key={index}
          onClick={() => handleSelectTool(tool.task)}
          active={
            editor?.isActive(tool.task) ||
            editor?.isActive({ textAlign: tool.task })
          }
        >
          {tool.icon}
        </ToolButton>
      ))}
    </div>
  );
}
