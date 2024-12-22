"use client";
import { CreateExperiencePage } from "@/modules/admin/interface/ui/admin-create/create-experience-page/create-experience.page";
import { useEffect, useState } from "react";

export default function AdminCreate() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return <CreateExperiencePage />;
}
