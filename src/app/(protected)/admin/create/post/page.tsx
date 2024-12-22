"use client";
import { CreatePostPage } from "@/modules/admin/interface/ui/admin-create/create-post-page/create-post.page";
import { useEffect, useState } from "react";

export default function AdminCreate() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return <CreatePostPage />;
}
