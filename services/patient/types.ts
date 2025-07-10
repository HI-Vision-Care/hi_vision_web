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
  status: string;
  dob: string;
  medDate: string;
  medFac: string;
}

export interface PatientResponse {
  accountId: string;
  fullName: string;
  gender: string;
  dateOfBirth: string; // ISO string, ví dụ: "2002-01-01"
  phone: string;
  email: string;
  address: string;
  medicalHistory?: string;
  insuranceNumber?: string;
}

export interface LabResult {
  recordId: string;
  testType: string;
  resultText: string;
  resultValue: string;
  unit: string;
  referenceRange: string;
  testDate: string; // ISO date string
  performedBy: string;
}
