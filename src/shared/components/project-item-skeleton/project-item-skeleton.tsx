import { Skeleton } from "@/ui/skeleton";

export function ProjectItemSkeleton() {
  return (
    <div className="w-full h-24 flex items-center gap-4">
      <div className="w-[110px] h-24 rounded-md">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="flex-1 h-full flex flex-col justify-center gap-2">
        <Skeleton className="w-2/4 h-4" />
        <Skeleton className="w-2/4 h-4" />
      </div>
    </div>
  );
}
