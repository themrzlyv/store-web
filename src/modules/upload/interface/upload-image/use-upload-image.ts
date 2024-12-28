import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { useUploadFileMutation } from "../../infra/upload.api";
import { useDropzone } from "react-dropzone";
import { useEffect } from "react";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  onLoadingChange?: (isLoading: boolean) => void;
};

export function useUploadImage<T extends FieldValues>({
  form,
  onLoadingChange,
}: Props<T>) {
  const [uploadFile, { isLoading }] = useUploadFileMutation();

  const { setValue } = form;

  useEffect(() => {
    if (onLoadingChange) {
      onLoadingChange(isLoading);
    }
  }, [isLoading, onLoadingChange]);

  const handleRemoveImage = () => {
    setValue("image" as Path<T>, undefined as PathValue<T, Path<T>>);
  };

  const handleChangeImage = (file: File) => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      uploadFile(formData).then(({ data }) => {
        if (data) {
          setValue("image" as Path<T>, data.imageUrl as PathValue<T, Path<T>>);
        }
      });
    }
  };

  const { getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/svg+xml": [".svg"],
    },
    multiple: false,
    maxFiles: 1,
    onDrop: acceptedFiles => handleChangeImage(acceptedFiles[0]),
  });

  const imageUrl = form.watch("image" as Path<T>) as string | undefined;

  return {
    isLoading,
    imageUrl,
    handleRemoveImage,
    getInputProps,
  };
}
