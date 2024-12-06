"use client";
import { useGetBioInformationQuery } from "@/modules/bio/infra/bio.api";
import { Typography } from "@/shared/components/typography/typography";
import { QueryTypes } from "@/shared/query-types/query-types";
import { Skeleton } from "@/ui/skeleton";
import { useMemo } from "react";

export function Info() {
  const { data, isLoading } = useGetBioInformationQuery(QueryTypes.BIO_INFO);

  const fullName = useMemo(() => {
    if (!data) return "";

    return [data.bio.firstName, data.bio.lastName].filter(Boolean).join(" ");
  }, [data]);

  if (isLoading || !data) {
    return (
      <div className="flex flex-col gap-6  max-w-[105ch]">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-full h-5" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6  max-w-[105ch]">
      <Typography variant="content-text" element="p">
        👋 Hey there! I'm {fullName}, a full-stack software engineer from
        Azerbaijan with over four (4) years of professional experience. My
        pronouns are he/they.
      </Typography>
      <Typography variant="content-text" element="p">
        I focus on details and I'm passionate about crafting software products
        that look great and are both accessible and easy to maintain.
      </Typography>
      <Typography variant="content-text" element="p">
        I'm a huge advocate for open source and collaborating with the
        community. You can find my stash of websites, libraries, and apps on
        <Typography
          element="a"
          variant="link"
          href={data.bio.social.github}
          className="mx-1"
        >
          GitHub
        </Typography>
        which have earned over 2K stars.
      </Typography>

      <Typography variant="content-text" element="p">
        I'm all about diving into challenges improving and expanding my skillset
        and I thrive in globally-remote teams that value people and embrace
        trust, kindness, and inclusion.
      </Typography>
    </div>
  );
}
