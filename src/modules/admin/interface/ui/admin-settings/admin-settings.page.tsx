"use client";
import { useGetBioInformationQuery } from "@/modules/bio/infra/bio.api";
import { AdminUpdatePhoto } from "./admin-update-photo/admin-update-photo";
import { UpdateBioForm } from "@/modules/bio/interface/ui/update-bio-form/update-bio-form";
import { AdminSkills } from "./admin-skills/admin-skills";
import { AdminSocials } from "./admin-socials/admin-socials";
import { QueryTypes } from "@/shared/query-types/query-types";
import { AboutForm } from "@/modules/bio/interface/ui/about-form/about-form";

export function AdminSettingsPage() {
  const { data, isLoading } = useGetBioInformationQuery(QueryTypes.BIO_INFO);

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-8 pb-5">
      <div className="flex items-center dark:bg-dark-light rounded-lg p-4">
        <div className="flex-1">
          <AdminUpdatePhoto />
        </div>
        <div className="flex-1">
          <UpdateBioForm />
        </div>
      </div>
      <div className="dark:bg-dark-light rounded-lg p-4">
        <AboutForm showEditMode />
      </div>
      <div className="dark:bg-dark-light rounded-lg p-4">
        <AdminSkills />
      </div>
      <div className="dark:bg-dark-light rounded-lg p-4">
        <AdminSocials />
      </div>
    </div>
  );
}
