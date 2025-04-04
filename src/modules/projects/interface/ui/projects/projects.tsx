"use client";
import { useGetProjectsQuery } from "@/modules/projects/infra/project.api";
import { ProjectItem } from "../project-item/project-item";
import { ProjectItemSkeleton } from "@/shared/components/project-item-skeleton/project-item-skeleton";
import { EmptyContent } from "@/shared/components/empty-content/empty-content";
import { usePathname } from "next/navigation";

type Props = {
  showEmptyText?: boolean;
};

export function Projects({ showEmptyText }: Props) {
  const pathname = usePathname();
  const { data, isLoading } = useGetProjectsQuery({ isPublished: true });

  if (isLoading || !data) {
    return (
      <div className="flex flex-col gap-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <ProjectItemSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (data.projects.length === 0 && showEmptyText) {
    return <EmptyContent title="Sorry, there are no projects yet." />;
  }

  if (pathname === "/") {
    return (
      <>
        {data.projects.slice(0, 3).map(project => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </>
    );
  }

  return (
    <>
      {data.projects.map(project => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </>
  );
}
