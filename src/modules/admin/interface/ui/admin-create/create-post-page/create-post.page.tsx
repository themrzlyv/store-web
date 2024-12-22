import { Typography } from "@/shared/components/typography/typography";
import { PostForm } from "@/modules/blog/interface/ui/post-form/post-form";

export function CreatePostPage() {
  return (
    <div className="flex flex-col space-y-4 relative">
      <Typography element="h2" variant="section-title">
        Write a new post
      </Typography>
      <PostForm />
    </div>
  );
}
