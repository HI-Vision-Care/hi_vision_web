import { Loader2, Wallet } from "lucide-react";

const EmptyWithdrawState = () => {
  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">
          Medical Withdrawal Management
        </h1>
        <p className="text-muted-foreground text-pretty">
          Manage and review patient withdrawal requests with detailed
          information and approval controls.
        </p>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-muted/20 p-6 rounded-full mb-6">
          <Wallet className="h-16 w-16 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          No Withdrawal Requests
        </h2>
        <p className="text-muted-foreground max-w-md mb-6">
          There are currently no withdrawal requests to review. All requests
          will appear here when patients submit them for approval.
        </p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Waiting for withdrawal requests...</span>
        </div>
      </div>
    </div>
  );
};

export default EmptyWithdrawState;
