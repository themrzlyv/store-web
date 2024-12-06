import { verifyJWT } from "@/lib/jwt";
import { apiPublicRoutes, TOKEN_KEY } from "@/shared/data/constants";
import { NextRequest, NextResponse } from "next/server";

export async function apiMiddleware(req: NextRequest) {
  const { method, nextUrl } = req;
  const { pathname } = nextUrl;

  const publicRoutePatterns = apiPublicRoutes.map(route => {
    const pathPattern = route.path.replace(/\{slug\}/, "[^/]+");
    return {
      regex: new RegExp(`^${pathPattern}$`),
      method: route.publicMethod,
    };
  });

  const isPublicRoute = publicRoutePatterns.some(
    route => route.regex.test(pathname) && method === route.method
  );

  if (isPublicRoute) {
    return;
  }

  const token = req.cookies.get(TOKEN_KEY)?.value;

  if (!token) {
    return new Response("Unauthorized: Missing access token", { status: 401 });
  }

  const tokenPayload = await verifyJWT(token);
  if (!tokenPayload) {
    return new Response("Unauthorized: Invalid token", { status: 401 });
  }

  // if(tokenPayload.role !== "admin") {
  //   return new Response("Unauthorized: Insufficient privileges", { status: 401 });
  // }

  const headers = new Headers(req.headers); // Preserve original headers
  headers.set("Authorization", `Bearer ${token}`);

  return NextResponse.next({
    request: {
      headers,
    },
  });
}
