//hooks
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getWorkShifts,
  getWorkShiftsByDoctorId,
  getWorkShiftsOfWeek,
  registerWorkShifts,
  updateWorkShift,
} from "./api";
import { WorkShift, WorkShiftRegistrationList, WorkShiftUpdatePayload } from "./types";

// Hook lấy danh sách WorkShifts
export function useWorkShifts(options = {}) {
  return useQuery({
    queryKey: ["workShifts"],
    queryFn: getWorkShifts,
    ...options,
  });
}

export function useRegisterWorkShifts(options: any = {}) {
  const queryClient = useQueryClient();
  const { onSuccess, ...rest } = options ?? {};

  return useMutation<
    WorkShift[],
    unknown,
    { doctorID: string; payload: WorkShiftRegistrationList },
    unknown
  >({
    mutationFn: ({
      doctorID,
      payload,
    }: {
      doctorID: string;
      payload: WorkShiftRegistrationList;
    }) => registerWorkShifts(doctorID, payload),
    onSuccess: (
      data: WorkShift[],
      variables: { doctorID: string; payload: WorkShiftRegistrationList },
      context: unknown
    ) => {
      // Invalidate work shift queries so calendar/list refreshes
      queryClient.invalidateQueries({ queryKey: ["workShifts"] });
      queryClient.invalidateQueries({ queryKey: ["workShiftsOfWeek"] });
      if (variables?.doctorID) {
        queryClient.invalidateQueries({
          queryKey: ["workShifts", "doctor", variables.doctorID],
        });
      }
      // Call user-provided onSuccess if any
      if (typeof onSuccess === "function") onSuccess(data, variables, context);
    },
    ...rest,
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
export function useUpdateWorkShift(options: any = {}) {
  const queryClient = useQueryClient();
  const { onSuccess, ...rest } = options ?? {};

  return useMutation<
    WorkShift,
    unknown,
    { wsID: number | string; payload: WorkShiftUpdatePayload },
    unknown
  >({
    mutationFn: ({
      wsID,
      payload,
    }: {
      wsID: number | string;
      payload: WorkShiftUpdatePayload;
    }) => updateWorkShift(wsID, payload),
    onSuccess: (
      data: WorkShift,
      variables: { wsID: number | string; payload: WorkShiftUpdatePayload },
      context: unknown
    ) => {
      queryClient.invalidateQueries({ queryKey: ["workShifts"] });
      queryClient.invalidateQueries({ queryKey: ["workShiftsOfWeek"] });
      if (typeof onSuccess === "function") onSuccess(data, variables, context);
    },
    ...rest,
  });
}

// (tuỳ chọn) Nếu bạn hay đổi mỗi status:
export function useUpdateWorkShiftStatus(options: any = {}) {
  const queryClient = useQueryClient();
  const { onSuccess, ...rest } = options ?? {};

  return useMutation<
    WorkShift,
    unknown,
    { wsID: number | string; status: string; note?: string | null },
    unknown
  >({
    mutationFn: ({
      wsID,
      status,
      note,
    }: {
      wsID: number | string;
      status: string;
      note?: string | null;
    }) => updateWorkShift(wsID, { status, note }),
    onSuccess: (
      data: WorkShift,
      variables: { wsID: number | string; status: string; note?: string | null },
      context: unknown
    ) => {
      queryClient.invalidateQueries({ queryKey: ["workShifts"] });
      queryClient.invalidateQueries({ queryKey: ["workShiftsOfWeek"] });
      if (typeof onSuccess === "function") onSuccess(data, variables, context);
    },
    ...rest,
  });
}
