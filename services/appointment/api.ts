//api
import axiosInstance from "@/config/axios";
import { Appointment } from "./types"; // Bạn cần định nghĩa hoặc điều chỉnh interface phù hợp

export async function getAllAppointments(): Promise<Appointment[]> {
  const { data } = await axiosInstance.get<Appointment[]>("/appointment/get-all-appointments");
  return data;
}
