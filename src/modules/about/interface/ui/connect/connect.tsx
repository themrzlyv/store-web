"use client";
import { useGetBioInformationQuery } from "@/modules/bio/infra/bio.api";
import { Socials } from "@/shared/components/socials/socials";
import { Typography } from "@/shared/components/typography/typography";
import { QueryTypes } from "@/shared/query-types/query-types";
import { Skeleton } from "@/ui/skeleton";

export function Connect() {
  const { data } = useGetBioInformationQuery(QueryTypes.BIO_INFO);

  return (
    <div className="flex flex-col gap-4">
      <h4>Let's connect!</h4>
      {data ? (
        <Typography variant="content-text" element="p">
          Feel free to reach out to me at
          <Typography variant="link" href="#" element="a" className="mx-1">
            {data?.bio.social.mail}
          </Typography>
          , or find me on social media:
        </Typography>
      ) : (
        <Skeleton className="w-3/4 h-5" />
      )}
      <div className="flex items-center gap-4">
        <Socials />
      </div>
    </div>
  );
}
