"use client";
import { useGetBioInformationQuery } from "@/modules/bio/infra/bio.api";
import { AdminUpdatePhoto } from "./admin-update-photo/admin-update-photo";
import { UpdateBioForm } from "@/modules/bio/interface/ui/update-bio-form/update-bio-form";
import { AdminSkills } from "./admin-skills/admin-skills";
import { AdminSocials } from "./admin-socials/admin-socials";
import { QueryTypes } from "@/shared/query-types/query-types";

export function AdminSettingsPage() {
  const { data, isLoading } = useGetBioInformationQuery(QueryTypes.BIO_INFO);

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-8 py-8">
      <div className="flex items-center">
        <div className="flex-1">
          <AdminUpdatePhoto />
        </div>
        <div className="flex-1">
          <UpdateBioForm />
        </div>
      </div>
      <AdminSkills />
      <AdminSocials />
    </div>
  );
}
