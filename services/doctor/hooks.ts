/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import {
  createLabResult,
  createMedicalRecord,
  getAllDoctor,
  getAllMedicalRecords,
  getAppointmentsByDoctorId,
  getDoctorProfile,
  getLabResultsByAppointmentId,
  getLabResultsByPatientId,
  getMedicalRecordByAppointmentId,
} from "./api";
import { DoctorProfile, DoctorResponse } from "./types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  CreateMedicalRecordInput,
  DoctorAppointment,
  LabResult,
} from "@/types";

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
      labResults,
    }: CreateMedicalRecordInput) =>
      createMedicalRecord(appointmentId, {  diagnosis, note,labResults }),
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

export function useCreateLabResult(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LabResult) => createLabResult(data),
    onSuccess: () => {
      // invalidate lab results list hoặc medical record nếu cần
      queryClient.invalidateQueries(["labResults"]);
      if (onSuccess) onSuccess();
    },
  });
}

export const useMedicalRecordByAppointmentId = (
  appointmentId: string,
  enabled = true
) =>
  useQuery({
    queryKey: ["medical-record", appointmentId],
    queryFn: () => getMedicalRecordByAppointmentId(appointmentId),
    enabled: !!appointmentId && enabled,
  });

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

export const useLabResultsByAppointmentId = (
  appointmentId: string,
  enabled = true
) =>
  useQuery({
    queryKey: ["lab-results", appointmentId],
    queryFn: () => getLabResultsByAppointmentId(appointmentId),
    enabled: !!appointmentId && enabled,
  });

export function useAllDoctors(enabled = true) {
  return useQuery<DoctorResponse[], Error>({
    queryKey: ["doctors", "all"],
    queryFn: getAllDoctor,
    enabled,
    staleTime: 1000 * 60 * 5, // cache 5 phút
  });
}
