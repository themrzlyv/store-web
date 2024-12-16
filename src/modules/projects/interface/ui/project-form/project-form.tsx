import { Typography } from "@/shared/components/typography/typography";
import { Input } from "@/ui";
import { Form, FormControl, FormField, FormItem } from "@/ui/form";
import { useProjectForm } from "./use-project-form";
import Button from "@/ui/button";
import { ProjectEntity } from "@/modules/projects/domain/entities/project.entity";
import { UploadImage } from "@/modules/upload/interface/upload-image/upload-image";

type Props = {
  project?: ProjectEntity;
  isEdit?: boolean;
};

export function ProjectForm({ project, isEdit }: Props) {
  const { form, onSubmit, handleChangeUploadLoading, isLoading } =
    useProjectForm({ project, isEdit });
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className=" w-full h-full space-y-6"
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
                <Input placeholder="Title" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <Typography element="p" variant="label">
                Content
              </Typography>
              <FormControl>
                <Input placeholder="Content" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sourceUrl"
          render={({ field }) => (
            <FormItem>
              <Typography element="p" variant="label">
                Source URL
              </Typography>
              <FormControl>
                <Input placeholder="Source URL" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <UploadImage form={form} onLoadingChange={handleChangeUploadLoading} />

        <Button
          variant="primary"
          type="submit"
          size="md"
          className="w-full"
          disabled={isLoading}
          isLoading={isLoading}
        >
          Save
        </Button>
      </Form>
    </form>
  );
}
