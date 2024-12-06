import { toFormData } from "@/lib/utils";
import {
  useGetBioInformationQuery,
  useUpdateBioMutation,
} from "@/modules/bio/infra/bio.api";
import { QueryTypes } from "@/shared/query-types/query-types";
import { Img, Input } from "@/ui";

export function AdminUpdatePhoto() {
  const { data } = useGetBioInformationQuery(QueryTypes.BIO_INFO);

  const [updateBioInformation] = useUpdateBioMutation();

  const handleUpdateImage = (file: File | null) => {
    if (!file) return;
    const formData = toFormData({ image: file });
    updateBioInformation(formData);
  };

  return (
    <div className="flex flex-col gap-2 items-center ">
      {data?.bio.image && (
        <Img
          src={data.bio.image}
          width={250}
          height={250}
          alt="bio-image"
          className="rounded-xl shadow-md"
        />
      )}
      <Input
        type="file"
        className="max-w-[250px] w-full py-2"
        onChange={event =>
          handleUpdateImage(event.target.files && event.target.files[0])
        }
      />
    </div>
  );
}
