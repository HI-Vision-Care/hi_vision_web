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
  };
  onStatusUpdate?: (appointmentId: string, newStatus: string) => void;
  onBack: () => void;
  onViewChange: (
    view: "medical-records" | "medical-record-form",
    appointmentId: string
  ) => void;
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
  recordId: string;
  appointmentId: string;
  diagnosis: string;
  createDate: string; // ISO Date string
  note: string;
}

export interface MedicalRecordFormProps {
  appointmentId: string;
  record: MedicalRecord | null;
  onBack: () => void;
}

export interface WorkShift {
  id: string;
  doctorId: string;
  doctorName: string;
  date: string;
  startTime: string;
  endTime: string;
  shiftType: "Regular" | "On-call" | "Emergency" | "Night" | "Weekend";
  location: string;
  notes?: string;
  status: "Scheduled" | "Active" | "Completed" | "Cancelled";
  createdAt: string;
  updatedAt: string;
}
