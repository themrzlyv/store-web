import { formatDate } from "@/lib/utils";
import { PostEntity } from "@/modules/blog/domain/entities/post.entity";
import { Card } from "@/shared/components/card/card";
import { Typography } from "@/shared/components/typography/typography";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  post: PostEntity;
};

export function PostItem({ post }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const dateFormat = !pathname.startsWith("/blog");

  return (
    <Card key={post.id} onClick={() => router.push(`/blog/${post.slug}`)}>
      <Card.Image src={post.image!} width={110} height={64} alt={post.title} />
      <Card.Content
        title={post.title.slice(0, 50).trim() + "..."}
        content={post.content.slice(0, 100).trim() + "..."}
        subContent={
          <>
            <Typography element="p" variant="small-text">
              {formatDate(post.createdAt, dateFormat)}
            </Typography>
            <span>·</span>
            <Typography element="p" variant="small-text">
              {post.views} views
            </Typography>
          </>
        }
      />
    </Card>
  );
}
