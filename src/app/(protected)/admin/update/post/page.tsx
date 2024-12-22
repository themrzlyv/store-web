"use client";
import { UpdatePostsPage } from "@/modules/admin/interface/ui/admin-update/update-posts/update-posts.page";
import { useEffect, useState } from "react";

export default function AdminCreate() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return <UpdatePostsPage />;
}
