import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toFormData } from "@/lib/utils";
import {
  useGetBioInformationQuery,
  useUpdateBioMutation,
} from "@/modules/bio/infra/bio.api";
import { BioInformationFormInputType } from "@/modules/bio/infra/types/update-bio.input";
import { bioInformationFormSchema } from "../../data/form-schemas";
import { useState } from "react";
import { QueryTypes } from "@/shared/query-types/query-types";

export function useUpdateBioForm() {
  const { data } = useGetBioInformationQuery(QueryTypes.BIO_INFO);
  const [updateBioInformation, { isLoading: isUpdateBioLoading }] =
    useUpdateBioMutation();

  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    form.reset();
  };

  const form = useForm<BioInformationFormInputType>({
    resolver: zodResolver(bioInformationFormSchema),
    defaultValues: {
      firstName: data?.bio.firstName || "",
      lastName: data?.bio.lastName || "",
      profession: data?.bio.profession || "",
      bio: data?.bio.bio || "",
    },
  });

  const onSubmit = (values: BioInformationFormInputType) => {
    const formData = toFormData<BioInformationFormInputType>(values);

    updateBioInformation(formData).then(() => toggleEditMode());
  };

  return {
    form,
    onSubmit,
    isLoading: isUpdateBioLoading,
    isEditMode,
    toggleEditMode,
  };
}
