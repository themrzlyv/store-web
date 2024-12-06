import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { Switch } from "@/ui/switch";
import { Typography } from "@/shared/components/typography/typography";
import Button from "@/ui/button";
import { MoreHorizontal } from "lucide-react";
import { toFormData } from "@/lib/utils";
import { useAppDispatch } from "@/lib/store";
import { openSideModal } from "@/shared/components/side-modal/side-modal.slice";
import { SideModalComponentType } from "@/lib/types";
import {
  useDeleteProjectsMutation,
  useUpdateProjectMutation,
} from "@/modules/projects/infra/project.api";
import { ProjectEntity } from "@/modules/projects/domain/entities/project.entity";

export function useProjectColumns() {
  const dispatch = useAppDispatch();
  const [updateProjectMutation] = useUpdateProjectMutation();
  const [removeProjectsMutation] = useDeleteProjectsMutation();

  const handleUpdatePost = (post: ProjectEntity) => {
    const formData = toFormData(post);
    updateProjectMutation(formData);
  };

  const handleOpenUpdateProjectModal = (project: ProjectEntity) => {
    dispatch(
      openSideModal({
        title: "Update Project",
        componentProps: { project, isEdit: true },
        componentType: SideModalComponentType.PROJECT_FORM,
      })
    );
  };

  const handleRemoveProject = async (id: number) => {
    removeProjectsMutation({ ids: [id] });
  };

  const projectColumns: ColumnDef<ProjectEntity>[] = [
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
      accessorKey: "title",
      header: () => (
        <Typography variant="menu-text" element="h6" className="text-left">
          Title
        </Typography>
      ),
      cell: ({ row }) => (
        <Typography variant="content-text" element="h6" className="text-left">
          {row.getValue("title")}
        </Typography>
      ),
    },
    {
      accessorKey: "content",
      header: () => (
        <Typography variant="menu-text" element="h6" className="text-left">
          Content
        </Typography>
      ),
      cell: ({ row }) => (
        <Typography variant="content-text" element="h6" className="text-left">
          {row.getValue("content")}
        </Typography>
      ),
    },
    {
      accessorKey: "published",
      header: () => (
        <Typography variant="menu-text" element="h6" className="text-center">
          Published
        </Typography>
      ),
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">
            <Switch
              checked={row.getValue("published")}
              onCheckedChange={() => {
                const post = row.original;
                handleUpdatePost({ ...post, published: !post.published });
              }}
            />
          </div>
        );
      },
    },
    {
      accessorKey: "stars",
      header: () => (
        <Typography variant="menu-text" element="h6" className="text-center">
          Stars
        </Typography>
      ),
      cell: ({ row }) => {
        return (
          <Typography
            variant="content-text"
            element="h6"
            className="w-full text-center"
          >
            {row.getValue("stars")}
          </Typography>
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
                    handleOpenUpdateProjectModal(project);
                  }}
                >
                  Update
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    handleRemoveProject(project.id);
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
    projectColumns,
  };
}
