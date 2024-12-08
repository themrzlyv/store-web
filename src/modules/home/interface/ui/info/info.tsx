"use client";
import { cn } from "@/lib/utils";
import { useGetBioInformationQuery } from "@/modules/bio/infra/bio.api";
import { Socials } from "@/shared/components/socials/socials";
import { Typography } from "@/shared/components/typography/typography";
import { VerifiedIcon } from "@/shared/icons";
import { QueryTypes } from "@/shared/query-types/query-types";
import { Img } from "@/ui";
import Button from "@/ui/button";
import { Skeleton } from "@/ui/skeleton";
import { Bio } from "@prisma/client";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export function Info() {
  const router = useRouter();

  const { data } = useGetBioInformationQuery(QueryTypes.BIO_INFO);

  const fullName = useMemo(() => {
    if (!data) return "";

    return [data.bio.firstName, data.bio.lastName].filter(Boolean).join(" ");
  }, [data]);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between flex-col-reverse md:flex-row py-3">
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-4xl flex items-center gap-1 dark:text-dark-light-gray">
            <span
              role="img"
              aria-label={"waving hand"}
              className="inline-block motion-safe:animate-pulse"
            >
              {!data ? (
                <Skeleton className="w-[250px] h-10" />
              ) : (
                "👋 Hello, World"
              )}
            </span>
          </h1>

          <h1 className="flex items-center gap-2 text-2xl shadow-primary-300 dark:text-dark-light-gray">
            {!data ? (
              <Skeleton className="w-[250px] h-5" />
            ) : (
              <>
                <span>
                  I am <span>{fullName}</span>
                </span>
                <VerifiedIcon />
              </>
            )}
          </h1>

          {!data ? (
            <>
              <Skeleton className="w-3/4 h-4" />
              <Skeleton className="w-3/4 h-4" />
            </>
          ) : (
            <Typography
              variant="content-text"
              element="p"
              className="max-w-[34rem] "
            >
              {data?.bio?.bio}
            </Typography>
          )}
        </div>
        <div className="flex w-48 h-48 mb-5 md:mb-0">
          {data?.bio.image ? (
            <Img
              src={data?.bio.image}
              alt={fullName}
              width={200}
              height={120}
              priority
              className={cn("rounded-full")}
            />
          ) : (
            <Skeleton className="w-48 h-48 rounded-full" />
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        {data ? (
          <Button
            variant="primary"
            size="lg"
            className="flex items-center gap-2 font-bold"
            onClick={() => router.push("/about")}
          >
            <User />
            More about me
          </Button>
        ) : (
          <Skeleton className="w-[200px] h-14" />
        )}
        <div className="flex gap-2 items-center">
          <Socials />
        </div>
      </div>
    </section>
  );
}
