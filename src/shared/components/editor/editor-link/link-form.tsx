"use client";

import { FC, useState } from "react";
import { Link } from "lucide-react";
import { ToolButton } from "../tools/tool-button";

type Props = {
  onSubmit(link: string): void;
};

export function LinkForm({ onSubmit }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [link, setLink] = useState("");

  return (
    <div>
      <ToolButton onClick={() => setShowForm(true)}>
        <Link size={20} />
      </ToolButton>
      {showForm && (
        <div className="absolute top-10 z-50 ring-1 ring-primary-500 px-2 py-0.5 rounded flex items-center shadow-sm bg-white dark:bg-dark-lighter outline-none">
          <input
            value={link}
            onChange={({ target }) => setLink(target.value)}
            onBlur={() => setShowForm(false)}
            type="text"
            className="outline-none bg-transparent"
            placeholder="https://url.com"
          />
          <button
            type="button"
            onClick={() => {
              setLink("");
              setShowForm(false);
            }}
            onMouseDown={() => {
              onSubmit(link);
              setLink("");
            }}
            className="p-2 rounded-md mr-1  flex justify-center items-center"
          >
            ok
          </button>
        </div>
      )}
    </div>
  );
}