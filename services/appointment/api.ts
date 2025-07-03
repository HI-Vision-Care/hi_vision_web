import axiosInstance from "@/config/axios";
import { DoctorAppointment } from "./types";
import axiosInstance from "@/config/axios";
import { Appointment } from "./types"; // Bạn cần định nghĩa hoặc điều chỉnh interface phù hợp

export async function getAllAppointments(): Promise<Appointment[]> {
  const { data } = await axiosInstance.get<Appointment[]>("/appointment/get-all-appointments");
  return data;
}

export async function updateAppointment(id: number | string, updatedData: Partial<Appointment>): Promise<Appointment> {
  const { data } = await axiosInstance.put<Appointment>(
    `/appointment/update-appointment/${id}`,
    updatedData
  );
  return data;
}

export const confirmAppointmentByDoctor = async (appointmentID: string) => {
  const res = await axiosInstance.patch(`/doctor/confirm/${appointmentID}`);
  return res.data;
};

export async function completeAppointment(appointmentID: string) {
  const response = await axiosInstance.patch(
    `/doctor/complete/${appointmentID}`
  );
  return response.data;
}

export const getAppointmentsByDoctorId = async (
  doctorID: string
): Promise<DoctorAppointment[]> => {
  const res = await axiosInstance.get(`/doctor/view-appointment/${doctorID}`);
  return res.data;
};

