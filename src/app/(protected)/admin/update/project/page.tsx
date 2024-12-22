"use client";
import { UpdateProjectsPage } from "@/modules/admin/interface/ui/admin-update/update-projects/update-projects.page";
import { useEffect, useState } from "react";

export default function AdminCreate() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return <UpdateProjectsPage />;
}
