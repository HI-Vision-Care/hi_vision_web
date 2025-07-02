import axiosInstance from "@/config/axios";
import type {
  DoctorResponse,
  LoginPayload,
  LoginResponse,
  PatientResponse,
  RegisterPayload,
  RegisterResponse,
  WorkShift,
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
/** GET /doctor - Lấy danh sách bác sĩ */
export async function getAllDoctor(): Promise<DoctorResponse[]> {
  const { data } = await axiosInstance.get<DoctorResponse[]>("doctor");
  return data;
}

export async function getAllPatients(): Promise<PatientResponse[]> {
  const { data } = await axiosInstance.get<PatientResponse[]>("patient");
  return data;
}

export async function createPatient(payload: Partial<PatientResponse>) {
  return axiosInstance.post("/patient", payload);
}

export async function updatePatient(
  accountId: string,
  payload: Partial<PatientResponse>
) {
  return axiosInstance.put(`/patient/update-profile/${accountId}`, payload);
}

export async function deletePatient(id: string) {
  return axiosInstance.delete(`/patient/${id}`);
}
export async function getWorkShifts(): Promise<WorkShift[]> {
  const { data } = await axiosInstance.get<WorkShift[]>("/work-shift");
  return data;
}
