import { tv } from "tailwind-variants";

export const footerSlots = tv({
  slots: {
    footer:
      " md:max-w-[670px] mx-auto w-full grid grid-cols-2 gap-6 md:grid-cols-4 md:grid-rows-[1fr_auto] md:gap-y-4 md:p-6 border-t px-3 pt-6 pb-8",
    logoText: "hover:underline text-base",
    details: "flex flex-col col-span-2 gap-2",
    description: "text-pretty md:max-w-[30ch] max-w-full",
    linksContainer: "flex flex-col row-span-2 gap-2",
    links: "text-pretty underline dark:text-dark-light-gray/80",
    linksHeader:
      "text-pretty mb-3 text-gray-600/80 dark:text-dark-light-gray/80",
    socialContainer: "flex items-center row-span-2 gap-2",
    endText: "flex gap-1 dark:text-dark-light-gray/80",
  },
});
