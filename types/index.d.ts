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

export interface Medication {
  id: string;
  patientId: string;
  patientName: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  prescribedBy: string;
  prescribedDate: string;
  startDate: string;
  endDate: string;
  status: "Active" | "Completed" | "Discontinued" | "On Hold";
  refillsRemaining: number;
  totalRefills: number;
  notes?: string;
  drugClass: string;
  sideEffects?: string[];
  interactions?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  appointmentID: string;
  patient: {
    patientID: string;
    account: {
      id: string;
      username: string;
      email: string;
      phone: string;
      avatar: string;
      role: string;
      isDeleted: boolean;
    };
    name: string;
    dob: string;
    gender: string;
    medNo: string;
    medDate: string;
    medFac: string;
  };
  doctor: {
    doctorID: string;
    account: {
      id: string;
      username: string;
      email: string;
      phone: string;
      avatar: string;
      role: string;
      isDeleted: boolean;
    };
    name: string;
    gender: string;
    specialty: string;
    degrees: string;
  };
  medicalService: {
    serviceID: number;
    name: string;
    description: string;
    price: number;
    img: string;
    type: string;
    specialty: string;
    isActive: boolean;
    isRequireDoctor: boolean;
    isOnline: boolean;
    createAt: string;
  };
  appointmentDate: string;
  isAnonymous: boolean;
  note?: string;
  createAt: string;
  status: string;
  urlLink?: string;
  paymentStatus?: string | null;
}

export type AppointmentStatus =
  | "SCHEDULED"
  | "ONGOING"
  | "COMPLETED"
  | "CANCELLED";

export interface DoctorAppointment {
  appointmentID: string;
  patient: {
    patientID: string;
    account: {
      id: string;
      username: string;
      email: string;
      phone: string;
      avatar: string;
      role: string;
      isDeleted: boolean;
    };
    name: string;
    dob: string;
    gender: string;
    medNo: string;
    medDate: string;
    medFac: string;
    underlyingDiseases: string;
  };
  doctor: {
    doctorID: string;
    account: {
      id: string;
      username: string;
      email: string;
      phone: string;
      avatar: string;
      role: string;
      isDeleted: boolean;
    };
    name: string;
    gender: string;
    specialty: string;
    degrees: string;
  };
  medicalService: {
    serviceID: number;
    name: string;
    description: string;
    price: number;
    img: string;
    type: string;
    specialty: string;
    isActive: boolean;
    isRequireDoctor: boolean;
    isOnline: boolean;
    createAt: string;
  };
  appointmentDate: string; // ISO date string
  status: string;
  isAnonymous: boolean;
  urlLink: string;
  note: string;
  paymentStatus: string | null;
  createAt: string; // ISO date string
  isRecordCreated: boolean;
}

export interface AppointmentDetailProps {
  appointment: {
    appointmentID: string;
    patient: {
      patientID: string;
      account: {
        id: string;
        username: string;
        email: string;
        phone: string;
        avatar: string;
        role: string;
        isDeleted: boolean;
      };
      name: string;
      dob: string;
      gender: string;
      medNo: string;
      medDate: string;
      medFac: string;
      underlyingDiseases: Array;
    };
    doctor: {
      doctorID: string;
      account: {
        id: string;
        username: string;
        email: string;
        phone: string;
        avatar: string;
        role: string;
        isDeleted: boolean;
      };
      name: string;
      gender: string;
      specialty: string;
      degrees: string;
    };
    medicalService: {
      serviceID: number;
      name: string;
      description: string;
      price: number;
      img: string;
      type: string;
      specialty: string;
      isActive: boolean;
      isRequireDoctor: boolean;
      isOnline: boolean;
      createAt: string;
    };
    appointmentDate: string;
    isAnonymous: boolean;
    note?: string;
    createAt: string;
    status: string;
    urlLink?: string;
    paymentStatus?: string | null;
    isRecordCreated: string;
  };
  onStatusUpdate?: (appointmentId: string, newStatus: string) => void;
  onBack: () => void;
  onViewChange: (options: {
    view: "medical-records" | "medical-record-form" | "medications";
    appointmentId?: string;
    patientId?: string;
    createNew?: boolean;
    prescribedBy?: string;
  }) => void;
}

export interface LabResult {
  id: string;
  recordID: string;
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
  patientId: string;
  patientName: string;
  recordDate: string;
  recordId: string;
  appointmentId: string;
  diagnosis: string;
  createDate: string; // ISO Date string
  note: string;
  notes: string;
  treatmentPlan: string;
  followUpDate: string;
}

export interface MedicalRecordFormProps {
  appointmentId: string;
  record: MedicalRecord | null;
  onBack: () => void;
  doctorName?: string;
}

// Trong file types.ts hoặc đầu file page.tsx
export type DashboardView =
  | "overview"
  | "appointments"
  | "medical-records"
  | "medical-record-form"
  | "schedule"
  | "medications"
  | "patients";

export type ViewChangeOptions = {
  view: DashboardView;
  appointmentId?: string;
  patientId?: string;
  createNew?: boolean;
  prescribedBy?: string;
};

interface MedicalRecordByAppointmentResponse {
  recordId: string;
  appointmentId: string;
  diagnosis: string;
  createDate: string;
  note?: string | null;
}

export type MedicalRecordWithLabResultsProps = {
  medicalRecord: MedicalRecordByAppointmentResponse;
  appointment: Appointment;
  onEditMedicalRecord?: () => void;
};
