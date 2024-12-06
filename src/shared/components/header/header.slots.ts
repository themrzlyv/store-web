import { tv } from "tailwind-variants";

export const headerSlots = tv({
  slots: {
    header:
      "md:sticky fixed top-4 z-10 flex justify-center w-full items-center duration-500 ease-in-out transition-transform",
    headerContent:
      "flex flex-wrap relative w-full items-center justify-between mx-auto bg-light-dark/50 backdrop-blur ring-1 ring-primary-600/10 rounded-2xl p-2 overflow-hidden transition-all duration-500 md:max-w-[850px] dark:bg-dark-light/50 dark:ring-primary-200/15",
    headerLogo: " rounded-lg  hover:bg-light-darker hover:dark:bg-dark-lighter",
    menuButton:
      "p-4 cursor-pointer rounded-lg flex items-center justify-center  transition-colors hover:bg-light-darker hover:dark:bg-dark-lighter ",
    navContainer: "flex items-center gap-2 md:hidden",
  },
  variants: {
    isHeaderVisible: {
      false: {
        header: "md:-translate-y-24",
      },
    },
    isMenuOpen: {
      true: {
        headerContent: "max-h-screen",
      },
      false: {
        headerContent: "max-h-[78px]",
      },
    },
  },
});
