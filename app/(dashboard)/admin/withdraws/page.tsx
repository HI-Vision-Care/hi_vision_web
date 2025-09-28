"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  CreditCardIcon,
  UserIcon,
  PhoneIcon,
  MailIcon,
  BuildingIcon,
} from "lucide-react";
import { RequestWithdrawResponse } from "@/services/wallet/types";
import {
  useAllWithdraw,
  useApproveWithdraw,
  useRejectWithdraw,
} from "@/services/wallet/hooks";
import { useAccountId } from "@/hooks/useAccountId";
import { useGetUserProfile } from "@/services/account/hook";
import { StaffProfile } from "@/services/account/types";
import EmptyWithdrawState from "@/components/withdraw/EmptyWithdrawState";
import WithdrawalSkeleton from "@/components/withdraw/WithdrawalSkeleton";

// ====================== Utils ======================
const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "APPROVED":
      return "bg-green-100 text-green-800 border-green-200";
    case "REJECTED":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const formatAmount = (amount: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    amount
  );

// ====================== Component ======================
const WithdrawalList = () => {
  // 🟢 gọi API thật
  const { data, isLoading, isError, error } = useAllWithdraw(true);
  const { mutate: approve, isPending: approving } = useApproveWithdraw();
  const { mutate: reject, isPending: rejecting } = useRejectWithdraw();

  // Lấy staffId từ hồ sơ
  const accountId = useAccountId();
  const { data: profile } = useGetUserProfile(accountId, "STAFF");
  const staffId = (profile as StaffProfile)?.staffId;

  // Dùng trực tiếp dữ liệu từ BE
  const withdrawals: RequestWithdrawResponse[] = data ?? [];

  const [selectedWithdrawal, setSelectedWithdrawal] =
    useState<RequestWithdrawResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Có thể hành động khi còn PENDING và có staffId
  const canAct =
    !!staffId &&
    !!selectedWithdrawal &&
    selectedWithdrawal.status === "PENDING";

  // ====== Loading & Error state ======
  if (isLoading) {
    return <WithdrawalSkeleton />;
  }

  if (isError) {
    return (
      <div className="container mx-auto p-6 max-w-6xl">
        <p className="text-red-600">
          Không tải được dữ liệu: {String((error as Error)?.message || error)}
        </p>
      </div>
    );
  }

  // Empty state when no withdrawals
  if (withdrawals.length === 0) {
    return <EmptyWithdrawState />;
  }

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

      {/* Withdrawal List */}
      <div className="space-y-4">
        {withdrawals.map((withdrawal) => (
          <Card
            key={withdrawal.withdrawId}
            className="cursor-pointer hover:shadow-md transition-shadow duration-200 border-border"
            onClick={() => {
              setSelectedWithdrawal(withdrawal);
              setIsModalOpen(true);
            }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={withdrawal.account.avatar || "/placeholder.svg"}
                      alt={withdrawal.account.username}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {withdrawal.account.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">
                        {withdrawal.accountName}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {withdrawal.account.role}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BuildingIcon className="h-3 w-3" />
                        {withdrawal.bankName}
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        {withdrawal.withdrawDate}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <div className="text-2xl font-bold text-foreground">
                    {formatAmount(withdrawal.amount)}
                  </div>
                  <Badge className={getStatusColor(withdrawal.status)}>
                    {withdrawal.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Withdrawal Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-foreground">
              Withdrawal Request Details
            </DialogTitle>
          </DialogHeader>

          {selectedWithdrawal && (
            <div className="space-y-6">
              {/* Patient Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <UserIcon className="h-5 w-5 text-primary" />
                    Patient Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={
                          selectedWithdrawal.account.avatar ||
                          "/placeholder.svg"
                        }
                        alt={selectedWithdrawal.account.username}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary text-lg">
                        {selectedWithdrawal.account.username
                          .charAt(0)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-foreground">
                        {selectedWithdrawal.account.username}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {selectedWithdrawal.account.role}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MailIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Email:</span>
                        <span className="text-foreground">
                          {selectedWithdrawal.account.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Phone:</span>
                        <span className="text-foreground">
                          {selectedWithdrawal.account.phone}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2" />
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* Withdrawal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCardIcon className="h-5 w-5 text-primary" />
                    Withdrawal Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Amount
                        </span>
                        <p className="text-2xl font-bold text-foreground">
                          {formatAmount(selectedWithdrawal.amount)}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Status
                        </span>
                        <div className="mt-1">
                          <Badge
                            className={getStatusColor(
                              selectedWithdrawal.status
                            )}
                          >
                            {selectedWithdrawal.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Account Name
                        </span>
                        <p className="font-semibold text-foreground">
                          {selectedWithdrawal.accountName}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Account Number
                        </span>
                        <p className="font-mono text-foreground">
                          {selectedWithdrawal.accountNumber}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Bank Name
                        </span>
                        <p className="font-semibold text-foreground">
                          {selectedWithdrawal.bankName}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Withdrawal Date
                      </span>
                      <p className="font-semibold text-foreground">
                        {selectedWithdrawal.withdrawDate}
                      </p>
                    </div>
                  </div>

                  {selectedWithdrawal.description && (
                    <div className="pt-2">
                      <span className="text-sm text-muted-foreground">
                        Description
                      </span>
                      <p className="text-foreground">
                        {selectedWithdrawal.description}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>

            {/* Chỉ show 2 nút khi còn PENDING */}
            {canAct && (
              <>
                <Button
                  variant="destructive"
                  disabled={rejecting}
                  onClick={() => {
                    const description =
                      window.prompt("Nhập lý do từ chối:", "")?.trim() || "";
                    if (!description) return;
                    reject(
                      {
                        withdrawId: selectedWithdrawal!.withdrawId,
                        staffId,
                        description,
                      },
                      {
                        onSuccess: () => setIsModalOpen(false),
                      }
                    );
                  }}
                >
                  {rejecting ? "Rejecting..." : "Reject"}
                </Button>

                <Button
                  className="bg-green-500 hover:bg-green-600"
                  disabled={approving}
                  onClick={() => {
                    approve(
                      { withdrawId: selectedWithdrawal!.withdrawId, staffId },
                      { onSuccess: () => setIsModalOpen(false) }
                    );
                  }}
                >
                  {approving ? "Approving..." : "Approve"}
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WithdrawalList;
