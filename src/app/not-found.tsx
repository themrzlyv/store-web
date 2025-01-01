import { AppLayout } from "@/shared/components/app-layout/app-layout";
import { Typography } from "@/shared/components/typography/typography";
import Link from "next/link";

export default function NotFound() {
  return (
    <AppLayout>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Typography variant="content-text" element="h4">
          Page Not Found!
        </Typography>
        <Typography variant="content-text" element="p" className="flex gap-1">
          Go back to the
          <Typography
            variant="content-text"
            element={Link}
            href="/"
            className="text-primary-500 dark:text-primary-500 hover:underline"
          >
            home page.
          </Typography>
        </Typography>
      </div>
    </AppLayout>
  );
}
