import { menuRoutes } from "@/shared/data/routes";
import { LogoButton } from "../logo-button/logo-button";
import { footerSlots } from "./footer.slots";
import Link from "next/link";
import { Socials } from "../socials/socials";
import { useGetBioInformationQuery } from "@/modules/bio/infra/bio.api";
import { QueryTypes } from "@/shared/query-types/query-types";
import { useMemo } from "react";
import { Skeleton } from "@/ui/skeleton";
import { Typography } from "../typography/typography";

export function Footer() {
  const {
    footer,
    logoText,
    description,
    details,
    linksContainer,
    links,
    linksHeader,
    endText,
    socialContainer,
  } = footerSlots();

  const { data } = useGetBioInformationQuery(QueryTypes.BIO_INFO);

  const fullName = useMemo(() => {
    if (!data) return "";

    return [data.bio.firstName, data.bio.lastName].filter(Boolean).join(" ");
  }, [data]);

  return (
    <footer className={footer()}>
      <div className={details()}>
        <LogoButton textClass={logoText()} wrapperClass="p-0" />
        <div>
          {data ? (
            <Typography
              element="p"
              variant="small-text"
              className={description()}
            >
              {data?.bio.bio}
            </Typography>
          ) : (
            <>
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </>
          )}
        </div>
        <div className={socialContainer()}>
          <Socials />
        </div>
      </div>
      <div className={linksContainer()}>
        <Typography element="p" variant="small-bold" className={linksHeader()}>
          NAVIGATE
        </Typography>
        <Link href={"/"}>
          <Typography element="p" variant="small-medium" className={links()}>
            Home
          </Typography>
        </Link>
        {menuRoutes.map(route => (
          <Link key={route.path} href={route.path}>
            <Typography element="p" variant="small-medium" className={links()}>
              {route.name}
            </Typography>
          </Link>
        ))}
      </div>
      <div className={linksContainer()}>
        <Typography element="p" variant="small-bold" className={linksHeader()}>
          MISC
        </Typography>
        <Link href={"#"}>
          <Typography element="p" variant="small-medium" className={links()}>
            Back to Top
          </Typography>
        </Link>
      </div>
      <div className="col-span-2">
        {data ? (
          <Typography element="p" variant="small-text" className={endText()}>
            Developed by
            <Typography element="span" variant="small-medium">
              {fullName}
            </Typography>
          </Typography>
        ) : (
          <Skeleton className="h-4 w-2/4" />
        )}
      </div>
    </footer>
  );
}
