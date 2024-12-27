import { BsViewList } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { LiaProjectDiagramSolid } from "react-icons/lia";
import { MdOutlineHomeWork } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

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
    path: "/about",
    name: "About",
  },
];

export const adminMenuItems = [
  {
    icon: RxDashboard,
    path: "/admin",
    label: "Dashboard",
  },
  {
    icon: BsViewList,
    path: "/admin/posts",
    label: "Posts",
  },
  {
    icon: LiaProjectDiagramSolid,
    path: "/admin/projects",
    label: "Projects",
  },
  {
    icon: MdOutlineHomeWork,
    path: "/admin/experiences",
    label: "Experiences",
  },
  {
    icon: IoSettingsOutline,
    path: "/admin/settings",
    label: "Bio",
  },
];
