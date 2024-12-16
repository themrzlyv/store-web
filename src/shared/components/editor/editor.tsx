"use client";
import React from "react";
import { Editor as TiptapEditor, EditorContent } from "@tiptap/react";
import { Tools } from "./tools/tools";

type Props = {
  editor: TiptapEditor | null;
};

export function Editor({ editor }: Props) {
  return (
    <div className="flex flex-col w-full gap-4">
      {editor && editor.view && editor.view.editable && (
        <div className="sticky w-full top-0 z-10 rounded-md bg-light-default dark:bg-dark-lighter">
          <Tools editor={editor} />
        </div>
      )}
      <div className="w-full">
        <EditorContent editor={editor} className="h-auto min-h-20" />
      </div>
    </div>
  );
}
