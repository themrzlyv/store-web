import Button from "@/ui/button";
import { Typography } from "@/shared/components/typography/typography";
import { AppTable } from "@/shared/components/app-table/app-table";
import { useState } from "react";
import { ProjectEntity } from "@/modules/projects/domain/entities/project.entity";
import {
  useDeleteProjectsMutation,
  useGetProjectsQuery,
} from "@/modules/projects/infra/project.api";
import { useProjectColumns } from "@/shared/hooks/use-project-columns";
import { useAppDispatch } from "@/lib/store";
import { openSideModal } from "@/shared/components/side-modal/side-modal.slice";
import { SideModalComponentType } from "@/lib/types";
import { MdOutlineDeleteOutline, MdOutlinePlaylistAdd } from "react-icons/md";

export function AdminProjectsPage() {
  const dispatch = useAppDispatch();

  const { data, isLoading } = useGetProjectsQuery({});
  const [removeProjectsMutation, { isLoading: isDeleteProjectsLoading }] =
    useDeleteProjectsMutation();

  const { projectColumns } = useProjectColumns();

  const [selectedRows, setSelectedRows] = useState<ProjectEntity[]>([]);

  const handleOpenAddProjectModal = () => {
    dispatch(
      openSideModal({
        title: "Add Project",
        componentType: SideModalComponentType.PROJECT_FORM,
        componentProps: {},
      })
    );
  };

  const handleRemoveProjects = () => {
    const ids = selectedRows.map(row => row.id);
    removeProjectsMutation({ ids });
  };

  return (
    <div className="dark:bg-dark-light bg-light-default px-5 py-3 rounded-lg">
      <div className="flex items-center justify-between mt-2 mb-5">
        <Typography
          variant="section-title"
          element="h2"
          className="text-center py-2"
        >
          All Projects
        </Typography>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center px-3 py-2 gap-1"
            onClick={handleOpenAddProjectModal}
          >
            <MdOutlinePlaylistAdd size="16" />
            <Typography element="p" variant="small-bold">
              Add Project
            </Typography>
          </button>
          {selectedRows.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500"
              onClick={handleRemoveProjects}
              isLoading={isDeleteProjectsLoading}
            >
              <MdOutlineDeleteOutline size="16" />
              <Typography element="p" variant="small-bold">
                Delete Project
              </Typography>
            </Button>
          )}
        </div>
      </div>
      <AppTable<ProjectEntity>
        data={data?.projects || []}
        columns={projectColumns}
        onRowSelectionChange={rows => setSelectedRows(rows)}
        isTableLoading={isLoading}
      />
    </div>
  );
}
