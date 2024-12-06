"use client";
import { AdminSettingsPage } from "@/modules/admin/interface/ui/admin-settings/admin-settings.page";
import { useEffect, useState } from "react";

export default function AdminSettings() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return <AdminSettingsPage />;
}
