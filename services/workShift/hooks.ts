//hooks
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getWorkShifts,
  getWorkShiftsByDoctorId,
  getWorkShiftsOfWeek,
  registerWorkShifts,
} from "./api";
import { WorkShiftRegistrationList } from "./types";

// Hook lấy danh sách WorkShifts
export function useWorkShifts(options = {}) {
  return useQuery({
    queryKey: ["workShifts"],
    queryFn: getWorkShifts,
    ...options,
  });
}

export function useRegisterWorkShifts(options = {}) {
  return useMutation({
    mutationFn: ({
      doctorID,
      payload,
    }: {
      doctorID: string;
      payload: WorkShiftRegistrationList;
    }) => registerWorkShifts(doctorID, payload),
    ...options,
  });
}

export function useWorkShiftsOfWeek(
  date: string,
  doctorId?: string,
  options = {}
) {
  return useQuery({
    queryKey: ["workShiftsOfWeek", date, doctorId],
    queryFn: () => getWorkShiftsOfWeek(date, doctorId),
    enabled: !!date, // chỉ gọi khi đã có ngày
    ...options,
  });
}

export function useWorkShiftsByDoctorId(doctorId: string, options = {}) {
  return useQuery({
    queryKey: ["workShifts", "doctor", doctorId],
    queryFn: () => getWorkShiftsByDoctorId(doctorId),
    enabled: !!doctorId,
    ...options,
  });
}
