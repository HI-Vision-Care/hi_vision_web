import axiosInstance from "@/config/axios";
import { DoctorResponse, DoctorUpdateRequest } from "./types";

export async function getAllDoctor(): Promise<DoctorResponse[]> {
  const { data } = await axiosInstance.get<DoctorResponse[]>("doctor");
  return data;
}

export async function updateDoctorProfile(
  id: string,
  doctor: DoctorUpdateRequest
): Promise<DoctorResponse> {
  const { data } = await axiosInstance.put<DoctorResponse>(
    `doctor/update-profile/${id}`,
    doctor
  );
  return data;
}

export async function deleteDoctor(doctorID: string): Promise<void> {
  await axiosInstance.delete(`/doctor/delete/${doctorID}`);
}
