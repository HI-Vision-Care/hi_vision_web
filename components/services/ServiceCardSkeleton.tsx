// components/services/ServiceCardSkeleton.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ServiceCardSkeleton() {
  return (
    <Card className="rounded-2xl shadow p-0 mb-4">
      <Skeleton className="h-40 w-full rounded-t-2xl" />
      <CardContent className="pt-4 pb-6 px-5 flex flex-col gap-3">
        <Skeleton className="h-6 w-3/4 rounded" />
        <Skeleton className="h-4 w-1/2 rounded" />
        <Skeleton className="h-5 w-1/4 rounded" />
        <div className="flex gap-2 mt-4">
          <Skeleton className="h-9 w-20 rounded-full" />
          <Skeleton className="h-9 w-20 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}
