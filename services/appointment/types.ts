//types
export interface Appointment {
  patientID: string;
  serviceID: number;
  doctorID: string;
  appointmentDate: string; // ISO format
  isAnonymous: boolean;
  note?: string;
  urlLink?: string;
  paymentStatus?: string | null;
  createAt: string;
}
