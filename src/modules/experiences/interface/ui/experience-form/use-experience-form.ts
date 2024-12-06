import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toFormData } from "@/lib/utils";
import { useAppDispatch } from "@/lib/store";
import { closeSideModal } from "@/shared/components/side-modal/side-modal.slice";
import { ExperienceFormInputType } from "@/modules/experiences/infra/types/experience-form.input";
import { experienceFormSchema } from "../../data/form-schemas";
import { ExperienceEntity } from "@/modules/experiences/domain/entities/experience.entity";
import {
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
} from "@/modules/experiences/infra/experience.api";

type Props = {
  experience?: ExperienceEntity;
  isEdit?: boolean;
};

export function useExperienceForm({ experience, isEdit }: Props) {
  const dispatch = useAppDispatch();
  const [createExperienceMutation, { isLoading: isCreatePostLoading }] =
    useCreateExperienceMutation();
  const [updateExperienceMutation, { isLoading: isUpdatePostLoading }] =
    useUpdateExperienceMutation();

  const form = useForm<ExperienceFormInputType>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: {
      id: experience?.id,
      company: experience?.company || "",
      position: experience?.position || "",
      image: undefined,
      imageUrl: experience?.image || "",
      companyUrl: experience?.companyUrl || "",
      startDate: experience ? new Date(experience?.startDate) : undefined,
      endDate: experience?.endDate ? new Date(experience?.endDate) : null,
      present: experience && experience.endDate === null
    },
  });

  const onSubmit = (values: ExperienceFormInputType) => {
    const data = {
      ...values,
      endDate: values.present ? null : values.endDate,
    };
    const formData = toFormData<ExperienceFormInputType>(data);

    if (isEdit) {
      updateExperienceMutation(formData).then(() => {
        form.reset();
        dispatch(closeSideModal());
      });
      return;
    }

    createExperienceMutation(formData).then(() => {
      form.reset();
    });
  };

  const isDisabledEndDate = !!form.watch("present") || !form.watch("startDate");

  return {
    form,
    onSubmit,
    isLoading: isCreatePostLoading || isUpdatePostLoading,
    isDisabledEndDate,
  };
}
