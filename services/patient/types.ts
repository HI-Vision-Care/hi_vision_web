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
