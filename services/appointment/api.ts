import axiosInstance from "@/config/axios";
import { DoctorAppointment } from "./types";

//api
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
