import { verifyJWT } from "@/lib/jwt";
import {
  DEFAULT_LOGIN_REDIRECT_URL,
  DEFAULT_UNAUTHORIZED_REDIRECT_URL,
  TOKEN_KEY,
} from "@/shared/data/constants";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function clientMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(TOKEN_KEY)?.value;

  const isProtectedRoute = pathname.startsWith("/admin");
  const isAuthRoute = pathname.startsWith("/login");

  const isValidToken = !!token && !!(await verifyJWT(token));

  if (!isValidToken) {
    (await cookies()).delete(TOKEN_KEY);
  }

  if (isAuthRoute) {
    return isValidToken
      ? NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT_URL, req.url))
      : NextResponse.next();
  }

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  return isValidToken
    ? NextResponse.next()
    : NextResponse.redirect(
        new URL(DEFAULT_UNAUTHORIZED_REDIRECT_URL, req.url)
      );
}
