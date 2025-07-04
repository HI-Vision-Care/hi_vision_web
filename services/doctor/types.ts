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
  doctorID: string;
  serviceName: string;
  appointmentDate: string;
  isAnonymous: boolean;
  note: string;
  createAt: string;
  status: string;
  id: string;
  patient: string;
  date: string;
  time: string;
  duration: string;
  notes: string;
  symptoms: string;
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
