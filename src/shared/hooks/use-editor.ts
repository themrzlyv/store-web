import { JSONContent, useEditor as useEditorBase } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import { useEffect, useState } from "react";

type Props = {
  editable: boolean;
  handleChange?: (value: JSONContent) => void;
  content?: JSONContent;
};

export function useEditor({ editable, handleChange, content }: Props) {
  const [isEditable, setIsEditable] = useState(editable);

  const editor = useEditorBase({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: !!editable,
        autolink: false,
        linkOnPaste: true,
        defaultProtocol: "https",
        HTMLAttributes: {
          rel: null,
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose max-w-full w-full prose-code:font-bold prose-pre:shadow-sm prose-pre:font-medium outline-none prose-sm sm:prose-base prose-p:font-medium prose-p:text-base prose-a:text-primary-500 dark:prose-p:text-light-default dark:prose-code:text-light-default dark:prose-headings:text-light-default dark:prose-strong:text-light-default",
      },
    },
    content,
    editable: isEditable,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const value = editor.getJSON();
      handleChange?.(value);
    },
  });

  useEffect(() => {
    if (editor) {
      editor.setEditable(editable);
      setIsEditable(editor.view.editable);
    }
  }, [editable, editor]);

  return {
    editor,
  };
}
