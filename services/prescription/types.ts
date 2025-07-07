// Payload gửi đi khi tạo đơn thuốc
export interface PrescriptionCreatePayload {
  patientid: string;
  dosage: string;
  duration: string;
  prescribeBy: string;
}

// Response trả về sau khi tạo thành công
export interface PrescriptionResponse {
  prescriptionID: string;
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
    medFac: string;
    createdAt: string;
  };
  date: string;
  prescribeBy: string;
  status: string; // ví dụ: "CREATED"
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
