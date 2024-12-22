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
  // {
  //   path: "/course",
  //   name: "Course",
  // },
  {
    path: "/about",
    name: "About",
  },
];

export const adminMenuItems = [
  {
    icon: icons.LayoutDashboard,
    path: "/admin",
    label: "Dashboard",
  },
  {
    icon: icons.PencilLine,
    label: "Create",
    subMenu: [
      {
        path: "/admin/create/post",
        label: "Post",
      },
      {
        path: "/admin/create/project",
        label: "Project",
      },
      {
        path: "/admin/create/experience",
        label: "Experience",
      },
    ],
  },
  {
    icon: icons.ScrollText,
    label: "Update",
    subMenu: [
      {
        path: "/admin/update/post",
        label: "Post",
      },
      {
        path: "/admin/update/project",
        label: "Project",
      },
      {
        path: "/admin/update/experience",
        label: "Experience",
      },
    ],
  },
  {
    icon: icons.Settings,
    path: "/admin/settings",
    label: "Bio",
  },
];
