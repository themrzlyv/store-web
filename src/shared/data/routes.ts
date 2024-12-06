import { icons } from "lucide-react";

export const menuRoutes = [
  {
    path: "/blog",
    name: "Blog",
  },
  {
    path: "/projects",
    name: "Projects",
  },
  {
    path: "/course",
    name: "Course",
  },
  {
    path: "/about",
    name: "About",
  },
];

export const adminMenuItems = [
  {
    id: 1,
    icon: icons.LayoutDashboard,
    path: "/admin",
  },
  {
    id: 2,
    icon: icons.PencilLine,
    path: "/admin/create",
  },
  {
    id: 3,
    icon: icons.ScrollText,
    path: "/admin/update",
  },
  {
    id: 4,
    icon: icons.Settings,
    path: "/admin/settings",
  },
];
