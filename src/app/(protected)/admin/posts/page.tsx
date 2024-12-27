"use client";
import { AdminPostsPage } from "@/modules/admin/interface/ui/admin-posts/admin-posts.page";
import { useEffect, useState } from "react";

export default function AdminCreate() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return <AdminPostsPage />;
}
