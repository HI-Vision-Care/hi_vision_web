import axiosInstance from "@/config/axios";
import { WorkShift } from "./types";

export async function getWorkShifts(): Promise<WorkShift[]> {
  const { data } = await axiosInstance.get<WorkShift[]>("/work-shift");
  return data;
}
