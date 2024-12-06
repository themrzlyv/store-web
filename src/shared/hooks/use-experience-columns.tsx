import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { Typography } from "@/shared/components/typography/typography";
import Button from "@/ui/button";
import { Link, MoreHorizontal } from "lucide-react";
import { useAppDispatch } from "@/lib/store";
import { openSideModal } from "@/shared/components/side-modal/side-modal.slice";
import { SideModalComponentType } from "@/lib/types";
import { useDeleteExperiencesMutation } from "@/modules/experiences/infra/experience.api";
import { ExperienceEntity } from "@/modules/experiences/domain/entities/experience.entity";
import { formatDate } from "@/lib/utils";

export function useExperienceColumns() {
  const dispatch = useAppDispatch();
  const [removeExperiencesMutation] = useDeleteExperiencesMutation();

  const handleOpenUpdateExperienceModal = (experience: ExperienceEntity) => {
    dispatch(
      openSideModal({
        title: "Update Experience",
        componentProps: { experience, isEdit: true },
        componentType: SideModalComponentType.EXPERIENCE_FORM,
      })
    );
  };

  const handleRemoveExperience = async (id: number) => {
    removeExperiencesMutation({ ids: [id] });
  };

  const experienceColumns: ColumnDef<ExperienceEntity>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "company",
      header: () => (
        <Typography variant="menu-text" element="h6" className="text-left">
          Company
        </Typography>
      ),
      cell: ({ row }) => (
        <Typography variant="content-text" element="h6" className="text-left">
          {row.getValue("company")}
        </Typography>
      ),
    },
    {
      accessorKey: "position",
      header: () => (
        <Typography variant="menu-text" element="h6" className="text-left">
          Position
        </Typography>
      ),
      cell: ({ row }) => (
        <Typography variant="content-text" element="h6" className="text-left">
          {row.getValue("position")}
        </Typography>
      ),
    },
    {
      accessorKey: "startDate",
      header: () => (
        <Typography variant="menu-text" element="h6" className="text-center">
          Start Date
        </Typography>
      ),
      cell: ({ row }) => {
        return (
          <Typography
            variant="content-text"
            element="h6"
            className="w-full text-center"
          >
            {formatDate(row.getValue("startDate"), true)}
          </Typography>
        );
      },
    },
    {
      accessorKey: "endDate",
      header: () => (
        <Typography variant="menu-text" element="h6" className="text-center">
          End Date
        </Typography>
      ),
      cell: ({ row }) => {
        return (
          <Typography
            variant="content-text"
            element="h6"
            className="w-full text-center"
          >
            {row.getValue("endDate")
              ? formatDate(row.getValue("endDate"), true)
              : "Present"}
          </Typography>
        );
      },
    },
    {
      accessorKey: "companyUrl",
      header: () => (
        <Typography variant="menu-text" element="h6" className="text-center">
          Web Site
        </Typography>
      ),
      cell: ({ row }) => {
        return (
          <a
            href={row.getValue("companyUrl")}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center"
          >
            <Link />
          </a>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const project = row.original;
        return (
          <div className="flex justify-center items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="md" className="">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    handleOpenUpdateExperienceModal(project);
                  }}
                >
                  Update
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    handleRemoveExperience(project.id);
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return {
    experienceColumns,
  };
}
