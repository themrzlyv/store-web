import { PostEntity } from "../../domain/entities/post.entity";
import { GroupedPostValueObject } from "../../domain/value-objects/groupped-post.value-object";

export function groupPostsMapper(
  posts: PostEntity[]
): GroupedPostValueObject[] {
  return posts.reduce<GroupedPostValueObject[]>((acc, post) => {
    const year = new Date(post.createdAt).getFullYear();

    let yearGroup = acc.find(group => group.year === year);

    if (!yearGroup) {
      yearGroup = { year, posts: [] };
      acc.push(yearGroup);
    }

    yearGroup.posts.push(post);

    return acc;
  }, []);
}
