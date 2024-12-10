import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

type Props = {
  className?: string;
};

export function SwitchTheme({ className }: Props) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      className={cn(
        "flex",
        "items-center",
        "justify-center",
        "py-2 px-2.5",
        "cursor-pointer",
        "rounded-lg",
        "transition-colors",
        "hover:bg-light-darker",
        "hover:dark:bg-dark-lighter",
        className && className
      )}
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <Sun width={20} height={20} className="text-primary-default" />
      ) : (
        <Moon width={20} height={20} className="text-primary-300" />
      )}
    </div>
  );
}
