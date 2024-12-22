"use client";
import { UpdateExperiencesPage } from "@/modules/admin/interface/ui/admin-update/update-experiences/update-experiences.page";
import { useEffect, useState } from "react";

export default function AdminCreate() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return <UpdateExperiencesPage />;
}
