/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import {
  createLabResult,
  createMedicalRecord,
  getAllMedicalRecords,
  getAppointmentsByDoctorId,
  getDoctorProfile,
  getLabResultsByPatientId,
} from "./api";
import { DoctorProfile } from "./types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DoctorAppointment } from "@/types";

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

export const useGetDoctorProfile = (accountId: string, enabled = true) =>
  useQuery<DoctorProfile, Error>({
    queryKey: ["doctor-profile", accountId],
    queryFn: () => getDoctorProfile(accountId),
    enabled: !!accountId && enabled,
  });

export function useCreateMedicalRecord() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      appointmentId,
      diagnosis,
      note,
    }: {
      appointmentId: string;
      diagnosis: string;
      note: string;
    }) => createMedicalRecord(appointmentId, { diagnosis, note }),
    onSuccess: () => {
      // Optional: invalidateQueries để reload medical records hoặc appointments nếu cần
      toast.success("Medical Record created!");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create medical record!";
      toast.error(message);
    },
  });
}

export function useCreateLabResult() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      recordId: string;
      testType: string;
      resultText: string;
      resultValue: string;
      unit: string;
      referenceRange: string;
      testDate: string;
      performedBy: string;
    }) => createLabResult(data),
    onSuccess: () => {
      // invalidate lab results list hoặc medical record nếu cần
      queryClient.invalidateQueries(["labResults"]);
    },
  });
}

export function useAllMedicalRecords(enabled = true) {
  return useQuery({
    queryKey: ["medicalRecords", "all"],
    queryFn: getAllMedicalRecords,
    enabled,
  });
}

export function useLabResultsByPatientId(patientId?: string) {
  return useQuery({
    queryKey: ["labResults", patientId],
    queryFn: () => {
      if (!patientId) return Promise.resolve([]);
      return getLabResultsByPatientId(patientId);
    },
    enabled: !!patientId,
  });
}
