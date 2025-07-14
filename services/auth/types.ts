// services/auth/types.ts
export interface LoginPayload {
  email: string;
  password: string;
}
export interface LoginResponse {
  token: string;
  username: string;
  role: string;
}
export interface RegisterPayload {
  username: string;
  password: string;
  email: string;
  phone: string;
}
export interface RegisterResponse {
  id: string;
  username: string;
  email: string;
  phone: string;
}

export interface DoctorResponse {
  doctorID: string;
  name: string;
  gender: string;
  specialty: string;
  degrees: string;
}
export interface PatientResponse {
  patientID: string;
  name: string;
  dob: string; // ISO string, sẽ format sang tuổi nếu cần
  gender: string;
  medNo: string;
  medDate: string;
  medFac: string;
}
export interface PatientUI {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  lastVisit: string;
  nextAppointment: string;
  status: string;
  arvRegimen: string;
  cd4Count: number;
  viralLoad: string;
}
export interface WorkShift {
  id: number;
  slot: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  note: string;
}



