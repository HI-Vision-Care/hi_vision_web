import axiosInstance from "@/config/axios";
import {
  AddArvToPresPayloadList,
  AddArvToPresResponse,
  ArvPrescriptionListResponse,
  PrescriptionCreatePayload,
  PrescriptionResponse,
} from "./types";

export async function createPrescription(
  AppointmentId: string,
  payload: PrescriptionCreatePayload
): Promise<PrescriptionResponse> {
  const { data } = await axiosInstance.post<PrescriptionResponse>(
    `/prescription/create?appointmentId=${AppointmentId}`,
    payload
  );
  return data;
}

export async function addArvToPrescription(
  patientId: string,
  payload: AddArvToPresPayloadList
): Promise<AddArvToPresResponse[]> {
  const { data } = await axiosInstance.post<AddArvToPresResponse[]>(
    `/prescription/add-arv-to-pres/${patientId}`,
    payload
  );
  return data;
}

export async function getArvPrescriptionsByPatientId(
  appointmentID: string
): Promise<ArvPrescriptionListResponse> {
  const { data } = await axiosInstance.get<ArvPrescriptionListResponse>(
    `/prescription/pre-arv/${appointmentID}`
  );
  return data;
}

export const getPreARVPrescription = async (
  appointmentID: string
): Promise<ArvPrescriptionListResponse> => {
  const response = await axiosInstance.get(
    `/prescription/pre-arv/${appointmentID}`
  );
  return response.data;
};
