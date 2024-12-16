import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  active?: boolean;
  onClick?(): void;
};

export function ToolButton({ children, active, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("p-2 rounded-md dark:text-white", active ? "bg-dark-default dark:bg-light-default dark:text-dark-light text-white" : "text-black")}
    >
      {children}
    </button>
  );
}
