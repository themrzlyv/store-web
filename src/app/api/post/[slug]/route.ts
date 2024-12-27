import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { AnalyticsService } from "../../services/analytics.service";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const visitorId = req.nextUrl.searchParams.get("visitorId");

    const post = await prisma.post.findUnique({
      where: { slug },
      include: { likes: true },
    });

    const analyticsService = new AnalyticsService();
    const { pageviews } = await analyticsService.getStatistics(slug);

    if (!post) {
      return NextResponse.json({ message: "Post not found!" }, { status: 400 });
    }

    const { likes, ...data } = post;

    return NextResponse.json(
      {
        post: {
          ...data,
          views: pageviews,
          isLiked: likes.some(item => item.visitorId === visitorId),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
