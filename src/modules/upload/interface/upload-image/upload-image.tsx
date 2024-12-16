"use client";
import { Img } from "@/ui";
import { Loader, UploadCloud } from "lucide-react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Typography } from "../../../../shared/components/typography/typography";
import { useUploadImage } from "./use-upload-image";

type UploadImageProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  label?: string;
  onLoadingChange?: (isLoading: boolean) => void;
};

export function UploadImage<T extends FieldValues>({
  form,
  label = "Upload Image",
  onLoadingChange,
}: UploadImageProps<T>) {
  const { getInputProps, handleRemoveImage, imageUrl, isLoading } =
    useUploadImage({ form, onLoadingChange });

  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <Typography element="label" variant="label">
          {label}
        </Typography>
      )}

      {imageUrl && (
        <div className="w-full flex items-center  justify-center">
          <button
            type="button"
            className="max-w-[700px] max-h-[370px] focus:ring-2 ring-primary-500 rounded-lg focus-visible:outline-none overflow-hidden"
            onKeyDown={e => {
              e.preventDefault();
              if (e.key === "Backspace") {
                handleRemoveImage();
              }
            }}
            disabled={isLoading}
          >
            <Img
              src={imageUrl}
              width={700}
              height={370}
              alt="Preview Image"
              className="w-full h-full object-cover "
            />
          </button>
        </div>
      )}

      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 dark:border-dark-lighter border-dashed rounded-lg cursor-pointer dark:bg-dark-light bg-gray-50">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Loader size={30} className="animate-spin text-gray-500" />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadCloud size={30} className="text-gray-500" />
              <input {...getInputProps()} disabled={isLoading} />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Image file
              </p>
            </div>
          )}
        </label>
      </div>
    </div>
  );
}
