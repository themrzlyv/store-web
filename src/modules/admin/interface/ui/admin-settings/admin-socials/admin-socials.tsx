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
    isLoading: isUpdateFormLoading,
  } = useAdminSocials();

  return (
    <div className="border-t py-3">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Section>
          <Section.Header
            title="Social Links"
            action={
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="md"
                  type="button"
                  onClick={toggleEditMode}
                >
                  <UserRoundPen width={22} height={22} />
                </Button>
                {isEditMode && (
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="max-w-md w-full"
                    isLoading={isUpdateFormLoading}
                  >
                    <Save width={22} height={22} />
                  </Button>
                )}
              </div>
            }
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
                          <div className="p-3 rounded-lg bg-light-dark dark:bg-dark-lighter">
                            <social.icon />
                          </div>
                          <Input
                            {...field}
                            placeholder="Github URL"
                            className="m-0"
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
