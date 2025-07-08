import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAllTransactions,
  getTransactionsByAccountId,
  transferToAppointment,
} from "./api";

export function useTransferToAppointment() {
  return useMutation({
    mutationFn: ({
      appointmentId,
      accountId,
    }: {
      appointmentId: string;
      accountId: string;
    }) => transferToAppointment(appointmentId, accountId),
  });
}
export function useAllTransactions(options = {}) {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: getAllTransactions,
    ...options,
  });
}

export function useTransactionsByAccountId(accountId: string, options = {}) {
  return useQuery({
    queryKey: ["transactions", accountId],
    queryFn: () => getTransactionsByAccountId(accountId),
    enabled: !!accountId,
    ...options,
  });
}
