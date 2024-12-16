import prisma from "@/lib/prisma";
import { convertToSlug } from "@/lib/utils";
import { postFormSchema } from "@/modules/blog/interface/data/form-schemas";
import { NextRequest, NextResponse } from "next/server";

export class PostService {
  async getPosts(req: NextRequest) {
    try {
      const params = req.nextUrl.searchParams;

      const isPublished = params.get("isPublished");

      const posts = await prisma.post.findMany({
        where: {
          ...(isPublished ? { published: isPublished === "true" } : {}),
        },
      });

      return NextResponse.json({ posts }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: (error as Error).message },
        { status: 500 }
      );
    }
  }

  async createPost(req: NextRequest) {
    try {
      const body = await req.json();

      const { title, content, image } = postFormSchema.parse(body);

      await prisma.post.create({
        data: {
          title,
          content,
          slug: convertToSlug(title),
          image,
        },
      });

      return NextResponse.json(
        {
          message: "Post created successfully!",
        },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: (error as Error).message },
        { status: 500 }
      );
    }
  }

  async updatePost(req: NextRequest) {
    try {
      const body = await req.json();
      const { image, id, published, title, content } =
        postFormSchema.parse(body);

      const post = await prisma.post.update({
        where: { id },
        data: {
          title,
          content,
          published,
          slug: convertToSlug(title),
          image,
        },
      });

      return NextResponse.json(
        { post, message: "Post updated successfully" },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: (error as Error).message },
        { status: 500 }
      );
    }
  }

  async deletePost(req: Request) {
    try {
      const { ids } = await req.json();

      await prisma.post.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });

      return NextResponse.json({ message: "Post(s) deleted successfully" });
    } catch (error) {
      return NextResponse.json(
        { message: (error as Error).message },
        { status: 500 }
      );
    }
  }
}
