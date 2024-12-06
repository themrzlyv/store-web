"use client";
import { AppLayout } from "@/shared/components/app-layout/app-layout";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }
  return <AppLayout>{children}</AppLayout>;
}
