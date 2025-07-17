//types
export interface Appointment {
  appointmentID: string;
  patient: {
    patientID: string;
    name: string;
    dob: string;
    gender: string;
    medNo: string;
    medDate: string;
    medFac: string;
    account: {
      id: string;
      username: string;
      email: string;
      phone: string;
      avatar: string;
      role: "PATIENT";
      isDeleted: boolean;
    };
    underlyingDiseases: string[];
  };
  medicalService: {
    serviceID: number;
    name: string;
    description: string;
    price: number;
    type: string;
    specialty: string;
    isActive: boolean;
    isRequireDoctor: boolean;
    isOnline: boolean;
    createAt: string;
    img: string;
    testItems: {
      testName: string;
      testDescription: string;
      unit: string;
      referenceRange: string;
    }[];
  };
  doctor: {
    doctorID: string;
    name: string;
    gender: string;
    specialty: string;
    degrees: string;
    avatar: string;
    account: {
      id: string;
      username: string;
      email: string;
      phone: string;
      avatar: string;
      role: "DOCTOR";
      isDeleted: boolean;
    };
  };
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


