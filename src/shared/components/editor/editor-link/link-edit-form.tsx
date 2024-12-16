"use client";

import { Unlink } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  initialState?: string;
  onSubmit(link: string): void;
};

export function LinkEditForm({ initialState, onSubmit }: Props) {
  const [link, setLink] = useState("");

  useEffect(() => {
    if (initialState) setLink(initialState);
  }, [initialState]);

  return (
    <div>
      <div className="absolute top-10 z-50 ring-1 ring-primary-500 px-2 py-0.5 rounded flex items-center shadow-sm bg-white dark:bg-dark-lighter outline-none">
        <input
          value={link}
          onChange={({ target }) => setLink(target.value)}
          type="text"
          className="outline-none bg-transparent"
          placeholder="https://url.com"
        />
        <button
          type="button"
          onMouseDown={() => {
            onSubmit(link);
          }}
          className="p-2 rounded-md mr-1  flex justify-center items-center"
        >
          ok
        </button>
        <button
          onMouseDown={() => {
            onSubmit("");
          }}
          className="p-2 text-white bg-red-300 rounded-md  flex justify-center items-center"
        >
          <Unlink width={16} height={16} className="text-white" />
        </button>
      </div>
    </div>
  );
}
