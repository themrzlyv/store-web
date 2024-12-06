import { toFormData } from "@/lib/utils";
import { useUpdateBioMutation } from "@/modules/bio/infra/bio.api";
import { BioInformationFormInputType } from "@/modules/bio/infra/types/update-bio.input";
import { Section } from "@/shared/components/section/section";
import { Skills } from "@/shared/components/skills/skills";
import { Input } from "@/ui";
import { Plus } from "lucide-react";
import React from "react";

export function AdminSkills() {
  const [updateBioInformation, { isLoading }] = useUpdateBioMutation();

  const addInputRef = React.useRef<HTMLInputElement>(null);

  const addNewSkill = () => {
    const name = addInputRef.current?.value;
    if (!name) return;
    const formData = toFormData<Partial<BioInformationFormInputType>>({
      skill: name,
    });
    updateBioInformation(formData).then(() => {
      if (addInputRef.current) {
        addInputRef.current.value = "";
      }
    });
  };

  const removeSkill = (id: number) => {
    const formData = toFormData<Partial<BioInformationFormInputType>>({
      skillId: id,
    });
    updateBioInformation(formData);
  };

  return (
    <div className="px-3 py-5 gap-3 border-t">
      <Section>
        <Section.Header title="Skills" />
        <div className="flex gap-8">
          <Skills handleRemoveSkill={removeSkill} />
          <div className="relative">
            <Input
              ref={addInputRef}
              placeholder="Add new skill"
              className="max-w-52 w-full m-0 px-5"
              autoFocus={false}
              maxLength={15}
              disabled={isLoading}
            />
            <div
              onClick={addNewSkill}
              className="absolute right-2 top-2 p-2 cursor-pointer rounded-full hover:bg-gray-100 "
            >
              <Plus width={16} height={16} />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
