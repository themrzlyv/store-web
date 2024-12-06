import { toFormData } from "@/lib/utils";
import {
  useGetBioInformationQuery,
  useUpdateBioMutation,
} from "@/modules/bio/infra/bio.api";
import { BioInformationFormInputType } from "@/modules/bio/infra/types/update-bio.input";
import { bioInformationFormSchema } from "@/modules/bio/interface/data/form-schemas";
import { QueryTypes } from "@/shared/query-types/query-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function useAdminSocials() {
  const [isEditMode, setIsEditMode] = useState(false);

  const { data } = useGetBioInformationQuery(QueryTypes.BIO_INFO);

  const [updateBioInformation, { isLoading }] = useUpdateBioMutation();

  const form = useForm<Pick<BioInformationFormInputType, "social">>({
    resolver: zodResolver(bioInformationFormSchema),
    defaultValues: {
      social: {
        github: data?.bio?.social?.github || "",
        linkedin: data?.bio?.social?.linkedin || "",
        instagram: data?.bio?.social?.instagram || "",
        mail: data?.bio?.social?.mail || "",
      },
    },
  });

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    form.reset();
  };

  const onSubmit = (values: Pick<BioInformationFormInputType, "social">) => {
    const formData =
      toFormData<Pick<BioInformationFormInputType, "social">>(values);

    updateBioInformation(formData).then(() => {
      setIsEditMode(false);
    });
  };

  return {
    form,
    onSubmit,
    toggleEditMode,
    isEditMode,
    isLoading,
  };
}
