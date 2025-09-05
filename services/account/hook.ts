/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import {
  getAllAccounts,
  updateAccount,
  createAccount,
  deleteAccount,
  getPatientProfile,
  getDoctorProfile,
  getStaffProfile,
  googleLogin,
} from "./api";
import {
  AccountUI,
  CreateAccountPayload,
  DoctorProfile,
  GoogleLoginResponseData,
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

export const TOKEN_KEY = "auth_token"; // trùng với axios interceptor của bạn

declare global {
  interface Window {
    google?: any;
  }
}

function loadGsiScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts) return resolve();
    const s = document.createElement("script");
    s.src = "https://accounts.google.com/gsi/client";
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load Google script"));
    document.head.appendChild(s);
  });
}

// --- add ---
export function useGoogleLoginWeb() {
  const tokenClientRef = useRef<any>(null);

  const mutation = useMutation<GoogleLoginResponseData, Error, string>({
    mutationFn: (accessToken) => googleLogin({ accessToken }),
    onSuccess: (res) => {
      if (res?.accessToken) {
        localStorage.setItem(TOKEN_KEY, res.accessToken);
      }
    },
  });

  useEffect(() => {
    (async () => {
      await loadGsiScript();
      tokenClientRef.current = window.google!.accounts.oauth2.initTokenClient({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_WEB_CLIENT_ID!,
        scope: "openid email profile",
        callback: (resp: { access_token?: string; error?: string }) => {
          if (resp?.access_token) mutation.mutate(resp.access_token);
        },
      });
    })();
  }, []);

  const loginWithGoogle = () => tokenClientRef.current?.requestAccessToken();

  return {
    loginWithGoogle,
    isLoading: mutation.isPending,
    data: mutation.data,
    error: mutation.error,
  };
}
