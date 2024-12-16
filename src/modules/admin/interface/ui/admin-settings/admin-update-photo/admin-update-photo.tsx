import { useAppDispatch } from "@/lib/store";
import {
  useGetBioInformationQuery,
  useUpdateBioMutation,
} from "@/modules/bio/infra/bio.api";
import { useUploadFileMutation } from "@/modules/upload/infra/upload.api";
import { setLoading } from "@/shared/components/loader/loader.slice";
import { QueryTypes } from "@/shared/query-types/query-types";
import { Img } from "@/ui";
import Button from "@/ui/button";
import { Edit, Loader, Trash2, UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";

export function AdminUpdatePhoto() {
  const dispatch = useAppDispatch();

  const { data, isFetching: isBioInfoLoading } = useGetBioInformationQuery(
    QueryTypes.BIO_INFO
  );

  const [uploadFile, { isLoading: isFileUploadLoading }] =
    useUploadFileMutation();
  const [updateBioInformation, { isLoading: isBioInfoUpdateLoading }] =
    useUpdateBioMutation();

  const isLoading =
    isFileUploadLoading || isBioInfoUpdateLoading || isBioInfoLoading;

  const handleUpdateImage = (file: File | null) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file)
    uploadFile(formData).then(({ data }) => {
      if (data) {
        updateBioInformation({ image: data.imageUrl });
      }
    });
  };

  const handleRemoveImage = () => {
    dispatch(
      setLoading({
        isLoading: true,
      })
    );
    updateBioInformation({ image: "" }).then(() => {
      dispatch(
        setLoading({
          isLoading: false,
        })
      );
    });
  };

  const { getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    multiple: false,
    maxFiles: 1,
    onDrop: acceptedFiles => handleUpdateImage(acceptedFiles[0]),
  });

  return (
    <div className="flex flex-col gap-2 items-center ">
      {!!data?.bio.image ? (
        <div className="flex relative flex-col">
          <Img
            src={data.bio.image}
            width={250}
            height={250}
            alt="bio-image"
            className="rounded-xl shadow-md"
          />
          <div className="absolute bottom-0 w-full flex items-center">
            <Button
              onClick={handleRemoveImage}
              className="w-2/4 bg-red-400 hover:bg-red-500 py-1 rounded-none rounded-bl-md text-white"
            >
              <Trash2 width={16} height={16} />
            </Button>
            <label className="w-2/4 cursor-pointer text-white bg-primary-400 hover:bg-primary-500 flex items-center justify-center rounded-none rounded-br-md py-1">
              <Edit width={16} height={16} />
              <input {...getInputProps()} />
            </label>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full p-5">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
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
      )}
    </div>
  );
}
