import { Role } from "@prisma/client";
import { JWTPayload } from "jose";

export type TokenPayload = JWTPayload & { userId: number; role: Role };

export enum SideModalComponentType {
  "POST_FORM",
  "PROJECT_FORM",
  "EXPERIENCE_FORM",
}

export type StatisticEntity = {
  pageviews: {
    value: number;
    prev: number;
  };
  visitors: {
    value: number;
    prev: number;
  };
  visits: {
    value: number;
    prev: number;
  };
  bounces: {
    value: number;
    prev: number;
  };
  totaltime: {
    value: number;
    prev: number;
  };
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
