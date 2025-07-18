/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllAccounts,
  updateAccount,
  createAccount,
  deleteAccount,
  getPatientProfile,
  getDoctorProfile,
  getStaffProfile,
} from "./api";
import {
  AccountUI,
  CreateAccountPayload,
  DoctorProfile,
  PatientProfile,
  StaffProfile,
} from "./types";
import { toast } from "sonner";

// Lấy tất cả account
export const useGetAllAccounts = (enabled = true) =>
  useQuery<AccountUI[], Error>({
    queryKey: ["accounts"],
    queryFn: getAllAccounts,
    enabled,
    // Có thể sort nếu muốn, ví dụ sort theo username
    select: (data) =>
      [...data].sort((a, b) => a.username.localeCompare(b.username)),
  });

export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAccountPayload) => createAccount(data),
    onSuccess: () => {
      // Reload lại list account sau khi tạo thành công
      toast.success("Account created!");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create account!";
      toast.error(message);
    },
  });
};

export const useUpdateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      accountId,
      data,
    }: {
      accountId: string;
      data: Partial<AccountUI>;
    }) => updateAccount(accountId, data),
    onSuccess: () => {
      toast.success("Account updated!");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update account!";
      toast.error(message);
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (accountId: string) => deleteAccount(accountId),
    onSuccess: () => {
      toast.success("Account deleted!");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete account!";
      toast.error(message);
    },
  });
};

type UserProfile = DoctorProfile | PatientProfile | StaffProfile | null;

export function useGetUserProfile(
  accountId: string | null,
  role: string | null
) {
  return useQuery<UserProfile, Error>({
    queryKey: ["user-profile", accountId, role],
    queryFn: async () => {
      if (!accountId || !role) return null;
      if (role === "DOCTOR") return await getDoctorProfile(accountId);
      if (role === "PATIENT") return await getPatientProfile(accountId);
      if (role === "STAFF") return await getStaffProfile(accountId);
      // Nếu muốn cho ADMIN hoặc role khác thì thêm tại đây
      return null;
    },
    enabled: !!accountId && !!role,
  });
}
