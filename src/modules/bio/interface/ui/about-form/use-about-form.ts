import { useAppDispatch } from "@/lib/store";
import {
  useGetBioInformationQuery,
  useUpdateBioMutation,
} from "@/modules/bio/infra/bio.api";
import { BioInformationFormInputType } from "@/modules/bio/infra/types/update-bio.input";
import { bioInformationFormSchema } from "@/modules/bio/interface/data/form-schemas";
import { setLoading } from "@/shared/components/loader/loader.slice";
import { useEditor } from "@/shared/hooks/use-editor";
import { QueryTypes } from "@/shared/query-types/query-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function useAboutForm() {
  const dispatch = useAppDispatch();

  const [isEditMode, setIsEditMode] = useState(false);

  const { data } = useGetBioInformationQuery(QueryTypes.BIO_INFO);

  const [updateBioInformation, { isLoading }] = useUpdateBioMutation();

  const form = useForm<Pick<BioInformationFormInputType, "about">>({
    resolver: zodResolver(bioInformationFormSchema),
    values: {
      about: data?.bio.about || {},
    },
  });

  const { editor } = useEditor({
    handleChange: about => {
      form.setValue("about", about);
    },
    editable: isEditMode,
    content: data?.bio?.about || {},
  });

  useEffect(() => {
    dispatch(setLoading({ isLoading }));
  }, [dispatch, isLoading]);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    form.reset();
  };

  const onSubmit = (values: Pick<BioInformationFormInputType, "about">) => {
    updateBioInformation(values).then(() => {
      setIsEditMode(false);
    });
  };

  return {
    form,
    onSubmit,
    toggleEditMode,
    isEditMode,
    editor,
  };
}
