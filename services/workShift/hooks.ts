//hooks
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getWorkShifts,
  getWorkShiftsByDoctorId,
  getWorkShiftsOfWeek,
  registerWorkShifts,
  updateWorkShift,
} from "./api";
import { WorkShiftRegistrationList, WorkShiftUpdatePayload } from "./types";

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

// Cập nhật work shift theo wsID
export function useUpdateWorkShift(options = {}) {
  return useMutation({
    mutationFn: ({
      wsID,
      payload,
    }: {
      wsID: number | string;
      payload: WorkShiftUpdatePayload;
    }) => updateWorkShift(wsID, payload),
    ...options,
  });
}

// (tuỳ chọn) Nếu bạn hay đổi mỗi status:
export function useUpdateWorkShiftStatus(options = {}) {
  return useMutation({
    mutationFn: ({
      wsID,
      status,
      note,
    }: {
      wsID: number | string;
      status: string;
      note?: string | null;
    }) => updateWorkShift(wsID, { status, note }),
    ...options,
  });
}
