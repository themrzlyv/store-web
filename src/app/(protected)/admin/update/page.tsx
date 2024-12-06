"use client";
import { AdminUpdatePage } from "@/modules/admin/interface/ui/admin-update/admin-update.page";
import { useEffect, useState } from "react";

export default function AdminUpdate() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return <AdminUpdatePage />;
}
