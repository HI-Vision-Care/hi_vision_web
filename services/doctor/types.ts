import { LabResult } from "@/types";

export interface DoctorResponse {
  doctorID: string;
  name: string;
  gender: string;
  specialty: string;
  degrees?: string;
  status?: "active" | "on_leave" | "inactive";
  avatar?: string;
  email?: string;
  phone?: string;
  account?: {
    id: string;
    username: string;
    email?: string;
    phone?: string;
    avatar?: string;
    role?: string;
    isDeleted?: boolean;
  };
}

// types.ts
export interface DoctorUpdateRequest {
  fullName: string;
  gender: string;
  specialty: string;
  degrees: string;
  // Thêm các trường khác nếu cần
}

export interface Appointment {
  appointmentID: string;
  patientName: string;
  doctorName: string;
  serviceName: string;
  appointmentDate: string;
  isAnonymous: boolean;
  note?: string;
  createAt: string;
  status: string;
  type?: string; // để optional nếu backend không trả về, hoặc fix backend cho đồng bộ luôn!
}

export interface DoctorProfile {
  doctorID: string;
  account: {
    id: string;
    username: string;
    email: string;
    phone: string;
    avatar: string;
    role: string;
    isDeleted: boolean;
  };
  name: string;
  gender: string;
  specialty: string;
}

export interface MedicalRecordByAppointmentResponse {
  recordId: string;
  appointmentId: string;
  diagnosis: string;
  createDate: string;
  note: string;
  labResults: LabResult[];
}
