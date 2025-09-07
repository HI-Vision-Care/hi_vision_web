/* eslint-disable @typescript-eslint/no-explicit-any */
// Thêm vào src/services/account/api.ts hoặc src/services/wallet/api.ts nếu tách module

import axiosInstance from "@/config/axios";
import {
  ApproveWithdrawResponse,
  GetAllWithdrawResponse,
  RejectWithdrawPayload,
  RejectWithdrawResponse,
} from "./types";

export async function depositToWallet(
  accountId: string,
  balance: number
): Promise<void> {
  await axiosInstance.put(`/wallet/deposit/${accountId}`, { balance });
}

// Nếu đã có axiosInstance
export async function createWallet(
  accountId: string,
  balance: number
): Promise<void> {
  await axiosInstance.post(`/wallet/${accountId}`, { balance });
}

export async function vnpayCallback(
  vnp_TxnRef: string,
  vnp_ResponseCode: string,
  vnp_Amount: string
): Promise<any> {
  const res = await axiosInstance.get("/wallet/vnpay-callback", {
    params: {
      vnp_TxnRef,
      vnp_ResponseCode,
      vnp_Amount,
    },
  });
  return res.data; // Nếu backend trả về {}
}

export async function getWalletByAccountId(accountId: string): Promise<any> {
  const res = await axiosInstance.get(`/wallet/view/${accountId}`);
  return res.data;
}

export const getAllWithdraw = async (): Promise<GetAllWithdrawResponse> => {
  const res = await axiosInstance.get("/wallet/get-all-withdraw");
  return res.data;
};

export const approveWithdraw = async (
  withdrawId: number,
  staffId: string
): Promise<ApproveWithdrawResponse> => {
  const res = await axiosInstance.put(
    `/wallet/approve-withdraw/${withdrawId}/${staffId}`
  );
  return res.data;
};

export const rejectWithdraw = async (
  withdrawId: number,
  staffId: string,
  payload: RejectWithdrawPayload
): Promise<RejectWithdrawResponse> => {
  const res = await axiosInstance.put(
    `/wallet/reject-withdraw/${withdrawId}/${staffId}`,
    payload
  );
  return res.data;
};
