import { Card, CardContent } from "@/components/ui/card";

const WithdrawalSkeleton = () => {
  const skeletonCards = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-9 w-80 bg-muted animate-pulse rounded mb-2" />
        <div className="h-5 w-96 bg-muted animate-pulse rounded" />
      </div>

      {/* Cards Skeleton */}
      <div className="space-y-4">
        {skeletonCards.map((index) => (
          <Card key={index} className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-muted animate-pulse rounded-full" />
                  <div className="space-y-2">
                    <div className="h-5 w-32 bg-muted animate-pulse rounded" />
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                      <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="h-8 w-24 bg-muted animate-pulse rounded" />
                  <div className="h-6 w-20 bg-muted animate-pulse rounded" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WithdrawalSkeleton;
