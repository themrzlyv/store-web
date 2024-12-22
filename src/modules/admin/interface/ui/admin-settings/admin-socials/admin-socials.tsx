"use client";
import { Input } from "@/ui";
import { Form, FormControl, FormField, FormItem } from "@/ui/form";
import { useAdminSocials } from "./use-admin-socials";
import { Save, UserRoundPen } from "lucide-react";
import Button from "@/ui/button";
import { Section } from "@/shared/components/section/section";
import { socialFields } from "@/shared/components/socials/data";

export function AdminSocials() {
  const {
    form,
    onSubmit,
    isEditMode,
    toggleEditMode,
  } = useAdminSocials();

  return (
    <div >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Section>
          <Section.Header
            title="Social Links"
            action={{
              icon: UserRoundPen,
              onClick: toggleEditMode,
              title: "Edit",
            }}
            subActions={[
              isEditMode && (
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="max-w-md w-full"
                >
                  <Save width={16} height={16} />
                  Save
                </Button>
              ),
            ]}
          />
          <div className="flex items-center flex-wrap">
            <Form {...form}>
              {socialFields.map(social => (
                <FormField
                  key={social.name}
                  control={form.control}
                  name={social.name}
                  render={({ field }) => (
                    <FormItem className="w-2/4 mb-6">
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-light-dark dark:bg-dark-lighter">
                            {social.icon}
                          </div>
                          <Input
                            {...field}
                            placeholder={social.placeholder}
                            className="m-0 py-1.5 w-[80%] disabled:bg-transparent disabled:ring-0"
                            disabled={!isEditMode}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </Form>
          </div>
        </Section>
      </form>
    </div>
  );
}
