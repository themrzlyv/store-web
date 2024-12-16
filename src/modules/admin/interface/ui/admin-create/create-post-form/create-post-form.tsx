import { Typography } from "@/shared/components/typography/typography";
import { PostForm } from "@/modules/blog/interface/ui/post-form/post-form";

export function CreatePostForm() {
  return (
    <div className="flex flex-col space-y-4 p-5 relative">
      <Typography element="h2" variant="section-title">
        Create a new post
      </Typography>
      <PostForm />
    </div>
  );
}
