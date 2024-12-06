import { Role } from "@prisma/client";
import { JWTPayload } from "jose";

export type TokenPayload = JWTPayload & { userId: number; role: Role };

export enum SideModalComponentType {
  "POST_FORM",
  "PROJECT_FORM",
  "EXPERIENCE_FORM"
}
