import { BubbleMenu, Editor } from "@tiptap/react";
import { useMemo } from "react";
import { LinkForm } from "./link-form";
import { LinkEditForm } from "./link-edit-form";

type Props = {
  editor: Editor | null;
};

export function EditorLink({ editor }: Props) {
  const initialLink = useMemo(() => {
    const attributes = editor?.getAttributes("link");

    if (attributes) return attributes.href;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, editor?.getAttributes("link")]);

  const handleLinkSubmission = (href: string) => {
    if (href === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
  };

  return (
    <>
      <LinkForm onSubmit={handleLinkSubmission} />
      <BubbleMenu
        editor={editor}
        shouldShow={({ editor }) => editor.isActive("link")}
      >
        <LinkEditForm
          initialState={initialLink}
          onSubmit={handleLinkSubmission}
        />
      </BubbleMenu>
    </>
  );
}
