import { NextResponse } from "next/server";
import { AnalyticsService } from "../../services/analytics.service";

export async function GET () {
    try {
      const analyticsService = new AnalyticsService();
      const result = await analyticsService.getSessions();
      return NextResponse.json({ ...result }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: (error as Error).message },
        { status: 500 }
      );
    }
}