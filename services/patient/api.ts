import axiosInstance from "@/config/axios";
import { PatientResponse } from "./types";

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
