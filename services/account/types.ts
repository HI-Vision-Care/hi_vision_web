export interface AccountUI {
  id: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
  role: "ADMIN" | "DOCTOR" | "PATIENT";
  isDeleted: boolean;
}
export interface CreateAccountPayload {
  email: string;
  password: string;
  role: "ADMIN" | "DOCTOR" | "PATIENT";
}

// Thêm vào file types.ts

export interface PatientAccount {
  id: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  role: "ADMIN" | "DOCTOR" | "PATIENT" | "GUEST";
  isDeleted: boolean;
}

export interface PatientProfile {
  patientID: string;
  account: PatientAccount;
  name: string;
  dob: string; // ISO string
  gender: string;
  medNo: string;
  medDate: string; // ISO string
  medFac: string;
  avatar: string;
}

export interface DoctorProfile {
  doctorID: string;
  account: AccountUI; // hoặc tương tự PatientProfile
  name: string;
  dob: string;
  gender: string;
  avatar: string;
  // các trường khác...
}
