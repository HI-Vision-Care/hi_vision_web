import axiosInstance from "@/config/axios";
import { ConsultationRequest } from "../auth/types";

// Nếu backend trả về chính xác { phone, name, note }
export async function bookConsultationGuest(
  body: ConsultationRequest
): Promise<ConsultationRequest> {
  const { data } = await axiosInstance.post<ConsultationRequest>(
    "/appointment/book-consultation-guest",
    body
  );
  return data;
}

export async function completeConsultation(staffID: string, patientID: string) {
    return axiosInstance.patch(`/consultation/complete/${staffID}?patientID=${patientID}`);
}