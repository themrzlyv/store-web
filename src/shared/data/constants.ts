export const authRoutes = ["/login"];
export const apiPrefix = "/api";
export const apiPublicRoutes = [
  { path: `${apiPrefix}/post`, publicMethod: "GET" },
  { path: `${apiPrefix}/post/like`, publicMethod: "PUT" },
  { path: `${apiPrefix}/post/{slug}`, publicMethod: "GET" },
  { path: `${apiPrefix}/post/{slug}/tracking-view`, publicMethod: "POST" },
  { path: `${apiPrefix}/bio`, publicMethod: "GET" },
  { path: `${apiPrefix}/experience`, publicMethod: "GET" },
  { path: `${apiPrefix}/project`, publicMethod: "GET" },
  { path: `${apiPrefix}/auth/sign-in`, publicMethod: "POST" },
  { path: `${apiPrefix}/auth/sign-up`, publicMethod: "POST" },
  { path: `${apiPrefix}/statistics`, publicMethod: "GET" },
];

export const DEFAULT_LOGIN_REDIRECT_URL = "/admin";
export const DEFAULT_UNAUTHORIZED_REDIRECT_URL = "/login";

export const TOKEN_KEY = "themirzaliyev_store_session";

export const DEFAULT_BIO_KEY = "themirzaliyev_store_bio";
export const DEFAULT_USER_KEY = "themirzaliyev_store_user";

export const VISITOR_ID_KEY = "themirzaliyev_store_visitor_id";
