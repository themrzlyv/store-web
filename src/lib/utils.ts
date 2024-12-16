import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { format } from "date-fns";
import { ChainedCommands, Editor } from "@tiptap/react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function parseFormData<T>(formData: FormData): Promise<T> {
  const parsed: Record<string, unknown> = {};

  const setNestedValue = (
    obj: Record<string, unknown>,
    path: string[],
    value: unknown
  ) => {
    const lastKey = path.pop();
    if (!lastKey) return;
    const nested = path.reduce((acc, key) => {
      if (!acc[key]) acc[key] = {};
      return acc[key] as Record<string, unknown>;
    }, obj);
    nested[lastKey] = value;
  };

  formData.forEach((value, key) => {
    if (typeof value === "string") {
      try {
        value = JSON.parse(value);
      } catch {
        // If JSON parsing fails, leave the value as a string
      }
      if (value === "undefined") return;
    }
    const keyParts = key.split(/\[|\].?/).filter(Boolean); // Split nested keys like "socials[github]"
    if (keyParts.length > 1) {
      setNestedValue(parsed, keyParts, value);
    } else {
      parsed[key] = value;
    }
  });

  const validator = z.object({}).passthrough();
  return validator.parse(parsed) as T;
}

export function formatDate(date: Date, fullDate: boolean = false): string {
  const formatDate = fullDate ? "MMMM d, yyyy" : "MMMM yyyy";
  return format(date, formatDate);
}

export function convertToSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export const chainMethods = (
  editor: Editor | null,
  command: (chain: ChainedCommands) => ChainedCommands
) => {
  if (!editor) return;

  command(editor.chain().focus()).run();
};
