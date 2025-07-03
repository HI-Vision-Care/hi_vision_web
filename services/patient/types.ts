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
