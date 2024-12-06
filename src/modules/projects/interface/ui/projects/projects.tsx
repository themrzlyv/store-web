"use client";
import { useGetProjectsQuery } from "@/modules/projects/infra/project.api";
import { ProjectItem } from "../project-item/project-item";
import { ProjectItemSkeleton } from "@/shared/components/project-item-skeleton/project-item-skeleton";

export function Projects() {
  const { data, isLoading } = useGetProjectsQuery({ isPublished: true });

  if (isLoading || !data) {
    return Array.from({ length: 2 }).map((_,index) => (
      <ProjectItemSkeleton key={index} />
    ))
  }


  return (
    <>
      {data.projects.map(project => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </>
  );
}
