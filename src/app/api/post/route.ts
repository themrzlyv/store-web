import { NextRequest } from "next/server";
import { PostService } from "../services/post.service";

export async function GET(req: NextRequest) {
  const postService = new PostService();
  return await postService.getPosts(req);
}

export async function POST(req: NextRequest) {
  const postService = new PostService();
  return await postService.createPost(req);
}

export async function PUT(req: NextRequest) {
  const postService = new PostService();
  return await postService.updatePost(req);
}

export async function DELETE(req: Request) {
  const postService = new PostService();
  return await postService.deletePost(req);
}
