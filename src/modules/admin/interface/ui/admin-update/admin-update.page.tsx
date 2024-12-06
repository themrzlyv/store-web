import { AdminTabs } from "@/shared/components/admin-tabs/admin-tabs";
import { AdminPosts } from "./admin-posts/admin-posts";
import { AdminProjects } from "./admin-projects/admin-projects";
import { AdminExperiences } from "./admin-experiences/admin-experiences";

const tabs = [
  { label: "Post", value: "post", content: <AdminPosts /> },
  {
    label: "Project",
    value: "project",
    content: <AdminProjects />,
  },
  {
    label: "Experiences",
    value: "experience",
    content: <AdminExperiences />,
  },
];

export function AdminUpdatePage() {
  return (
    <div className="p-10">
      <AdminTabs tabs={tabs} />
    </div>
  );
}
