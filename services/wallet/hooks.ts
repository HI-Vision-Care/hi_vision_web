import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  approveWithdraw,
  createWallet,
  depositToWallet,
  getAllWithdraw,
  getWalletByAccountId,
  rejectWithdraw,
  vnpayCallback,
} from "./api";
import {
  ApproveWithdrawResponse,
  GetAllWithdrawResponse,
  RejectWithdrawResponse,
} from "./types";

export function useDepositToWallet() {
  return useMutation({
    mutationFn: ({
      accountId,
      balance,
    }: {
      accountId: string;
      balance: number;
    }) => depositToWallet(accountId, balance),
  });
}

export function useCreateWallet() {
  return useMutation({
    mutationFn: ({
      accountId,
      balance,
    }: {
      accountId: string;
      balance: number;
    }) => createWallet(accountId, balance),
  });
}

export function useVnpayCallback() {
  return useMutation({
    mutationFn: ({
      vnp_TxnRef,
      vnp_ResponseCode,
      vnp_Amount,
    }: {
      vnp_TxnRef: string;
      vnp_ResponseCode: string;
      vnp_Amount: string;
    }) => vnpayCallback(vnp_TxnRef, vnp_ResponseCode, vnp_Amount),
  });
}

export function useWalletByAccountId(accountId: string, options = {}) {
  return useQuery({
    queryKey: ["wallet", accountId],
    queryFn: () => getWalletByAccountId(accountId),
    enabled: !!accountId, // Chỉ fetch khi có accountId
    ...options,
  });
}

export function useAllWithdraw(enabled = true) {
  return useQuery<GetAllWithdrawResponse, Error>({
    queryKey: ["withdraw", "all"],
    queryFn: getAllWithdraw,
    enabled,
  });
}

export function useApproveWithdraw() {
  const qc = useQueryClient();
  return useMutation<
    ApproveWithdrawResponse,
    Error,
    { withdrawId: number; staffId: string }
  >({
    mutationFn: ({ withdrawId, staffId }) =>
      approveWithdraw(withdrawId, staffId),
    onSuccess: () => {
      // làm tươi danh sách
      qc.invalidateQueries({ queryKey: ["withdraw", "all"] });
    },
  });
}

export function useRejectWithdraw() {
  const qc = useQueryClient();
  return useMutation<
    RejectWithdrawResponse,
    Error,
    { withdrawId: number; staffId: string; description: string }
  >({
    mutationFn: ({ withdrawId, staffId, description }) =>
      rejectWithdraw(withdrawId, staffId, { description }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["withdraw", "all"] });
    },
  });
}
