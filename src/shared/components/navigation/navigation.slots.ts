import { tv } from "tailwind-variants";

export const navigationSlots = tv({
  slots: {
    root: "w-full flex flex-col mt-5 md:mt-0 md:w-auto transition-all md:flex md:flex-row gap-0 md:gap-1.5",
    navigationItem:
      "px-2.5 py-2 flex items-center justify-center cursor-pointer rounded-lg  transition-colors duration-200 hover:bg-light-darker hover:dark:bg-dark-lighter",
    itemText: "",
  },
  variants: {
    isActive: {
      true: {
        itemText: "text-secondary-default dark:text-secondary-default",
      },
    },
  },
});
