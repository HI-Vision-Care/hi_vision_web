//hooks
// Import thêm:
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  completeAppointment,
  confirmAppointmentByDoctor,
  getAppointmentsByDoctorId,
} from "./api";
import { DoctorAppointment } from "./types";

export const useGetAppointmentsByDoctorId = (
  doctorID: string,
  enabled = true
) =>
  useQuery<DoctorAppointment[], Error>({
    queryKey: ["doctor-appointments", doctorID],
    queryFn: () => getAppointmentsByDoctorId(doctorID),
    enabled: !!doctorID && enabled,
    select: (data: DoctorAppointment[]) => {
      return [...data].sort(
        (a: DoctorAppointment, b: DoctorAppointment) =>
          new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
      );
    },
  });

// Hook xác nhận lịch hẹn (cho button xác nhận ở UI)
export const useConfirmAppointmentByDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (appointmentID: string) =>
      confirmAppointmentByDoctor(appointmentID),
    onSuccess: () => {
      // Sau khi xác nhận thành công, có thể reload lại appointments list nếu muốn
      queryClient.invalidateQueries({ queryKey: ["appointments"] as const });
    },
  });
};

export function useCompleteAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (appointmentID: string) => completeAppointment(appointmentID),
    onSuccess: () => {
      // Optional: invalidate appointments list nếu có
      queryClient.invalidateQueries({ queryKey: ["appointments"] as const });
    },
  });
}
