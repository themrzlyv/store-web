import { Typography } from "@/shared/components/typography/typography";
import { Input } from "@/ui";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import { useExperienceForm } from "./use-experience-form";
import Button from "@/ui/button";
import { ExperienceEntity } from "@/modules/experiences/domain/entities/experience.entity";
import { Checkbox } from "@/ui/checkbox";
import { UploadImage } from "@/modules/upload/interface/upload-image/upload-image";
import DatePicker from "react-datepicker";
import { CalendarIcon } from "lucide-react";
import { parseISO } from "date-fns";

type Props = {
  experience?: ExperienceEntity;
  isEdit?: boolean;
};

export function ExperienceForm({ experience, isEdit }: Props) {
  const {
    form,
    onSubmit,
    isLoading,
    isDisabledEndDate,
    handleChangeUploadLoading,
  } = useExperienceForm({
    experience,
    isEdit,
  });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="h-full w-full space-y-6"
    >
      <Form {...form}>
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <Typography element="p" variant="label">
                Position
              </Typography>
              <FormControl>
                <Input placeholder="Position" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <Typography element="p" variant="label">
                Company
              </Typography>
              <FormControl>
                <Input placeholder="Company" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyUrl"
          render={({ field }) => (
            <FormItem>
              <Typography element="p" variant="label">
                Company URL
              </Typography>
              <FormControl>
                <Input placeholder="Company URL" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-2">
          <Typography element="p" variant="label">
            Time period
          </Typography>
          <div className="flex items-center gap-4">
            <DatePicker
              showIcon
              maxDate={new Date()}
              selected={form.watch("startDate")}
              wrapperClassName="flex-1 ring-1 py-1 bg-white dark:bg-dark-light ring-primary-600/10 dark:ring-primary-200/15 rounded-md"
              className="outline-none w-5/6 bg-transparent focus:ring-0 ml-1"
              onChange={date => {
                if (date) form.setValue("startDate", date);
                form.setValue("endDate", null);
              }}
              dateFormat={"MMMM d, yyyy"}
              placeholderText="Pick a date"
              icon={<CalendarIcon className="top-0.5 text-gray-600" />}
            />

            <DatePicker
              showIcon
              wrapperClassName="flex-1 py-1 ring-1 bg-white dark:bg-dark-light ring-primary-600/10 dark:ring-primary-200/15 rounded-md"
              className="outline-none bg-transparent focus:ring-0 ml-1"
              selected={form.watch("endDate")}
              onChange={date => form.setValue("endDate", date)}
              isClearable
              minDate={form.watch("startDate") || undefined}
              disabled={isDisabledEndDate}
              dateFormat={"MMMM d, yyyy"}
              placeholderText="Pick a date"
              icon={<CalendarIcon className="top-0.5 text-gray-600" />}
            />
          </div>
          <FormField
            control={form.control}
            name="present"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4 mt-4 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={checked => {
                      field.onChange(checked);
                      form.setValue("endDate", null);
                    }}
                  />
                </FormControl>
                <FormLabel className="text-gray-400">Present</FormLabel>
              </FormItem>
            )}
          />
        </div>

        <UploadImage form={form} onLoadingChange={handleChangeUploadLoading} />

        <Button
          variant="primary"
          type="submit"
          size="md"
          className="w-full"
          disabled={isLoading}
          isLoading={isLoading}
        >
          Save
        </Button>
      </Form>
    </form>
  );
}
