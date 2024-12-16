import { Typography } from "@/shared/components/typography/typography";
import { usePostForm } from "./use-post-form";
import { Form, FormControl, FormField, FormItem } from "@/ui/form";
import { Input } from "@/ui";
import Button from "@/ui/button";
import { PostEntity } from "@/modules/blog/domain/entities/post.entity";
import { UploadImage } from "@/modules/upload/interface/upload-image/upload-image";
import { Editor } from "@/shared/components/editor/editor";

type Props = {
  post?: PostEntity;
  isEdit?: boolean;
};

export function PostForm({ post, isEdit }: Props) {
  const {
    form,
    onSubmit,
    isLoading,
    handleChangeUploadLoading,
    isUploadLoading,
    editor,
  } = usePostForm({
    post,
    isEdit,
  });

  return (
    <div className="relative">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full h-full space-y-6"
      >
        <Form {...form}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <Typography element="p" variant="label">
                  Title
                </Typography>
                <FormControl>
                  <Input {...field} placeholder="Title" className="" />
                </FormControl>
              </FormItem>
            )}
          />

          <UploadImage
            form={form}
            onLoadingChange={handleChangeUploadLoading}
          />

          <Editor editor={editor} />
          <Button
            variant="primary"
            type="submit"
            size="md"
            isLoading={isLoading}
            disabled={isUploadLoading}
          >
            Save
          </Button>
        </Form>
      </form>
    </div>
  );
}
