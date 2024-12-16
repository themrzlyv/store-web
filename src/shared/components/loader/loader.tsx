import { useAppSelector } from "@/lib/store";
import { Loader as LucideLoader } from "lucide-react";

export function Loader() {
  const { isLoading } = useAppSelector(state => state.loader);

  if (!isLoading) return null;

  return (
    <div className="fixed w-full h-full flex items-center justify-center top-0 left-0  backdrop-blur-sm opacity-100 z-20">
      <LucideLoader size={30} className="animate-spin text-gray-500" />
    </div>
  );
}
