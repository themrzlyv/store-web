import prisma from "@/lib/prisma";
import { upload } from "@/lib/upload";
import { convertToSlug, parseFormData } from "@/lib/utils";
import { PostFormInputType } from "@/modules/blog/infra/types/post-form.input";
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

  async createPost(req: Request) {
    try {
      const formData = await req.formData();
      const { image, title, content } = await parseFormData<PostFormInputType>(
        formData
      );
      const imageUrl = image && (await upload(image));

      await prisma.post.create({
        data: {
          title,
          content,
          slug: convertToSlug(title),
          image: imageUrl,
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

  async updatePost(req: Request) {
    try {
      const formData = await req.formData();
      const { image, id, published, views, title, content, imageUrl } =
        await parseFormData<PostFormInputType>(formData);

      const imageFile = !!image
        ? typeof image === "string"
          ? image
          : await upload(image)
        : imageUrl;

      const post = await prisma.post.update({
        where: { id },
        data: {
          title,
          content,
          published,
          views,
          slug: convertToSlug(title),
          image: imageFile,
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
