import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { Switch } from "@/ui/switch";
import { PostEntity } from "@/modules/blog/domain/entities/post.entity";
import { Typography } from "@/shared/components/typography/typography";
import Button from "@/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  useDeletePostsMutation,
  useUpdatePostMutation,
} from "@/modules/blog/infra/post.api";
import { toFormData } from "@/lib/utils";
import { useAppDispatch } from "@/lib/store";
import { openSideModal } from "@/shared/components/side-modal/side-modal.slice";
import { SideModalComponentType } from "@/lib/types";

export function usePostColumns() {
  const dispatch = useAppDispatch();
  const [updatePostMutation] = useUpdatePostMutation();
  const [removePostsMutation] = useDeletePostsMutation();

  const handleUpdatePost = (post: PostEntity) => {
    const formData = toFormData(post);
    updatePostMutation(formData);
  };

  const handleOpenUpdatePostModal = (post: PostEntity) => {
    dispatch(
      openSideModal({
        title: "Update Post",
        componentProps: { post, isEdit: true },
        componentType: SideModalComponentType.POST_FORM,
      })
    );
  };

  const handleRemovePost = async (id: number) => {
    removePostsMutation({ ids: [id] });
  };

  const postColumns: ColumnDef<PostEntity>[] = [
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
      accessorKey: "views",
      header: () => (
        <Typography variant="menu-text" element="h6" className="text-center">
          Views
        </Typography>
      ),
      cell: ({ row }) => {
        return (
          <Typography
            variant="content-text"
            element="h6"
            className="w-full text-center"
          >
            {row.getValue("views")}
          </Typography>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const post = row.original;
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
                    handleOpenUpdatePostModal(post);
                  }}
                >
                  Update
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    handleRemovePost(post.id);
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
    postColumns,
  };
}
