import { Patient } from "@/types";
import { MedicalService } from "../medical-services/types";
import { Doctor } from "../workShift/types";

//types
export interface Appointment {
  appointmentID: string;
  patient: Patient;
  medicalService: MedicalService;
  doctor: Doctor;
  appointmentDate: string;
  isAnonymous: boolean;
  isRecordCreated: boolean;
  isPrescriptionCreated: boolean | null;
  note?: string;
  urlLink?: string;
  status: string;
  paymentStatus?: string | null;
  createAt: string;
}


