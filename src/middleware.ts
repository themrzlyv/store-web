import { apiPrefix } from "@/shared/data/constants";
import { NextRequest } from "next/server";
import { clientMiddleware } from "./middlewares/client-middleware";
import { apiMiddleware } from "./middlewares/api-middleware";

export default async function middleware(req: NextRequest) {
  const isApiRoute = req.nextUrl.pathname.startsWith(apiPrefix);

  if (isApiRoute) {
    return await apiMiddleware(req);
  }

  return await clientMiddleware(req);
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
