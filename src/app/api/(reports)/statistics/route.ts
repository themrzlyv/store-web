import { NextRequest, NextResponse } from "next/server";
import { AnalyticsService } from "../../services/analytics.service";

export async function GET(req: NextRequest) {
  try {
    const analyticsService = new AnalyticsService();
    const pageUrl = req.nextUrl.searchParams.get("page");
    const result = await analyticsService.getStatistics(pageUrl);
    return NextResponse.json({ ...result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
