import { formatDate } from "@/lib/utils";
import { PostEntity } from "@/modules/blog/domain/entities/post.entity";
import { Card } from "@/shared/components/card/card";
import { Typography } from "@/shared/components/typography/typography";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { BsCalendarDate } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { AiFillLike } from "react-icons/ai";

type Props = {
  post: PostEntity;
};

export function PostItem({ post }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const dateFormat = !pathname.startsWith("/blog");

  const content = useMemo(() => {
    if (!post?.content.content || post?.content?.content?.length === 0) {
      return "No content";
    }

    const firstText = post.content.content
      .flatMap(item => item.content || [])
      .find(innerItem => innerItem.text)?.text;

    return firstText?.slice(0, 100) + "...";
  }, [post]);

  return (
    <Card key={post.id} onClick={() => router.push(`/blog/${post.slug}`)}>
      <Card.Image src={post.image!} width={110} height={64} alt={post.title} />
      <Card.Content
        title={post.title.slice(0, 50).trim() + "..."}
        content={content}
        subContent={
          <>
            <Typography
              element="p"
              variant="small-text"
              className="flex items-center gap-1"
            >
              <BsCalendarDate />
              {formatDate(post.createdAt, dateFormat)}
            </Typography>
            <GoDotFill size="5" />

            <Typography element="p" variant="small-text">
              {post.views.value} views
            </Typography>

            <GoDotFill size="5" />

            <Typography element="p" variant="small-text">
              {post.likes} likes
            </Typography>
          </>
        }
      />
    </Card>
  );
}
