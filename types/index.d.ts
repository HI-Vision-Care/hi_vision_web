// define the interface
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  address: string;
  medicalHistory: string[];
  allergies: string[];
  currentMedications: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface Appointment {
  id: string;
  patient: Patient;
  date: string;
  time: string;
  duration: number;
  type: string;
  status: AppointmentStatus;
  notes: string;
  symptoms: string[];
  diagnosis?: string;
  prescription?: string[];
  labResults?: {
    test: string;
    result: string;
    normalRange: string;
    status: "normal" | "abnormal";
  }[];
}

export type AppointmentStatus =
  | "SCHEDULED"
  | "ONGOING"
  | "COMPLETED"
  | "CANCELLED";

export interface DoctorAppointment {
  appointmentID: string;
  patientName: string;
  doctorName: string;
  serviceName: string;
  appointmentDate: string;
  isAnonymous: boolean;
  note: string;
  createAt: string;
  status: string;
}

export interface Appointment {
  id: string;
  patient: Patient;
  date: string;
  time: string;
  duration: number;
  type: string;
  status: AppointmentStatus;
  notes: string;
  symptoms: string[];
  diagnosis?: string;
  prescription?: string[];
  labResults?: {
    test: string;
    result: string;
    normalRange: string;
    status: "normal" | "abnormal";
  }[];
}

export interface LabResult {
  id: string;
  recordId: string;
  testType: string;
  resultText: string;
  resultValue: string;
  unit: string;
  referenceRange: string;
  testDate: string;
  performedBy: string;
  status: "normal" | "abnormal" | "critical";
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  patientName: string;
  recordDate: string;
  diagnosis: string;
  notes: string;
  note: string;
  treatmentPlan: string;
  followUpDate: string;
  hivStage: "Stage 1" | "Stage 2" | "Stage 3" | "AIDS";
  cd4Count?: number;
  viralLoad?: number;
  labResults: LabResult[];
  createdBy: string;
  lastModified: string;
}
