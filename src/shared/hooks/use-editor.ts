import { JSONContent, useEditor as useEditorBase } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import { useEffect, useState } from "react";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from "lowlight";

import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml"; // Import Highlight.js
import "highlight.js/styles/monokai-sublime.css"; // Optional: Choose a Highlight.js theme

const lowlight = createLowlight();

lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

type Props = {
  editable: boolean;
  handleChange?: (value: JSONContent) => void;
  content?: JSONContent;
};

export function useEditor({ editable, handleChange, content }: Props) {
  const [isEditable, setIsEditable] = useState(editable);

  const editor = useEditorBase({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
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
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-p:font-inter prose-p:text-pretty w-full  prose-code:font-inter outline-none prose-pre:shadow-lg  prose-a:font-inter  prose-a:text-primary-500 dark:prose-p:text-light-default dark:prose-headings:text-light-default dark:prose-strong:text-light-default",
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
