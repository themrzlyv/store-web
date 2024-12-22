"use client";

import { useUserLogoutMutation } from "@/modules/auth/infra/auth.api";
import { useCurrentUserQuery } from "@/modules/user/infra/user.api";
import Button from "@/ui/button";
import { useRouter } from "next/navigation";
import { Typography } from "../typography/typography";
import { DEFAULT_UNAUTHORIZED_REDIRECT_URL } from "@/shared/data/constants";
import { SwitchTheme } from "../switch-theme/switch-theme";

export function AdminHeader() {
  const router = useRouter();
  const [logoutMutation] = useUserLogoutMutation();
  const { data: currentUser } = useCurrentUserQuery();

  const handleLogout = () => {
    logoutMutation().then(() => router.push(DEFAULT_UNAUTHORIZED_REDIRECT_URL));
  };

  return (
    <div className="w-full h-16 shadow-sm bg-white dark:bg-dark-light flex justify-end items-center px-4">
      <div className="flex items-center gap-4">
        <SwitchTheme />
        <Typography variant="menu-text" element="p">
          {currentUser?.user.email}
        </Typography>
        <Button variant="ghost" size="md" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}
