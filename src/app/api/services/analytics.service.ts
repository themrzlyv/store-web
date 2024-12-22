import {
  PageViewsEntity,
  StatisticEntity,
  TotalViewsEntity,
  VisitorSessionsEntity,
} from "@/lib/types";

export class AnalyticsService {
  private readonly apiUrl: string;
  private readonly headers: Record<string, string>;
  private readonly defaultParams: Record<string, string>;

  constructor() {
    const siteId = process.env.UMAMI_SITE_ID;
    const apiKey = process.env.UMAMI_API_KEY;

    if (!siteId || !apiKey) {
      throw new Error("UMAMI_SITE_ID and UMAMI_API_KEY must be defined");
    }

    this.apiUrl = `https://api.umami.is/v1/websites/${siteId}`;
    this.headers = {
      "x-umami-api-key": apiKey,
    };

    this.defaultParams = {
      startAt: new Date("2024-12-16T18:00:00Z").getTime().toString(),
      endAt: Date.now().toString(),
      type: "url",
      unit: "hour",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  }

  private createRequestUrl(
    endpoint: string,
    params?: Record<string, string>
  ): URL {
    const url = new URL(`${this.apiUrl}/${endpoint}`);

    Object.entries(this.defaultParams).forEach(([key, value]) =>
      url.searchParams.append(key, value)
    );

    if (params) {
      Object.entries(params).forEach(([key, value]) =>
        url.searchParams.set(key, value)
      );
    }

    return url;
  }

  private async fetchData<T>(url: URL): Promise<T> {
    const request = new Request(url.toString(), {
      headers: this.headers,
      method: "GET",
    });

    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    return response.json();
  }

  async getStatistics(pageUrl?: string | null): Promise<StatisticEntity> {
    const params: Record<string, string> = {};

    if (pageUrl) {
      params.url = `~${pageUrl}`;
    }

    const url = this.createRequestUrl("stats", params);
    return this.fetchData<StatisticEntity>(url);
  }

  async getPageViews({
    pageUrl,
    type,
  }: {
    pageUrl?: string | null;
    type?: string | null;
  }): Promise<PageViewsEntity> {
    const params: Record<string, string> = {};

    if (pageUrl) {
      params.url = `~${pageUrl}`;
    }

    if (type) {
      params.type = `${type}`;
    }

    const url = this.createRequestUrl("metrics", params);
    return this.fetchData<PageViewsEntity>(url);
  }

  async getTotalViews(): Promise<TotalViewsEntity> {
    const url = this.createRequestUrl("pageviews", { unit: "day" });
    return this.fetchData<TotalViewsEntity>(url);
  }

  async getSessions(): Promise<VisitorSessionsEntity> {
    const url = this.createRequestUrl("sessions");
    return this.fetchData<VisitorSessionsEntity>(url);
  }
}
