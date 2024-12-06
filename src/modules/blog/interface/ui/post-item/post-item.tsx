import { formatDate } from "@/lib/utils";
import { PostEntity } from "@/modules/blog/domain/entities/post.entity";
import { Card } from "@/shared/components/card/card";
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
        title={post.title}
        content={post.content}
        subContent={
          <>
            <p className="text-base dark:text-dark-light-gray">
              {formatDate(post.createdAt, dateFormat)}
            </p>
            <span>·</span>
            <p className="text-base dark:text-dark-light-gray">
              {post.views} views
            </p>
          </>
        }
      />
    </Card>
  );
}
