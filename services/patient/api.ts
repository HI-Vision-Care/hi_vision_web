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
  try {
    const response = await axiosInstance.put(
      `/patient/update-profile/${accountId}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update patient:", error);
    throw error;
  }
}

export async function deletePatient(patientId: string) {
  return axiosInstance.delete(`/patient/delete/${patientId}`);
}
