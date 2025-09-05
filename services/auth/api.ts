import axiosInstance from "@/config/axios";
import type {
  GoogleLoginRequest,
  GoogleLoginResponse,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "./types";

/** POST /account/login */
export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await axiosInstance.post<LoginResponse>(
    "/account/login",
    payload
  );
  return data;
}

/** POST /account/register */
export async function register(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  const { data } = await axiosInstance.post<RegisterResponse>(
    "/account/register",
    payload
  );
  return data;
}

// api.ts

export const googleLoginApi = async (
  data: GoogleLoginRequest
): Promise<GoogleLoginResponse> => {
  const res = await axiosInstance.post<GoogleLoginResponse>(
    "/auth/google/login",
    data
  );
  return res.data;
};
