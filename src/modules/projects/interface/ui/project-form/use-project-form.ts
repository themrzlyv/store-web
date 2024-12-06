import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toFormData } from "@/lib/utils";
import { useAppDispatch } from "@/lib/store";
import { closeSideModal } from "@/shared/components/side-modal/side-modal.slice";
import { projectFormSchema } from "../../data/form-schemas";
import { ProjectFormInputType } from "@/modules/projects/infra/types/project-form.input";
import { ProjectEntity } from "@/modules/projects/domain/entities/project.entity";
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "@/modules/projects/infra/project.api";

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

  const form = useForm<ProjectFormInputType>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      id: project?.id,
      title: project?.title || "",
      content: project?.content || "",
      image: undefined,
      imageUrl: project?.image || "",
      sourceUrl: project?.sourceUrl || "",
      published: project?.published,
      stars: project?.stars,
    },
  });

  const onSubmit = (values: ProjectFormInputType) => {
    const formData = toFormData<ProjectFormInputType>(values);

    if (isEdit) {
      updateProjectMutation(formData).then(() => {
        form.reset();
        dispatch(closeSideModal());
      });
      return;
    }

    createProjectMutation(formData).then(() => {
      form.reset();
    });
  };

  return {
    form,
    onSubmit,
    isLoading: isCreatePostLoading || isUpdatePostLoading,
  };
}
