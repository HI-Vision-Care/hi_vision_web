/* eslint-disable @typescript-eslint/no-explicit-any */
//hooks
// Import thêm:
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cancelAppointmentByStaff,
  completeAppointment,
  confirmAppointmentByDoctor,
  getAllAppointments,
  getAppointmentsByDoctorId,
  updateAppointment,
  updateAppointmentPaymentStatus,
} from "./api";
import { DoctorAppointment } from "@/types";
import { Appointment } from "./types";
import { toast } from "sonner";

export const useGetAllAppointments = (enabled = true) =>
  useQuery({
    queryKey: ["appointments", "all"],
    queryFn: getAllAppointments,
    enabled,
  });

export const useUpdateAppointment = (onSuccess?: () => void) =>
  useMutation({
    mutationFn: (params: { appointmentId: string; data: Appointment }) =>
      updateAppointment(params.appointmentId, params.data),
    onSuccess: () => {
      toast.success("Appointment updated successfully!");
      if (onSuccess) onSuccess();
    },
    onError: (error: any) => {
      // Lấy message trả về từ backend (axios error)
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "An error occurred while updating the appointment!";
      toast.error(message);
    },
  });

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
export const useConfirmAppointmentByDoctor = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (appointmentID: string) =>
      confirmAppointmentByDoctor(appointmentID),
    onSuccess: (_data, appointmentID) => {
      toast.success("Appointment confirmed!");
      queryClient.invalidateQueries(["appointment", appointmentID]);
      if (onSuccess) onSuccess(); // chỉ gọi khi truyền vào
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Error confirming appointment"
      );
    },
  });
};

export function useCompleteAppointment(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (appointmentID: string) => completeAppointment(appointmentID),
    onSuccess: (_data, appointmentID) => {
      toast.success("Appointment completed!");

      queryClient.invalidateQueries(["appointment", appointmentID]);
      if (onSuccess) onSuccess();
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Error completing appointment"
      );
    },
  });
}

export function useCancelAppointmentByStaff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (appointmentId: string) =>
      cancelAppointmentByStaff(appointmentId),
    onSuccess: () => {
      toast.success("Appointment cancelled successfully!");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || "Failed to cancel appointment!"
      );
    },
  });
}

export function useUpdateAppointmentPaymentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      appointmentId,
      staffId,
    }: {
      appointmentId: string;
      staffId: string;
    }) => updateAppointmentPaymentStatus(appointmentId, staffId),
    onSuccess: () => {
      toast.success("Payment status updated!");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || "Failed to update payment status!"
      );
    },
  });
}
