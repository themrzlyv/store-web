import { Skeleton } from "@/ui/skeleton";

export function ProjectItemSkeleton() {
  return (
    <div className="w-full h-20 flex items-center gap-4">
      <div className="w-[110px] h-24 rounded-md">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="flex-1 h-full flex flex-col  gap-2">
        <div className="flex items-center gap-2">
          <Skeleton className="w-2/4 h-4" />
          <Skeleton className="w-10 h-5" />
        </div>
        <Skeleton className="w-3/4 h-4" />
        <div className="flex items-center gap-2 flex-wrap">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="w-10 h-4" />
          ))}
        </div>
      </div>
    </div>
  );
}
