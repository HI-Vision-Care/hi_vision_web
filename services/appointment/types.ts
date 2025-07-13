//types
export interface Appointment {
  patientID: string;
  serviceID: number;
  doctorID: string;
  appointmentId: string;
  appointmentDate: string; // ISO format
  isAnonymous: boolean;
  note?: string;
  urlLink?: string;
  paymentStatus?: string | null;
  createAt: string;
  status: string;
}

export interface LabResult {
  recordId: string;
  testType: string;
  resultText: string;
  resultValue: string;
  unit: string;
  referenceRange: string;
  testDate: string; // ISO string
  performedBy: string;
}
