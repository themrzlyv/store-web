import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/lib/store";
import { closeSideModal } from "@/shared/components/side-modal/side-modal.slice";
import { projectFormSchema } from "../../data/form-schemas";
import { ProjectFormInputType } from "@/modules/projects/infra/types/project-form.input";
import { ProjectEntity } from "@/modules/projects/domain/entities/project.entity";
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "@/modules/projects/infra/project.api";
import { useState } from "react";

type Props = {
  project?: ProjectEntity;
  isEdit?: boolean;
};

export function useProjectForm({ project, isEdit }: Props) {
  const dispatch = useAppDispatch();
  const [createProjectMutation, { isLoading: isCreatePostLoading }] =
    useCreateProjectMutation();
  const [updateProjectMutation, { isLoading: isUpdatePostLoading }] =
    useUpdateProjectMutation();

  const [isUploadLoading, setIsUploadLoading] = useState(false);

  const isLoading =
    isCreatePostLoading || isUpdatePostLoading || isUploadLoading;

  const form = useForm<ProjectFormInputType>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      id: project?.id,
      title: project?.title || "",
      content: project?.content || "",
      image: project?.image || "",
      sourceUrl: project?.sourceUrl || "",
      published: project?.published,
      stars: project?.stars,
    },
  });

  const onSubmit = (values: ProjectFormInputType) => {
    if (isEdit) {
      updateProjectMutation(values).then(() => {
        form.reset();
        dispatch(closeSideModal());
      });
      return;
    }

    createProjectMutation(values).then(() => {
      form.reset();
    });
  };

  const handleChangeUploadLoading = (loading: boolean) => {
    setIsUploadLoading(loading);
  };

  return {
    form,
    onSubmit,
    isLoading,
    handleChangeUploadLoading,
  };
}
