"use client";
import { AdminExperiencesPage } from "@/modules/admin/interface/ui/admin-experiences/admin-experiences.page";
import { useEffect, useState } from "react";

export default function AdminCreate() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return <AdminExperiencesPage />;
}
