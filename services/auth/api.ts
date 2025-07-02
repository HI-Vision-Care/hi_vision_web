import axiosInstance from "@/config/axios";
import type {
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
