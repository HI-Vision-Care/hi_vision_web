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
  patient: {
    patientID: string;
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
    dob: string;
    gender: string;
    medNo: string;
    medDate: string;
    medFac: string;
  };
  doctor: {
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
    degrees: string;
  };
  medicalService: {
    serviceID: number;
    name: string;
    description: string;
    price: number;
    img: string;
    type: string;
    specialty: string;
    isActive: boolean;
    isRequireDoctor: boolean;
    isOnline: boolean;
    createAt: string;
  };
  appointmentDate: string; // ISO date string
  status: string;
  isAnonymous: boolean;
  urlLink: string;
  note: string;
  paymentStatus: string | null;
  createAt: string; // ISO date string
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

export interface LabResult {
  recordID: string;
  testType: string;
  resultText: string;
  resultValue: string;
  unit: string;
  referenceRange: string;
  testDate: string;
  performedBy: string;
}

export interface MedicalRecord {
  recordId: string;
  appointmentId: string;
  diagnosis: string;
  createDate: string;
  note: string;
}
