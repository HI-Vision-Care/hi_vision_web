// services/auth/types.ts
export interface LoginPayload {
  username: string;
  password: string;
}
export interface LoginResponse {
  token: string;
  username: string;
  role: string;
}
export interface RegisterPayload {
  username: string;
  password: string;
  email: string;
  phone: string;
}
export interface RegisterResponse {
  id: string;
  username: string;
  email: string;
  phone: string;
}
