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
