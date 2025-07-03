export interface AccountUI {
  id: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  role: "ADMIN" | "DOCTOR" | "PATIENT";
  isDeleted: boolean;
}
export interface CreateAccountPayload {
  email: string;
  password: string;
  role: "ADMIN" | "DOCTOR" | "PATIENT";
}
