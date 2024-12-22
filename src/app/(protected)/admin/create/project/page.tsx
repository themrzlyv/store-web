"use client";
import { CreateProjectPage } from "@/modules/admin/interface/ui/admin-create/create-project-page/create-project.page";
import { useEffect, useState } from "react";

export default function AdminCreate() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return <CreateProjectPage />;
}
