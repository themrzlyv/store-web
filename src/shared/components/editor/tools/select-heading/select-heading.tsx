import { ChangeEventHandler, useMemo } from "react";
import { HeadingType } from "../types";
import { chainMethods } from "@/lib/utils";
import { Editor } from "@tiptap/react";
import { headingOptions } from "../data";

type Props = {
  editor: Editor | null;
};

export function SelectHeading({ editor }: Props) {
  const selectedHeading = (): HeadingType => {
    let result: HeadingType = "p";

    if (editor?.isActive("heading", { level: 1 })) result = "h1";
    if (editor?.isActive("heading", { level: 2 })) result = "h2";
    if (editor?.isActive("heading", { level: 3 })) result = "h3";

    return result;
  }

  const handleHeadingSelection: ChangeEventHandler<HTMLSelectElement> = ({
    target,
  }) => {
    const { value } = target as { value: HeadingType };

    switch (value) {
      case "p":
        return chainMethods(editor, chain => chain.setParagraph());
      case "h1":
        return chainMethods(editor, chain => chain.toggleHeading({ level: 1 }));
      case "h2":
        return chainMethods(editor, chain => chain.toggleHeading({ level: 2 }));
      case "h3":
        return chainMethods(editor, chain => chain.toggleHeading({ level: 3 }));
    }
  };

  return (
    <select
      value={selectedHeading()}
      className="p-2 bg-transparent outline-none"
      onChange={handleHeadingSelection}
    >
      {headingOptions.map(item => {
        return (
          <option key={item.task} value={item.task}>
            {item.value}
          </option>
        );
      })}
    </select>
  );
}
