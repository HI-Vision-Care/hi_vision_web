import axiosInstance from "@/config/axios";
import {
  AddArvToPresPayloadList,
  AddArvToPresResponse,
  ArvPrescriptionListResponse,
  PrescriptionCreatePayload,
  PrescriptionResponse,
} from "./types";

export async function createPrescription(
  patientId: string,
  payload: PrescriptionCreatePayload
): Promise<PrescriptionResponse> {
  const { data } = await axiosInstance.post<PrescriptionResponse>(
    `/prescription/create?patientId=${patientId}`,
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
  patientId: string
): Promise<ArvPrescriptionListResponse> {
  const { data } = await axiosInstance.get<ArvPrescriptionListResponse>(
    `/prescription/arv/${patientId}`
  );
  return data;
}
