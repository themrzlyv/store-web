import { useAppDispatch } from "@/lib/store";
import {
  useGetBioInformationQuery,
  useUpdateBioMutation,
} from "@/modules/bio/infra/bio.api";
import { BioInformationFormInputType } from "@/modules/bio/infra/types/update-bio.input";
import { bioInformationFormSchema } from "@/modules/bio/interface/data/form-schemas";
import { setLoading } from "@/shared/components/loader/loader.slice";
import { QueryTypes } from "@/shared/query-types/query-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function useAdminSocials() {
  const dispatch = useAppDispatch();

  const [isEditMode, setIsEditMode] = useState(false);

  const { data } = useGetBioInformationQuery(QueryTypes.BIO_INFO);

  const [updateBioInformation, { isLoading }] = useUpdateBioMutation();

  useEffect(() => {
    dispatch(setLoading({ isLoading }));
  }, [dispatch, isLoading]);

  const form = useForm<Pick<BioInformationFormInputType, "social">>({
    resolver: zodResolver(bioInformationFormSchema),
    values: {
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
    updateBioInformation(values).then(() => {
      setIsEditMode(false);
    });
  };

  return {
    form,
    onSubmit,
    toggleEditMode,
    isEditMode,
  };
}
