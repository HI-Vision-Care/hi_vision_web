// services/auth/hooks.ts
import { useMutation } from "@tanstack/react-query";
import { login, register } from "./api";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "./types";

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
    },
  });
}

export function useRegister() {
  return useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: register,
    onSuccess: (data) => {
      // Có thể tự động login sau register, hoặc chuyển hướng
      console.log("Đăng ký thành công user:", data.username);
    },
  });
}
