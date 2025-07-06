// src/services/account/api.ts

import axiosInstance from "@/config/axios";
import {
  AccountUI,
  CreateAccountPayload,
  DoctorProfile,
  PatientProfile,
} from "./types";

export async function getAllAccounts(): Promise<AccountUI[]> {
  const response = await axiosInstance.get<AccountUI[]>("/account");
  return response.data;
}
export async function updateAccount(
  accountId: string,
  data: Partial<AccountUI>
): Promise<void> {
  await axiosInstance.put(`/account/${accountId}`, data);
}

export async function createAccount(data: CreateAccountPayload): Promise<void> {
  await axiosInstance.post("/account/creation", data);
}

export async function deleteAccount(accountId: string): Promise<void> {
  await axiosInstance.delete(`/account/${accountId}`);
}

export async function getPatientProfile(
  accountId: string
): Promise<PatientProfile> {
  const { data } = await axiosInstance.get<PatientProfile>(
    `/patient/profile/${accountId}`
  );
  return data;
}

export async function getDoctorProfile(
  accountId: string
): Promise<DoctorProfile> {
  const { data } = await axiosInstance.get(`/doctor/profile/${accountId}`);
  return data;
}
