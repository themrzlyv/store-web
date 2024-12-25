import { NextRequest, NextResponse } from "next/server";
import { AnalyticsService } from "../../services/analytics.service";

export async function GET(req: NextRequest) {
  try {
    const analyticsService = new AnalyticsService();
    const pageUrl = req.nextUrl.searchParams.get("page");
    const startAt = req.nextUrl.searchParams.get("startAt");
    const endAt = req.nextUrl.searchParams.get("endAt");
    const result = await analyticsService.getStatistics(
      pageUrl,
      startAt,
      endAt
    );
    return NextResponse.json({ ...result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
