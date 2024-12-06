"use client";
import { CreatePostForm } from "./create-post-form/create-post-form";
import { AdminTabs } from "@/shared/components/admin-tabs/admin-tabs";
import { CreateProjectForm } from "./create-project-form/create-project-form";
import { CreateExperienceForm } from "./create-experience-form/create-experience-form";

const tabs = [
  { label: "Post", value: "post", content: <CreatePostForm /> },
  {
    label: "Project",
    value: "project",
    content: <CreateProjectForm />,
  },
  {
    label: "Experience",
    value: "experience",
    content: <CreateExperienceForm />,
  },
];

export function AdminCreatePage() {
  return (
    <div className="p-10">
      <AdminTabs tabs={tabs} />
    </div>
  );
}
