import { PostEntity } from "@/modules/blog/domain/entities/post.entity";
import {
  useDeletePostsMutation,
  useGetPostsQuery,
} from "@/modules/blog/infra/post.api";
import Button from "@/ui/button";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Typography } from "@/shared/components/typography/typography";
import { AppTable } from "@/shared/components/app-table/app-table";
import { useState } from "react";
import { usePostColumns } from "@/shared/hooks/use-post-columns";
import { useAppDispatch } from "@/lib/store";
import { openSideModal } from "@/shared/components/side-modal/side-modal.slice";
import { SideModalComponentType } from "@/lib/types";

export function AdminPostsPage() {
  const dispatch = useAppDispatch();

  const { data, isLoading } = useGetPostsQuery({});
  const [removePostsMutation, { isLoading: isDeletePostsLoading }] =
    useDeletePostsMutation();

  const { postColumns } = usePostColumns();

  const [selectedRows, setSelectedRows] = useState<PostEntity[]>([]);

  const handleOpenAddPostModal = () => {
    dispatch(
      openSideModal({
        title: "Add Post",
        componentType: SideModalComponentType.POST_FORM,
        componentProps: {},
      })
    );
  };

  const handleRemovePosts = () => {
    const ids = selectedRows.map(row => row.id);
    removePostsMutation({ ids });
  };

  return (
    <div className="dark:bg-dark-light bg-light-default px-5 py-3 rounded-lg">
      <div className="flex items-center justify-between mt-2 mb-5">
        <Typography
          variant="section-title"
          element="h2"
          className="text-center py-2"
        >
          All Posts
        </Typography>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center px-3 py-2 gap-1"
            onClick={handleOpenAddPostModal}
          >
            <RiStickyNoteAddLine size="16" />
            <Typography element="p" variant="small-bold">
              Add Post
            </Typography>
          </button>

          {selectedRows.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500"
              onClick={handleRemovePosts}
              isLoading={isDeletePostsLoading}
            >
              <MdOutlineDeleteOutline size="16" />
              <Typography element="p" variant="small-bold">
                Delete Posts
              </Typography>
            </Button>
          )}
        </div>
      </div>
      <AppTable<PostEntity>
        data={data?.posts || []}
        columns={postColumns}
        onRowSelectionChange={rows => setSelectedRows(rows)}
        isTableLoading={isLoading}
      />
    </div>
  );
}
