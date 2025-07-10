/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/config/axios";
import { Transaction } from "./types";

export async function transferToAppointment(
  appointmentId: string,
  accountId: string
): Promise<any> {
  const res = await axiosInstance.put(
    `/transaction/transferToAppointment/${appointmentId}/${accountId}`
  );
  return res.data;
}

export async function getAllTransactions(): Promise<Transaction[]> {
  const res = await axiosInstance.get<Transaction[]>("/transaction");
  return res.data;
}

export async function getTransactionsByAccountId(
  accountId: string
): Promise<Transaction[]> {
  const res = await axiosInstance.get<Transaction[]>(
    `/transaction/view/${accountId}`
  );
  return res.data;
}
