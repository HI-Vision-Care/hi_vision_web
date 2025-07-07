// Payload gửi đi khi tạo đơn thuốc
export interface PrescriptionRequest {
  prescribeBy: string;
}

export interface ArvRequest {
  arvID: string;
  dosage: string;
  duration: string;
}

export interface PrescriptionCreatePayload {
  prescriptionRequest: PrescriptionRequest;
  arvRequests: ArvRequest[];
}

// Response trả về sau khi tạo thành công
export interface PrescriptionResponse {
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
  preArvResponses: {
    arvID: string;
    dosage: string;
    duration: string;
  }[];
  prescribeBy: string;
}

// Payload gửi đi (request body)
export interface AddArvToPresPayload {
  arvID: string;
}
export type AddArvToPresPayloadList = AddArvToPresPayload[];

// Response trả về (mỗi phần tử)
export interface Arv {
  arvId: string;
  genericName: string;
  drugClass: string;
  dosageStrength: string;
  admRoute: string;
  rcmDosage: string;
  shelfLife: string;
  fundingSource: string;
  regimenLevel: string;
  lastUpdated: string;
}

export interface PrescriptionAccount {
  id: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  isDeleted: boolean;
}
export interface PrescriptionPatient {
  patientID: string;
  account: PrescriptionAccount;
  name: string;
  dob: string;
  gender: string;
  medNo: string;
  medDate: string;
  medFac: string;
}
export interface PrescriptionSimple {
  prescriptionID: string;
  patient: PrescriptionPatient;
  date: string;
  prescribeBy: string;
  status: string;
}
export interface AddArvToPresResponse {
  id: number;
  prescription: PrescriptionSimple;
  arv: Arv;
}
