export interface DoctorResponse {
  doctorID: string;
  name: string;
  gender: string;
  specialty: string;
  degrees: string;
  avatar: string;
  email: string;
  phone: string;
  status: "active" | "on_leave" | "inactive";
}
// types.ts
export interface DoctorUpdateRequest {
  fullName: string;
  gender: string;
  specialty: string;
  degrees: string;
  // Thêm các trường khác nếu cần
}

export interface DoctorAppointment {
  appointmentID: string;
  patientName: string;
  doctorName: string;
  serviceName: string;
  appointmentDate: string;
  isAnonymous: boolean;
  note: string;
  createAt: string;
  status: string;
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
