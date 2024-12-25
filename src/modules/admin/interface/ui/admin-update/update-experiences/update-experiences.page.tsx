import Button from "@/ui/button";
import { Trash2 } from "lucide-react";
import { Typography } from "@/shared/components/typography/typography";
import { AppTable } from "@/shared/components/app-table/app-table";
import { useState } from "react";
import {
  useDeleteExperiencesMutation,
  useGetExperiencesQuery,
} from "@/modules/experiences/infra/experience.api";
import { ExperienceEntity } from "@/modules/experiences/domain/entities/experience.entity";
import { useExperienceColumns } from "@/shared/hooks/use-experience-columns";
import { QueryTypes } from "@/shared/query-types/query-types";

export function UpdateExperiencesPage() {
  const { data, isLoading } = useGetExperiencesQuery(QueryTypes.EXPERIENCES);
  const [removeProjectsMutation, { isLoading: isDeleteProjectsLoading }] =
    useDeleteExperiencesMutation();

  const { experienceColumns } = useExperienceColumns();

  const [selectedRows, setSelectedRows] = useState<ExperienceEntity[]>([]);

  const handleRemoveProjects = () => {
    const ids = selectedRows.map(row => row.id);
    removeProjectsMutation({ ids });
  };

  return (
    <div className="dark:bg-dark-light bg-light-default p-5 rounded-lg">
      <div className="flex items-center justify-between mt-2 mb-5">
        <Typography
          variant="section-title"
          element="h2"
          className="text-center py-2"
        >
          All Experiences
        </Typography>
        {selectedRows.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500"
            onClick={handleRemoveProjects}
            isLoading={isDeleteProjectsLoading}
          >
            <Trash2 width={16} height={16} />
          </Button>
        )}
      </div>
      <AppTable<ExperienceEntity>
        data={data?.experiences || []}
        columns={experienceColumns}
        onRowSelectionChange={rows => setSelectedRows(rows)}
        isTableLoading={isLoading}
      />
    </div>
  );
}
