import { menuRoutes } from "@/shared/data/routes";
import { LogoButton } from "../logo-button/logo-button";
import { footerSlots } from "./footer.slots";
import Link from "next/link";
import { Socials } from "../socials/socials";
import { useGetBioInformationQuery } from "@/modules/bio/infra/bio.api";
import { QueryTypes } from "@/shared/query-types/query-types";
import { useMemo } from "react";
import { Skeleton } from "@/ui/skeleton";

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
            <p className={description()}>{data?.bio.bio}</p>
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
        <p className={linksHeader()}>NAVIGATE</p>
        <Link href={"/"}>
          <p className={links()}>Home</p>
        </Link>
        {menuRoutes.map(route => (
          <Link key={route.path} href={route.path}>
            <p className={links()}>{route.name}</p>
          </Link>
        ))}
      </div>
      <div className={linksContainer()}>
        <p className={linksHeader()}>MISC</p>
        <Link href={"#"}>
          <p className={links()}>Donate</p>
        </Link>
        <Link href={"#"}>
          <p className={links()}>Contact</p>
        </Link>
        <Link href={"#"}>
          <p className={links()}>Back to Top</p>
        </Link>
      </div>
      <div className="col-span-2">
        {data ? (
          <p className={endText()}>Developed by {fullName}</p>
        ) : (
          <Skeleton className="h-4 w-2/4" />
        )}
      </div>
    </footer>
  );
}
