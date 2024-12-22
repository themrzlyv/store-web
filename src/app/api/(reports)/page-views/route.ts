import { NextRequest, NextResponse } from "next/server";
import { AnalyticsService } from "../../services/analytics.service";

export async function GET(req: NextRequest) {
  try {
    const analyticsService = new AnalyticsService();
    const pageUrl = req.nextUrl.searchParams.get("page");
    const type = req.nextUrl.searchParams.get("type");
    const result = await analyticsService.getPageViews({ pageUrl, type });
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
