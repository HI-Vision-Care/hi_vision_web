import axiosInstance from "@/config/axios";
import {
  WorkShift,
  WorkShiftRegistrationList,
  WorkShiftUpdatePayload,
} from "./types";

export async function getWorkShifts(): Promise<WorkShift[]> {
  const { data } = await axiosInstance.get<WorkShift[]>("/work-shift");
  return data;
}

export async function registerWorkShifts(
  doctorID: string,
  payload: WorkShiftRegistrationList
): Promise<WorkShift[]> {
  const { data } = await axiosInstance.post(
    `/work-shift/regis/${doctorID}`,
    payload
  );
  return data;
}

export async function getWorkShiftsOfWeek(
  date: string,
  doctorId?: string
): Promise<WorkShift[]> {
  const params: Record<string, string> = { date };
  if (doctorId) params.doctorid = doctorId; // Lưu ý: param phải đúng tên backend, thường là 'doctorid'
  const { data } = await axiosInstance.get<WorkShift[]>("/work-shift/week", {
    params,
  });
  return data;
}

export async function getWorkShiftsByDoctorId(
  doctorId: string
): Promise<WorkShift[]> {
  const { data } = await axiosInstance.get<WorkShift[]>(
    `/work-shift/doctor/${doctorId}`
  );
  return data;
}

export async function updateWorkShift(
  wsID: number | string,
  payload: WorkShiftUpdatePayload
): Promise<WorkShift> {
  const { data } = await axiosInstance.patch<WorkShift>(
    `/work-shift/${wsID}`,
    payload
  );
  return data;
}
