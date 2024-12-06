"use client";
import { AdminCreatePage } from "@/modules/admin/interface/ui/admin-create/admin-create.page";
import { useEffect, useState } from "react";

export default function AdminCreate() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return <AdminCreatePage />;
}
