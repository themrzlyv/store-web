import { PostEntity } from "@/modules/blog/domain/entities/post.entity";
import {
  useDeletePostsMutation,
  useGetPostsQuery,
} from "@/modules/blog/infra/post.api";
import Button from "@/ui/button";
import { Trash2 } from "lucide-react";
import { Typography } from "@/shared/components/typography/typography";
import { AppTable } from "@/shared/components/app-table/app-table";
import { useState } from "react";
import { usePostColumns } from "@/shared/hooks/use-post-columns";

export function UpdatePostsPage() {
  const { data, isLoading } = useGetPostsQuery({});
  const [removePostsMutation, { isLoading: isDeletePostsLoading }] =
    useDeletePostsMutation();

  const { postColumns } = usePostColumns();

  const [selectedRows, setSelectedRows] = useState<PostEntity[]>([]);

  const handleRemovePosts = () => {
    const ids = selectedRows.map(row => row.id);
    removePostsMutation({ ids });
  };

  return (
    <div className="dark:bg-dark-light p-5 rounded-lg">
      <div className="flex items-center justify-between mt-2 mb-5">
        <Typography
          variant="section-title"
          element="h2"
          className="text-center"
        >
          All Posts
        </Typography>
        {selectedRows.length > 0 && (
          <Button
            variant="ghost"
            size="md"
            className="text-red-500"
            onClick={handleRemovePosts}
            isLoading={isDeletePostsLoading}
          >
            <Trash2 width={20} height={20} />
          </Button>
        )}
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
