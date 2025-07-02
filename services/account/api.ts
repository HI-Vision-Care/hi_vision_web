// src/services/account/api.ts

import axiosInstance from "@/config/axios";
import { AccountUI } from "./types";

export async function getAllAccounts(): Promise<AccountUI[]> {
  const response = await axiosInstance.get<AccountUI[]>("/account");
  return response.data;
}
