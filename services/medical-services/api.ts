import axiosInstance from "@/config/axios";
import { MedicalService } from "./types";

export async function getAllMedicalServices(): Promise<MedicalService[]> {
  const { data } = await axiosInstance.get<MedicalService[]>(
    "/medical-service"
  );
  return data;
}
