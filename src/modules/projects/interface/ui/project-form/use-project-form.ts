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
import { useMemo, useState } from "react";
import { useGetBioInformationQuery } from "@/modules/bio/infra/bio.api";
import { QueryTypes } from "@/shared/query-types/query-types";

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

  const { data, isFetching: isBioLoading } = useGetBioInformationQuery(
    QueryTypes.BIO_INFO
  );

  const skills = useMemo(() => {
    if (!data) return [];
    return [...data.bio.skills].map(skill => ({
      label: skill.name,
      value: skill.id,
    }));
  }, [data]);

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
      techStack: project?.techStack || [],
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
    isBioLoading,
    skills,
  };
}
