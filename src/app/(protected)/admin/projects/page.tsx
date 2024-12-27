"use client";
import { AdminProjectsPage } from "@/modules/admin/interface/ui/admin-projects/admin-projects.page";
import { useEffect, useState } from "react";

export default function AdminCreate() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return <AdminProjectsPage />;
}
