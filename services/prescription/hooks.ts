import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AddArvToPresPayloadList,
  AddArvToPresResponse,
  PrescriptionCreatePayload,
} from "./types";
import {
  addArvToPrescription,
  createPrescription,
  getArvPrescriptionsByPatientId,
} from "./api";

export function useCreatePrescription(options = {}) {
  return useMutation({
    mutationFn: (payload: PrescriptionCreatePayload) =>
      createPrescription(payload),
    ...options,
  });
}

export function useAddArvToPrescription(options = {}) {
  return useMutation<
    AddArvToPresResponse[],
    Error,
    { patientId: string; payload: AddArvToPresPayloadList }
  >({
    mutationFn: ({ patientId, payload }) =>
      addArvToPrescription(patientId, payload),
    ...options,
  });
}

export function useArvPrescriptionsByPatientId(
  patientId: string,
  options = {}
) {
  return useQuery({
    queryKey: ["arvPrescriptions", patientId],
    queryFn: () => getArvPrescriptionsByPatientId(patientId),
    enabled: !!patientId,
    ...options,
  });
}
