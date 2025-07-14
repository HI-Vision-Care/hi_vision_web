import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createPatient,
  deletePatient,
  getAllPatients,
  getLabResultsByPatientId,
  updatePatient,
} from "./api";
import { PatientResponse } from "./types";

//hooks
export function useAllPatients(options = {}) {
  return useQuery({
    queryKey: ["patients"],
    queryFn: getAllPatients,
    ...options,
  });
}

export function useCreatePatient(options = {}) {
  return useMutation({
    mutationFn: (payload: Partial<PatientResponse>) => createPatient(payload),
    ...options,
  });
}

export function useUpdatePatient(options = {}) {
  return useMutation({
    mutationFn: ({
      accountId,
      payload,
    }: {
      accountId: string;
      payload: Partial<PatientResponse>;
    }) => updatePatient(accountId, payload),
    ...options,
  });
}

export function useDeletePatient(options = {}) {
  return useMutation({
    mutationFn: (patientId: string) => deletePatient(patientId),
    ...options,
  });
}

export function useLabResultsByPatientId(patientId: string, options = {}) {
  return useQuery({
    queryKey: ["labResults", patientId],
    queryFn: () => getLabResultsByPatientId(patientId),
    enabled: !!patientId,
    ...options,
  });
}
