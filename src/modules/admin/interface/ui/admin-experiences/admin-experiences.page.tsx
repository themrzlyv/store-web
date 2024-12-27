import Button from "@/ui/button";
import { MdOutlineAddHomeWork, MdOutlineDeleteOutline } from "react-icons/md";

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
import { useAppDispatch } from "@/lib/store";
import { openSideModal } from "@/shared/components/side-modal/side-modal.slice";
import { SideModalComponentType } from "@/lib/types";

export function AdminExperiencesPage() {
  const dispatch = useAppDispatch();

  const { data, isLoading } = useGetExperiencesQuery(QueryTypes.EXPERIENCES);
  const [removeExperiencesMutation, { isLoading: isDeleteExperiencesLoading }] =
    useDeleteExperiencesMutation();

  const { experienceColumns } = useExperienceColumns();

  const [selectedRows, setSelectedRows] = useState<ExperienceEntity[]>([]);

  const handleOpenAddExperienceModal = () => {
    dispatch(
      openSideModal({
        title: "Add Experience",
        componentType: SideModalComponentType.EXPERIENCE_FORM,
        componentProps: {},
      })
    );
  };

  const handleRemoveExperiences = () => {
    const ids = selectedRows.map(row => row.id);
    removeExperiencesMutation({ ids });
  };

  return (
    <div className="dark:bg-dark-light bg-light-default px-5 py-3 rounded-lg">
      <div className="flex items-center justify-between mt-2 mb-5">
        <Typography
          variant="section-title"
          element="h2"
          className="text-center py-2"
        >
          All Experiences
        </Typography>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center px-3 py-2 gap-1"
            onClick={handleOpenAddExperienceModal}
          >
            <MdOutlineAddHomeWork size="16" />
            <Typography element="p" variant="small-bold">
              Add Experience
            </Typography>
          </button>
          {selectedRows.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500"
              onClick={handleRemoveExperiences}
              isLoading={isDeleteExperiencesLoading}
            >
              <MdOutlineDeleteOutline size="16" />
              <Typography element="p" variant="small-bold">
                Delete Experience
              </Typography>
            </Button>
          )}
        </div>
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
