import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createWallet,
  depositToWallet,
  getWalletByAccountId,
  vnpayCallback,
} from "./api";

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
