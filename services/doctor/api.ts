import axiosInstance from "@/config/axios";
import { DoctorResponse } from "./types";

export async function getAllDoctor(): Promise<DoctorResponse[]> {
  const { data } = await axiosInstance.get<DoctorResponse[]>("doctor");
  return data;
}
