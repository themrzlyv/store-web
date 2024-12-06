import { Typography } from "@/shared/components/typography/typography";
import { PostForm } from "@/modules/blog/interface/ui/post-form/post-form";

export function CreatePostForm() {
  return (
    <div className="flex flex-col space-y-4 items-center p-5">
      <Typography element="h2" variant="section-title">
        Create a new post
      </Typography>
      <PostForm />
    </div>
  );
}
