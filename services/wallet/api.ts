/* eslint-disable @typescript-eslint/no-explicit-any */
// Thêm vào src/services/account/api.ts hoặc src/services/wallet/api.ts nếu tách module

import axiosInstance from "@/config/axios";

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
