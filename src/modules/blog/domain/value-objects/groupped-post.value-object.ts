import { PostEntity } from "../entities/post.entity";

export type GroupedPostValueObject = {
  year: number;
  posts: PostEntity[];
};
