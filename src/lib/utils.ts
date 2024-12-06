import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toFormData<T extends Record<string, unknown>>(
  obj: T
): FormData {
  const formData = new FormData();

  const appendFormData = (data: T, parentKey: string | null = null) => {
    if (data && typeof data === "object" && !(data instanceof File)) {
      if (data instanceof Date) {
        formData.append(parentKey || "", data.toISOString());
      } else {
        Object.keys(data).forEach(key => {
          const fullKey = parentKey ? `${parentKey}[${key}]` : key;
          appendFormData(data[key] as T, fullKey);
        });
      }
    } else {
      formData.append(parentKey || "", data);
    }
  };

  appendFormData(obj);
  return formData;
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
      if (value === "undefined") value = undefined;
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
  const formatDate = fullDate ? "MMMM d, yyyy" : "MMMM d";
  return format(date, formatDate);
}

export function convertToSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}
