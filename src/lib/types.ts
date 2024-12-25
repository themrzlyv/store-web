import { Role } from "@prisma/client";
import { JWTPayload } from "jose";

export type TokenPayload = JWTPayload & { userId: number; role: Role };

export enum SideModalComponentType {
  "POST_FORM",
  "PROJECT_FORM",
  "EXPERIENCE_FORM",
}

export type StatisticItemType = {
  value: number;
  prev: number;
}

export type StatisticEntity = {
  pageviews: StatisticItemType;
  visitors: StatisticItemType;
  visits: StatisticItemType;
  bounces: StatisticItemType;
  totaltime: StatisticItemType;
};

export type PageViewsEntity = Array<{ x: string; y: number }>;

export type TotalViewsEntity = {
  pageviews: PageViewsEntity;
  sessions: PageViewsEntity;
};

export type SessionEntity = {
  id: string;
  browser: string;
  city: string;
  country: string;
  createdAt: string;
  device: string;
  firstAt: string;
  hostname: string;
  language: string;
  lastAt: string;
  os: string;
  screen: string;
  subdivision1: string;
  views: number;
  visits: number;
  websiteId: string;
};

export type VisitorSessionsEntity = {
  count: number;
  page: number;
  pageSize: number;
  data: Array<SessionEntity>;
};
