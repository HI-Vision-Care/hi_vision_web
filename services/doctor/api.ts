import axiosInstance from "@/config/axios";
import {
  DoctorProfile,
  DoctorResponse,
  DoctorUpdateRequest,
  MedicalRecordByAppointmentResponse,
} from "./types";
import Cookies from "js-cookie";
import { DoctorAppointment, LabResult, MedicalRecord } from "@/types";

export async function getAllDoctor(): Promise<DoctorResponse[]> {
  const { data } = await axiosInstance.get<DoctorResponse[]>("doctor");
  return data;
}

export async function updateDoctorProfile(
  id: string,
  doctor: DoctorUpdateRequest
): Promise<DoctorResponse> {
  const { data } = await axiosInstance.put<DoctorResponse>(
    `doctor/update-profile/${id}`,
    doctor
  );
  return data;
}

export async function deleteDoctor(doctorID: string): Promise<void> {
  await axiosInstance.delete(`/doctor/delete/${doctorID}`);
}

export const getDoctorProfile = async (
  accountId: string
): Promise<DoctorProfile> => {
  const token = Cookies.get("token"); // lấy token từ cookie
  const res = await axiosInstance.get(`/doctor/profile/${accountId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getAppointmentsByDoctorId = async (
  doctorID: string
): Promise<DoctorAppointment[]> => {
  const res = await axiosInstance.get(`/doctor/view-appointment/${doctorID}`);
  return res.data;
};

export async function createMedicalRecord(
  appointmentId: string,
  data: {
    diagnosis: string;
    note: string;
    labResults: LabResult[];
  }
) {
  const response = await axiosInstance.post(
    `/doctor/create-medical-record/${appointmentId}`,
    data
  );
  return response.data;
}

export async function getAllMedicalRecords(): Promise<MedicalRecord[]> {
  const response = await axiosInstance.get("/doctor/get-all-medical-records");
  return response.data;
}

export const getMedicalRecordByAppointmentId = async (
  appointmentId: string
): Promise<MedicalRecordByAppointmentResponse> => {
  const res = await axiosInstance.get(
    `/medical-record/appointment/${appointmentId}`
  );
  return res.data;
};

export const getLabResultsByAppointmentId = async (
  appointmentId: string
): Promise<LabResult[]> => {
  const res = await axiosInstance.get(
    `/lab-result/appointment/${appointmentId}`
  );
  return res.data;
};

export async function createLabResult(data: LabResult) {
  const response = await axiosInstance.post("/doctor/create-lab-result", data);
  return response.data;
}

export async function getLabResultsByPatientId(
  patientId: string
): Promise<LabResult[]> {
  const response = await axiosInstance.get(`/patient/lab-results/${patientId}`);
  return response.data;
}
