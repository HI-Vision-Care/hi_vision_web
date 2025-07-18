// define the interface
export interface Patient {
  patientID: string;
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
    underlyingDiseases: string[];
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
    specialty: string | null;
    isActive: boolean;
    isRequireDoctor: boolean;
    isOnline: boolean;
    createAt: string;
    testItems: TestItem[];
  };
  appointmentDate: string;
  isAnonymous: boolean;
  note?: string;
  createAt: string;
  status: string;
  urlLink?: string | null;
  paymentStatus?: string | null;
  isRecordCreated: boolean;
  isPrescriptionCreated: boolean;
}

export type AppointmentStatus =
  | "SCHEDULED"
  | "ONGOING"
  | "COMPLETED"
  | "CANCELLED";

export interface TestItem {
  testName: string;
  testDescription: string;
  unit: string;
  referenceRange: string;
}

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
    underlyingDiseases: string[];
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
    specialty: string | null;
    isActive: boolean;
    isRequireDoctor: boolean;
    isOnline: boolean;
    createAt: string;
    testItems: TestItem[];
  };
  appointmentDate: string;
  slot: string;
  status: string;
  isAnonymous: boolean;
  urlLink?: string | null;
  note?: string;
  paymentStatus?: string | null;
  createAt: string;
  isRecordCreated: boolean;
  isPrescriptionCreated: boolean;
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
      underlyingDiseases: string[];
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
      specialty: string | null;
      isActive: boolean;
      isRequireDoctor: boolean;
      isOnline: boolean;
      createAt: string;
      testItems: TestItem[];
    };
    appointmentDate: Date;
    isAnonymous: boolean;
    note?: string;
    createAt: string;
    status: string;
    urlLink?: string;
    slot?: string;
    paymentStatus?: string | null;
    isRecordCreated: boolean;
    isPrescriptionCreated: boolean;
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
}

export interface CreateMedicalRecordInput {
  appointmentId: string;
  diagnosis: string;
  note: string;
  labResults: LabResult[];
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
  doctorName?: string;
  testItems: TestItem[];
  nBack?: () => void;
  onSuccess?: () => void; // <--- thêm dòng này!
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
};
