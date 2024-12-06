"use client";
import { AdminLayout } from "@/shared/components/admin-layout/admin-layout";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return <AdminLayout>{children}</AdminLayout>;
}
