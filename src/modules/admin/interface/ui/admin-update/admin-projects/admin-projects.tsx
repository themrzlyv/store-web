import Button from "@/ui/button";
import { Trash2 } from "lucide-react";
import { Typography } from "@/shared/components/typography/typography";
import { AppTable } from "@/shared/components/app-table/app-table";
import { useState } from "react";
import { ProjectEntity } from "@/modules/projects/domain/entities/project.entity";
import { useDeleteProjectsMutation, useGetProjectsQuery } from "@/modules/projects/infra/project.api";
import { useProjectColumns } from "@/shared/hooks/use-project-columns";

export function AdminProjects() {
  const { data, isLoading } = useGetProjectsQuery({});
  const [removeProjectsMutation, { isLoading: isDeleteProjectsLoading }] =
    useDeleteProjectsMutation();

  const { projectColumns } = useProjectColumns();

  const [selectedRows, setSelectedRows] = useState<ProjectEntity[]>([]);

  const handleRemoveProjects = () => {
    const ids = selectedRows.map(row => row.id);
    removeProjectsMutation({ ids });
  };

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mt-2 mb-5">
        <Typography
          variant="section-title"
          element="h2"
          className="text-center"
        >
          All Projects
        </Typography>
        {selectedRows.length > 0 && (
          <Button
            variant="ghost"
            size="md"
            className="text-red-500"
            onClick={handleRemoveProjects}
            isLoading={isDeleteProjectsLoading}
          >
            <Trash2 width={20} height={20} />
          </Button>
        )}
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
