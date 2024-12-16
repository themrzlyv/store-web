import { useAppDispatch } from "@/lib/store";
import { useUpdateBioMutation } from "@/modules/bio/infra/bio.api";
import { setLoading } from "@/shared/components/loader/loader.slice";
import { Section } from "@/shared/components/section/section";
import { Skills } from "@/shared/components/skills/skills";
import { Input } from "@/ui";
import React, { useEffect } from "react";

export function AdminSkills() {
  const dispatch = useAppDispatch();
  const [updateBioInformation, { isLoading }] = useUpdateBioMutation();

  const addInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(setLoading({ isLoading }));
  }, [dispatch, isLoading]);

  const addNewSkill = () => {
    const name = addInputRef.current?.value;
    if (!name) return;
    updateBioInformation({ skill: name }).then(() => {
      if (addInputRef.current) {
        addInputRef.current.value = "";
      }
    });
  };

  const removeSkill = (id: number) => {
    updateBioInformation({ skillId: id });
  };

  return (
    <div className="px-3 py-5 gap-3 border-t">
      <Section>
        <Section.Header title="Skills" />
        <div className="flex gap-4">
          <Skills handleRemoveSkill={removeSkill} />
          <Input
            ref={addInputRef}
            placeholder="Add new skill"
            className="max-w-36 w-full m-0 py-1 px-3"
            autoFocus={false}
            maxLength={15}
            disabled={isLoading}
            onKeyDown={e => e.key === "Enter" && addNewSkill()}
          />
        </div>
      </Section>
    </div>
  );
}
