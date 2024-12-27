import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { visitorId, postId, isLiked } = body;

    if (!postId || !visitorId) {
      return NextResponse.json(
        { message: "Post ID and visitor ID are required" },
        { status: 400 }
      );
    }

    await prisma.post.update({
      where: { id: postId },
      data: {
        likes: {
          ...(isLiked
            ? { create: { visitorId } }
            : { deleteMany: { visitorId } }),
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
