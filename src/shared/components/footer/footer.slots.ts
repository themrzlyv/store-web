import { tv } from "tailwind-variants";

export const footerSlots = tv({
  slots: {
    footer:
      " md:max-w-[850px] mx-auto w-full grid grid-cols-2 gap-6 md:grid-cols-4 md:grid-rows-[1fr_auto] md:gap-y-4 md:pt-8 md:pb-8 border-t px-3 pt-6 pb-8",
    logoText: "hover:underline",
    details: "flex flex-col col-span-2 gap-4",
    description: "text-pretty text-lg max-w-[30ch] dark:text-dark-light-gray",
    linksContainer: "flex flex-col row-span-2 gap-3",
    links: "text-pretty text-lg underline dark:text-dark-light-gray/80",
    linksHeader: "text-pretty text-lg font-bold mb-5 dark:text-dark-light-gray/80",
    socialContainer: "flex items-center row-span-2 gap-3",
    endText: "text-base font-semibold dark:text-dark-light-gray/80",
  },
});
