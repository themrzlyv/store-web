import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  useGetBioInformationQuery,
  useUpdateBioMutation,
} from "@/modules/bio/infra/bio.api";
import { BioInformationFormInputType } from "@/modules/bio/infra/types/update-bio.input";
import { bioInformationFormSchema } from "../../data/form-schemas";
import { useEffect, useState } from "react";
import { QueryTypes } from "@/shared/query-types/query-types";
import { useAppDispatch } from "@/lib/store";
import { setLoading } from "@/shared/components/loader/loader.slice";

export function useUpdateBioForm() {
  const dispatch = useAppDispatch();
  const { data } = useGetBioInformationQuery(QueryTypes.BIO_INFO);
  const [updateBioInformation, { isLoading: isUpdateBioLoading }] =
    useUpdateBioMutation();

  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    form.reset();
  };

  useEffect(() => {
    dispatch(setLoading({ isLoading: isUpdateBioLoading }));
  }, [dispatch, isUpdateBioLoading]);

  const form = useForm<BioInformationFormInputType>({
    resolver: zodResolver(bioInformationFormSchema),
    values: {
      firstName: data?.bio.firstName || "",
      lastName: data?.bio.lastName || "",
      profession: data?.bio.profession || "",
      bio: data?.bio.bio || "",
    },
  });

  const onSubmit = (values: BioInformationFormInputType) => {
    updateBioInformation(values).then(() => setIsEditMode(!isEditMode));
  };

  return {
    form,
    onSubmit,
    isLoading: isUpdateBioLoading,
    isEditMode,
    toggleEditMode,
  };
}
