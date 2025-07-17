/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AddArvToPresPayloadList,
  AddArvToPresResponse,
  ArvPrescriptionListResponse,
  PrescriptionCreatePayload,
} from "./types";
import {
  addArvToPrescription,
  createPrescription,
  getArvPrescriptionsByPatientId,
  getPreARVPrescription,
} from "./api";
import { toast } from "sonner";

// mutationFn nhận { patientId, payload }
export function useCreatePrescription(onSuccess?: () => void) {
  return useMutation({
    mutationFn: ({
      AppointmentId,
      payload,
    }: {
      AppointmentId: string;
      payload: PrescriptionCreatePayload;
    }) => createPrescription(AppointmentId, payload),

    // ---- Thêm mặc định xử lý thành công và lỗi ở đây ----
    onSuccess: (data: any) => {
      toast.success(data?.message || "Prescription created successfully!");
      if (onSuccess) onSuccess();
    },
    onError: (error: any) => {
      let message = "Có lỗi xảy ra!";
      if (error?.response?.data?.message) {
        message = error.response.data.message;
      } else if (error?.message) {
        message = error.message;
      }
      toast.error(message);
    },
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
  appointmentID: string,
  options = {}
) {
  return useQuery({
    queryKey: ["arvPrescriptions", appointmentID],
    queryFn: () => getArvPrescriptionsByPatientId(appointmentID),
    enabled: !!appointmentID,
    ...options,
  });
}

export function usePreARVPrescription(appointmentID: string) {
  return useQuery<ArvPrescriptionListResponse>({
    queryKey: ["pre-arv-prescription", appointmentID],
    queryFn: () => getPreARVPrescription(appointmentID),
    enabled: !!appointmentID,
  });
}
