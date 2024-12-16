import { Skeleton } from "@/ui/skeleton";

export function PostItemSkeleton() {
  return (
    <div className="w-full h-28 flex items-center gap-4">
      <div className="w-[110px] h-20 rounded-md">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="flex-1 h-full flex flex-col justify-center gap-4">
        <Skeleton className="w-full h-4" />
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full h-2" />
          <Skeleton className="w-3/4 h-2" />
        </div>
        <Skeleton className="w-2/4 h-3" />
      </div>
    </div>
  );
}
