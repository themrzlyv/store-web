import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/lib/store";
import { closeSideModal } from "@/shared/components/side-modal/side-modal.slice";
import { ExperienceFormInputType } from "@/modules/experiences/infra/types/experience-form.input";
import { experienceFormSchema } from "../../data/form-schemas";
import { ExperienceEntity } from "@/modules/experiences/domain/entities/experience.entity";
import {
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
} from "@/modules/experiences/infra/experience.api";
import { useState } from "react";
import { parseISO } from "date-fns";

type Props = {
  experience?: ExperienceEntity;
  isEdit?: boolean;
};

export function useExperienceForm({ experience, isEdit }: Props) {
  const modifiedExperience = experience
    ? {
        ...experience,
        startDate: parseISO(String(experience.startDate)),
        endDate: experience.endDate
          ? parseISO(String(experience.endDate))
          : null,
      }
    : null;

  const dispatch = useAppDispatch();

  const [createExperienceMutation, { isLoading: isCreateExperienceLoading }] =
    useCreateExperienceMutation();

  const [updateExperienceMutation, { isLoading: isUpdateExperienceLoading }] =
    useUpdateExperienceMutation();

  const [isUploadLoading, setIsUploadLoading] = useState(false);

  const form = useForm<ExperienceFormInputType>({
    resolver: zodResolver(experienceFormSchema),
    values: {
      id: modifiedExperience?.id,
      company: modifiedExperience?.company || "",
      position: modifiedExperience?.position || "",
      image: modifiedExperience?.image || "",
      companyUrl: modifiedExperience?.companyUrl || "",
      startDate: modifiedExperience?.startDate
        ? modifiedExperience?.startDate
        : undefined,
      endDate: modifiedExperience ? modifiedExperience?.endDate : null,
      present: modifiedExperience ? modifiedExperience.endDate === null : false,
    },
  });

  const presentValue = form.watch("present");
  const startDateValue = form.watch("startDate");

  const onSubmit = (values: ExperienceFormInputType) => {
    if (isEdit) {
      updateExperienceMutation(values).then(() => {
        form.reset();
        dispatch(closeSideModal());
      });
      return;
    }

    createExperienceMutation(values).then(() => {
      form.reset();
    });
  };

  const isDisabledEndDate = !!presentValue || !startDateValue;

  const handleChangeUploadLoading = (loading: boolean) => {
    setIsUploadLoading(loading);
  };

  return {
    form,
    onSubmit,
    isLoading:
      isCreateExperienceLoading || isUpdateExperienceLoading || isUploadLoading,
    isDisabledEndDate,
    handleChangeUploadLoading,
  };
}
